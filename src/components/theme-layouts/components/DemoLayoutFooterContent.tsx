import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import LanguageSwitcher from './LanguageSwitcher'; // Adjust the import path as needed

/**
 * The powered by links.
 */
function PoweredByLinks() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <Box
      className="flex items-center"
      sx={{ width: '100%', justifyContent: 'space-between' }}
    >
      {/* ICON GROUP — Only "Learning" remains */}
      <Box
        component={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
        className="flex items-center rounded-lg overflow-hidden"
      >
        <Tooltip title="Learning" placement="top">
          <IconButton
            className="min-h-10 w-11 flex justify-center items-center rounded-none"
            component={motion.a}
            variants={item}
            href="https://example.com/learning"
            target="_blank"
            rel="noreferrer noopener"
            role="button"
          >
            <img
              src="/assets/images/footer-toolbar-components/013-learning.svg"
              alt="learning"
              className="min-w-0 w-7 h-7"
            />
          </IconButton>
        </Tooltip>
      </Box>

      {/* LANGUAGE SWITCHER (FAR RIGHT) */}
      <Box
        component={motion.div}
        variants={item}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <LanguageSwitcher />
      </Box>
    </Box>
  );
}

export default PoweredByLinks;