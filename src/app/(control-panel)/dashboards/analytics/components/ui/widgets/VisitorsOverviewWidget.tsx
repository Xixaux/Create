import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ApexOptions } from 'apexcharts';
import _ from 'lodash';
import { Tabs, Tab } from '@mui/material';
import { useContrastMainTheme } from '@create/core/CreateSettings/hooks/createThemeHooks';
import { useGetWidget } from '../../../api/hooks/widgets/useGetWidget';
import ReactApexChart from 'react-apexcharts';
import VisitorsVsPageViewsType from '../../../api/types/VisitorsVsPageViewsType';

/**
 * The visitors overview widget.
 * Does not define a front-end widget
 */
function VisitorsOverviewWidget() {
    return (
        <div>
            {/* Component content goes here */}
        </div>
    );
}

export default VisitorsOverviewWidget;