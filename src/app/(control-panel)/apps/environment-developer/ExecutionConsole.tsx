'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, ToggleButton, ToggleButtonGroup, Menu, MenuItem, TextField } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SendIcon from '@mui/icons-material/Send';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import SequencetoAnimation from './multimedia-output/SequencetoAnimation';
import { compareLogicOperands } from './sequence-detection/sequenceProcessing';

interface SavedSet {
  id: string;
  inputs: any[][];
  outputs: any[][];
  label: string;
}

interface ChainData {
  sets: SavedSet[];
  summary: {
    setCount: number;
    totalInputs: number;
    totalOutputs: number;
    totalSequences: number;
    uniqueNodes: number;
  };
}

interface ExecutionConsoleProps {
  content: string | null;
  onClear?: () => void;
  outputSequences?: any[][];
  pinnedNodes?: any[];
  stagedSequences?: any[][];
}

type SequenceResponseType = 'calculation' | 'logic' | 'action';

interface SequenceResponse {
  type: SequenceResponseType;
  value: number | boolean | string;
}

declare global {
  interface Array<T> {
    sequenceResponse?: SequenceResponse;
  }
}

export default function ExecutionConsole({
  content,
  onClear,
  outputSequences = [],
  pinnedNodes = [],
  stagedSequences,
}: ExecutionConsoleProps) {
  const outputRef = useRef<HTMLDivElement>(null);
  const [currentChain, setCurrentChain] = useState<ChainData | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);
  const [viewMode, setViewMode] = useState<'text' | 'code' | 'multimedia'>('text');
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [input, setInput] = useState(''); // Added for the modern input aesthetic

  const allInputSequences = currentChain
    ? currentChain.sets.flatMap(set => set.inputs)
    : [];

  const log = (content: React.ReactNode, style: string = '') => {
    if (!outputRef.current) return;

    const wrapper = document.createElement('div');
    wrapper.className = "whitespace-pre-wrap mb-1";
    wrapper.style.cssText = `
      line-height: 1.6;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.875rem;
      ${style}
    `;

    if (content === '' || content == null) {
      wrapper.innerHTML = '&nbsp;';
    } else if (typeof content === 'string') {
      // Allow HTML strings for the specific colors used in logic/calculation outputs
      wrapper.innerHTML = content;
    } else {
      wrapper.textContent = String(content);
    }

    outputRef.current.appendChild(wrapper);
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  };

  useEffect(() => {
    (window as any).setCurrentChain = setCurrentChain;
  }, []);

  useEffect(() => {
    if (currentChain && content === null) {
      log('');
      log('<span class="text-emerald-400">[SUCCESS]</span> SEQUENCE LOADED', 'font-weight:600;');
      log(`<span class="text-slate-500">Sets:</span> ${currentChain.summary.setCount} | <span class="text-slate-500">Total Sequences:</span> ${currentChain.summary.totalSequences}`);
      log(`<span class="text-slate-500">Inputs:</span> ${currentChain.summary.totalInputs} | <span class="text-slate-500">Outputs:</span> ${currentChain.summary.totalOutputs}`);
    }
  }, [currentChain, content]);

  const getNodeDisplay = (node: any): string => {
    const name = node.name?.trim() || 'Unnamed';
    const value = node.attributes?.nodeDefinition?.value;
    return value !== undefined ? `${name} (${value})` : name;
  };

  const attachSequenceResponse = (seq: any[], type: SequenceResponseType, value: number | boolean | string) => {
    Object.defineProperty(seq, 'sequenceResponse', {
      value: { type, value },
      writable: true,
      enumerable: false,
      configurable: true,
    });

    const colorMap: Record<SequenceResponseType, string> = {
      calculation: '#fde047', // yellow-300
      logic: '#22d3ee',       // cyan-400
      action: '#c084fc',      // purple-400
    };

    log(`<span style="color:${colorMap[type]}">[META]</span> sequenceResponse: ${type.toUpperCase()} → <span class="text-white">${value}</span>`, 
      `font-weight:700; background:rgba(0,0,0,0.3); padding:4px 8px; border-radius:4px; border-left: 2px solid ${colorMap[type]};`
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && allInputSequences.length > 0) {
      const responses = allInputSequences
        .filter((seq: any) => seq.sequenceResponse)
        .map((seq: any) => seq.sequenceResponse);

      (window as any).__sequenceResponses = responses;
      (window as any).__lastSequenceResponses = responses;

      if (responses.length > 0) {
        log('');
        log('<span class="text-rose-400">#</span> All sequence responses exposed to <span class="text-rose-400">window.__sequenceResponses</span>');
      }
    }
  }, [allInputSequences]);

  const processCalculation = async (seq: any[]) => {
    if (seq.length !== 3) return;
    const opNode = seq[1];
    const folderId = opNode.parentFolderId || opNode.folderId || opNode.id;
    const isCalc = opNode.attributes?.nodecalculation?.isCalculationNode;
    if (isCalc !== true && isCalc !== 'true') return;

    try {
      let module;
      const isPlusAction = folderId === '2.1.1.1.1.1' || 
                           folderId === '2.1.1.1.1.6' || 
                           opNode.name?.toLowerCase().includes('plus') || 
                           opNode.name?.toLowerCase().includes('add');

      if (isPlusAction) {
        module = await import('./node-instructions/PlusOperator_2_1_1_1_1_1');
      } else if (folderId === '2.1.1.1.1.2' || opNode.name?.toLowerCase().includes('minus')) {
        module = await import('./node-instructions/MinusOperator_2_1_1_1_1_2');
      } else {
        log(`<span class="text-amber-500">[DEBUG]</span> No module mapped for ID ${folderId}`, 'font-style:italic;'); 
        return;
      }

      if (module && typeof module.execute === 'function') {
        const result = module.execute(seq, log);
        if (typeof result !== 'undefined') {
          attachSequenceResponse(seq, 'calculation', result);
        }
      }
    } catch (err) {
      log(`<span class="text-rose-500">[ERROR]</span> Import failed for ${folderId}`, 'font-weight:bold;');
    }
  };  

  const processLogic = async (seq: any[]) => {
    if (seq.length === 0) return;
    let hasLogicResult = false;
    for (const node of seq) {
      const folderId = node.parentFolderId || node.folderId || '';
      if (!folderId) continue;
      const filename = folderId.split('.').join('_');
      const path = `./node-instructions/IfOperator_${filename}.tsx`;
      try {
        const module = await import(path);
        if (module.execute && typeof module.execute === 'function') {
          const result = module.execute(seq, log);
          if (typeof result === 'boolean') {
            attachSequenceResponse(seq, 'logic', result);
            hasLogicResult = true;
          }
        }
      } catch (err) {}
    }
    if (!hasLogicResult && seq.some((n: any) => n.attributes?.nodeactions?.isActionNode)) {
      attachSequenceResponse(seq, 'action', `Action: ${seq.map(getNodeDisplay).join(' → ')}`);
    }
  };

  const runSimulation = () => {
    if (!outputRef.current) return;
    console.log('DEBUG: stagedSequences =', stagedSequences);
    log(`<span class="text-sky-400">[INFO]</span> Processing stagedSequences: <span class="text-white">${stagedSequences?.length ?? '0'}</span>`, 'background:rgba(56,189,248,0.1); padding:4px 8px; border-radius:4px;');
    log('', '');

    if (stagedSequences) {
      log('<span class="text-sky-400">[SYSTEM]</span> Analyzing Logic Operands...');
      const result = compareLogicOperands(stagedSequences);
      if (result.detected) {
        log(`<span class="text-emerald-400">[LOGIC_MATCH]</span> RESULT: ${result.comparison.toUpperCase()}`, 
          'font-weight:700; padding:10px; border: 1px solid #10b981; border-radius:8px; margin: 8px 0;');
        log(`<span class="text-slate-400">L:</span> ${result.leftOperand?.text} <span class="text-slate-600">|</span> <span class="text-slate-400">R:</span> ${result.rightOperand?.text}`);
      } else {
        log('<span class="text-slate-500">[NULL]</span> No matching logic sequence detected.');
      }
    }

    if (!currentChain) {
      log('<span class="text-amber-500">[WARNING]</span> No behavior chain loaded. Simulation terminated.', 'font-weight:bold;');
      return;
    }

    setIsSimulationRunning(true);
    let setIndex = 0;

    const runNextSet = () => {
      if (setIndex >= currentChain.sets.length) {
        log('');
        log('<span class="text-emerald-400">[SUCCESS]</span> SIMULATION SEQUENCE COMPLETE', 'font-weight:900; letter-spacing:0.1em;');
        setIsSimulationRunning(false);
        return;
      }
      const set = currentChain.sets[setIndex];
      setIndex++;
      log('');
      log(`<span class="text-cyan-400">SET_${setIndex}</span> // Active Sequences: ${set.inputs.length}`, 'font-weight:800; border-bottom: 1px solid #1e293b; padding-bottom: 4px;');

      set.inputs.forEach((seq, i) => {
        setTimeout(() => {
          const display = seq.map(getNodeDisplay).join(' <span class="text-slate-600">→</span> ');
          log(`<span class="text-sky-500">INP</span> ${display}`, 'font-weight:500;');
          processCalculation(seq);
          processLogic(seq);
        }, i * 160);
      });
      setTimeout(runNextSet, set.inputs.length * 170 + 600);
    };
    runNextSet();
  };

  const handleClearConsole = () => {
    if (outputRef.current) outputRef.current.innerHTML = '';
    setCurrentChain(null);
    setIsSimulationRunning(false);
    if (typeof window !== 'undefined') {
      (window as any).__sequenceResponses = [];
    }
    onClear?.();
  };

  return (
    <Box sx={{ mt: 3, mb: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Top Action Bar */}
      <Box
        sx={{
          bgcolor: '#0D1117',
          p: 2,
          borderRadius: '12px',
          border: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon sx={{ color: '#10b981' }} />}
          onClick={runSimulation}
          disabled={!currentChain && !stagedSequences}
          sx={{
            textTransform: 'none',
            fontWeight: 800,
            letterSpacing: '0.05em',
            px: 3,
            height: 40,
            borderRadius: '8px',
            bgcolor: '#161B22',
            color: '#fff',
            border: '1px solid #334155',
            '&:hover': {
              bgcolor: '#1e293b',
              borderColor: '#10b981',
            },
            '&.Mui-disabled': {
              bgcolor: '#0D1117',
              color: '#334155',
              border: '1px solid #1e293b'
            }
          }}
        >
          Run Simulation
        </Button>
        <Box sx={{ flex: 1 }} />
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, letterSpacing: '0.02em' }}>
          {currentChain ? 'Chain virtualized' : 'Awaiting simulation trigger'}
        </Typography>
      </Box>

      {/* Main Console Box */}
      <Box
        sx={{
          border: '1px solid #1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          backgroundColor: '#0D1117',
        }}
      >
        {/* Console Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#161B22',
            padding: '10px 16px',
            borderBottom: '1px solid #1e293b',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
            </Box>
            <Typography
              sx={{
                ml: 2,
                fontSize: '0.7rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#64748b',
              }}
            >
              Function Index Console [v2.0.4]
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               <Box 
                 sx={{ 
                   width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981',
                   animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                   '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: .4 } }
                 }} 
               />
               <Typography sx={{ fontSize: '10px', fontWeight: 900, color: '#10b981' }}>LIVE</Typography>
             </Box>
            <IconButton
              size="small"
              onClick={() => setExportAnchor(document.getElementById('export-trigger'))}
              id="export-trigger"
              sx={{ color: '#475569', '&:hover': { color: '#38bdf8' } }}
            >
              <ArrowDownTrayIcon style={{ width: 18 }} />
            </IconButton>
          </Box>
        </Box>

        {/* View Selection Bar */}
        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'flex-start' }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            size="small"
            sx={{
              height: 28,
              '& .MuiToggleButton-root': {
                color: '#64748b',
                border: 'none',
                px: 2,
                fontSize: '10px',
                fontWeight: 800,
                '&.Mui-selected': {
                  color: '#fff',
                  bgcolor: '#1e293b',
                  '&:hover': { bgcolor: '#334155' }
                },
              },
            }}
          >
            <ToggleButton value="text">TEXT</ToggleButton>
            <ToggleButton value="code">CODE</ToggleButton>
            <ToggleButton value="multimedia">MULTIMEDIA</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Console Body Area */}
        <Box sx={{ position: 'relative', height: '60vh', minHeight: 450, bgcolor: '#0D1117' }}>
          {/* Text View */}
          <Box
            sx={{
              display: viewMode === 'text' ? 'block' : 'none',
              p: 4,
              height: '100%',
              overflowY: 'auto',
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#1e293b', borderRadius: '4px' }
            }}
          >
            <Box ref={outputRef}>
              {currentChain === null && (
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ color: '#334155', fontFamily: 'ui-monospace, monospace', fontSize: '0.875rem' }}>
                    IED Env // Virtualized Simulation Stack
                  </Typography>
                  {outputSequences.length > 0 ? (
                    <Typography sx={{ color: '#10b981', mt: 1, fontSize: '0.875rem', fontWeight: 600 }}>
                      [READY] {outputSequences.length} output sequences queued.
                    </Typography>
                  ) : (
                    <Typography sx={{ color: '#475569', mt: 1, fontSize: '0.875rem', fontStyle: 'italic' }}>
                      System awaiting behavior nodes...
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>

          {/* Code View Placeholder */}
          <Box
            sx={{
              display: viewMode === 'code' ? 'flex' : 'none',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: '#334155',
            }}
          >
            <Typography variant="h2" sx={{ opacity: 0.1, fontWeight: 900 }}>{`</>`}</Typography>
            <Typography variant="caption" sx={{ mt: 2, letterSpacing: '0.2em' }}>COMPILER_VIEW_PENDING</Typography>
          </Box>

          {/* Multimedia View */}
          <Box sx={{ display: viewMode === 'multimedia' ? 'block' : 'none', height: '100%' }}>
            <SequencetoAnimation
              isSimulationRunning={isSimulationRunning}
              currentSequences={allInputSequences}
              pinnedNodes={pinnedNodes}
            />
          </Box>
        </Box>

        {/* Input/Command Prompt Section */}
        <form 
          onSubmit={(e) => { e.preventDefault(); setInput(''); }}
          className="px-6 py-4 bg-[#0D1117] border-t border-slate-800/50 flex items-center gap-4"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80 whitespace-nowrap">
            COMMAND QUERY
          </span>
          <TextField
            fullWidth
            variant="standard"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query engine attributes..."
            InputProps={{
              disableUnderline: true,
              style: { color: '#c7d2fe', fontFamily: 'ui-monospace, monospace', fontSize: '0.875rem' }
            }}
            sx={{ '& .MuiInputBase-input': { padding: '4px 0', caretColor: '#a5b4fc' } }}
          />
          <IconButton size="small" sx={{ color: '#6366f1' }}>
            <SendIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </form>

        {/* Console Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 1.5,
            borderTop: '1px solid #1e293b',
            backgroundColor: '#161B22',
          }}
        >
           <Typography sx={{ color: '#334155', fontSize: '9px', fontWeight: 900, letterSpacing: '0.1em' }}>
            STATUS: {isSimulationRunning ? 'PROCESSING' : 'IDLE'}
          </Typography>
          <Button
            size="small"
            onClick={handleClearConsole}
            sx={{
              fontSize: '10px',
              fontWeight: 900,
              color: '#64748b',
              letterSpacing: '0.15em',
              '&:hover': { color: '#fb7185', bgcolor: 'transparent' },
            }}
          >
            CLEAR_CONSOLE
          </Button>
        </Box>
      </Box>

      {/* Export Menu */}
      <Menu
        anchorEl={exportAnchor}
        open={Boolean(exportAnchor)}
        onClose={() => setExportAnchor(null)}
        PaperProps={{
          sx: { bgcolor: '#161B22', border: '1px solid #1e293b', mt: 1, minWidth: 150 }
        }}
      >
        <MenuItem onClick={() => {
            if (!outputRef.current) return;
            const html = `<!DOCTYPE html><html><body style="background:#0d1117;color:#cbd5e1;font-family:monospace;padding:20px;">${outputRef.current.innerHTML}</body></html>`;
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `simulation-${Date.now()}.html`;
            a.click();
            setExportAnchor(null);
        }} sx={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 800 }}>
          EXPORT_HTML
        </MenuItem>
        <MenuItem disabled sx={{ color: '#475569', fontSize: '11px', fontWeight: 800 }}>EXPORT_LOG</MenuItem>
      </Menu>
    </Box>
  );
}