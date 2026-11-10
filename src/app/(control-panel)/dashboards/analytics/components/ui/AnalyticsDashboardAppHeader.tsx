import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ChatBubbleLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'; // Import Heroicons
import { motion } from 'framer-motion'; // Using framer-motion consistently

/**
 * The analytics dashboard app header.
 */
function AnalyticsDashboardAppHeader() {
  return (
    <div className="container flex w-full">
      <div className="flex flex-auto flex-col p-4 pb-0 md:px-8 md:pb-0">
        <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center md:gap-0">
          <div className="flex flex-auto flex-col">
            <Typography className="text-3xl font-semibold tracking-tight">
              Analytics dashboard
            </Typography>
            <Typography className="font-medium tracking-tight" color="text.secondary">
              Monitor metrics, check reports and review performance
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            {/* Heroicon for "Talk" (ChatBubbleLeftIcon) */}
            <Button
              className="whitespace-nowrap"
              startIcon={<ChatBubbleLeftIcon className="h-5 w-5" />}
              variant="contained"
              color="primary"
            >
              Talk
            </Button>

            {/* Heroicon for "Settings" (Cog6ToothIcon) */}
            <Button
              className="whitespace-nowrap"
              variant="contained"
              color="secondary"
              startIcon={<Cog6ToothIcon className="h-5 w-5" />}
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboardAppHeader;