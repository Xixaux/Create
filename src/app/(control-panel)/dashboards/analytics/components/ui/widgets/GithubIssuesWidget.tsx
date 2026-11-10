import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { ApexOptions } from 'apexcharts';
import CreateLoading from '@create/core/CreateLoading';
import _ from 'lodash';
import { Tabs, Tab } from '@mui/material';
import GithubIssuesDataType from '../../../../project/api/types/home/GithubIssuesDataType';
import { useGetWidget } from '../../../../environment/api/hooks/widgets/useGetWidget';

import ReactApexChart from 'react-apexcharts';

/**
 * The Intelligence Profile Widget.
 */
function GithubIssuesWidget() {
    const theme = useTheme();
    const [awaitRender, setAwaitRender] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const { data: widget, isLoading } = useGetWidget<GithubIssuesDataType>('githubIssues');

    const overview = widget?.overview || {};
    const series = widget?.series || {};
    const ranges = widget?.ranges || {};
    const labels = widget?.labels;
    
    // Determine the current range key based on the active tab index. 
    // Defaults to 'day' if ranges are empty (e.g., during initial load).
    const currentRange = Object.keys(ranges).length > 0
        ? Object.keys(ranges)[tabValue]
        : 'day'; 

    const chartOptions: ApexOptions = {
        chart: {
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: [theme.palette.secondary.main, theme.palette.secondary.main],
        // FIX: Pass the specific label array for the current range key.
        labels: labels?.[currentRange] || [],
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            background: {
                borderWidth: 0
            }
        },
        grid: {
            borderColor: theme.palette.divider
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'darken'
                }
            }
        },
        stroke: {
            width: [3, 0]
        },
        tooltip: {
            followCursor: true,
            theme: theme.palette.mode
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                color: theme.palette.divider
            },
            labels: {
                style: {
                    colors: theme.palette.text.secondary
                }
            },
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            labels: {
                offsetX: -16,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        }
    };

    useEffect(() => {
        setAwaitRender(false);
    }, []);

    if (isLoading) {
        return <CreateLoading />;
    }

    if (!widget) {
        return null;
    }

    if (awaitRender) {
        return null;
    }

    // Safely get the series for the chart. Defaults to an empty array if not found.
    const chartSeries = series[currentRange] || [];

    return (
        <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
            <div className="flex flex-col items-start justify-between sm:flex-row">
                <Typography className="truncate text-xl leading-6 font-medium tracking-tight">
                    Intelligence Profile
                </Typography>
                <div className="mt-3 sm:mt-0">
                    <Tabs
                        value={tabValue}
                        onChange={(_ev, value: number) => setTabValue(value)}
                    >
                        {/* Only map tabs if ranges object has keys */}
                        {Object.entries(ranges).map(([key, label], index) => (
                            <Tab
                                key={key}
                                value={index}
                                label={label}
                            />
                        ))}
                    </Tabs>
                </div>
            </div>
            <div className="mt-8 grid w-full grid-flow-row grid-cols-1 gap-6 sm:mt-4 lg:grid-cols-2">
                <div className="flex flex-auto flex-col">
                    <Typography
                        className="font-medium"
                        color="text.secondary"
                    >
                        Gained Concepts
                    </Typography>
                    <div className="flex flex-auto flex-col">
                        <ReactApexChart
                            className="w-full flex-auto"
                            options={chartOptions}
                            // Use the safely derived series array
                            series={_.cloneDeep(chartSeries)}
                            height={320}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <Typography
                        className="font-medium"
                        color="text.secondary"
                    >
                        Overview
                    </Typography>
                    <div className="mt-6 grid flex-auto grid-cols-4 gap-3">
                        {/* Overview Boxes - using safe inline access for maximum stability */}
                        <Box
                            sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
                            className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8"
                        >
                            <Typography
                                className="text-5xl leading-none font-semibold tracking-tight sm:text-7xl"
                                color="secondary"
                            >
                                {/* Safe access: Use optional chaining and null coalescing */}
                                {overview[currentRange]?.['new-issues'] || 0}
                            </Typography>
                            <Typography
                                className="mt-1 text-sm font-medium sm:text-lg"
                                color="secondary"
                            >
                                New Concepts
                            </Typography>
                        </Box>
                        <Box
                            sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
                            className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8"
                        >
                            <Typography
                                className="text-5xl leading-none font-semibold tracking-tight sm:text-7xl"
                                color="secondary"
                            >
                                {overview[currentRange]?.['closed-issues'] || 0}
                            </Typography>
                            <Typography
                                className="mt-1 text-sm font-medium sm:text-lg"
                                color="secondary"
                            >
                                Expanded Concepts
                            </Typography>
                        </Box>
                        <Box
                            sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
                            className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8 sm:col-span-1"
                        >
                            <Typography
                                className="text-5xl leading-none font-semibold tracking-tight"
                                color="text.secondary"
                            >
                                {/* Updated API Key Access */}
                                {overview[currentRange]?.['thought-speed'] || 0}
                            </Typography>
                            <Typography
                                className="mt-1 text-center text-sm font-medium"
                                color="text.secondary"
                            >
                                Thought Speed
                            </Typography>
                        </Box>
                        <Box
                            sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
                            className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8 sm:col-span-1"
                        >
                            <Typography
                                className="text-5xl leading-none font-semibold tracking-tight"
                                color="text.secondary"
                            >
                                {/* Updated API Key Access */}
                                {overview[currentRange]?.['logic-depth'] || 0}
                            </Typography>
                            <Typography
                                className="mt-1 text-center text-sm font-medium"
                                color="text.secondary"
                            >
                                Logic Depth
                            </Typography>
                        </Box>
                        <Box
                            sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
                            className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8 sm:col-span-1"
                        >
                            <Typography
                                className="text-5xl leading-none font-semibold tracking-tight"
                                color="text.secondary"
                            >
                                {/* Updated API Key Access */}
                                {overview[currentRange]?.['max-sequence'] || 0}
                            </Typography>
                            <Typography
                                className="mt-1 text-center text-sm font-medium"
                                color="text.secondary"
                            >
                                Max Sequence
                            </Typography>
                        </Box>
                        <Box
                            sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
                            className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8 sm:col-span-1"
                        >
                            <Typography
                                className="text-5xl leading-none font-semibold tracking-tight"
                                color="text.secondary"
                            >
                                {/* Updated API Key Access */}
                                {overview[currentRange]?.['focus-duration'] || 0}
                            </Typography>
                            <Typography
                                className="mt-1 text-center text-sm font-medium"
                                color="text.secondary"
                            >
                                Focus Duration
                            </Typography>
                        </Box>
                    </div>
                </div>
            </div>
        </Paper>
    );
}

export default memo(GithubIssuesWidget);