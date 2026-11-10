'use client';
import CreatePageSimple from '@create/core/CreatePageSimple';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import CreateLoading from '@create/core/CreateLoading';
import AnalyticsDashboardAppHeader from '../ui/AnalyticsDashboardAppHeader';
import { useGetWidgets } from '../../api/hooks/widgets/useGetWidgets';

// Imported the original widgets from the previous page file
import VisitorsOverviewWidget from '../ui/widgets/VisitorsOverviewWidget';
import ConversionsWidget from '../ui/widgets/ConversionsWidget';
import ImpressionsWidget from '../ui/widgets/ImpressionsWidget';
import VisitsWidget from '../ui/widgets/VisitsWidget';
import VisitorsVsPageViewsWidget from '../ui/widgets/VisitorsVsPageViewsWidget';
import NewVsReturningWidget from '../ui/widgets/NewVsReturningWidget';
import AgeWidget from '../ui/widgets/AgeWidget';
import LanguageWidget from '../ui/widgets/LanguageWidget';
import GenderWidget from '../ui/widgets/GenderWidget';

const container = {
    show: {
        transition: {
            staggerChildren: 0.04
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

/**
 * The analytics dashboard app.
 */
function AnalyticsDashboardAppView() {
    const { isLoading } = useGetWidgets();

    if (isLoading) {
        return <CreateLoading />;
    }

    return (
        <CreatePageSimple
            header={<AnalyticsDashboardAppHeader />}
            content={
                <motion.div
                    // REVERTED: Main grid is back to 4 columns (lg:grid-cols-4)
                    className="grid w-full grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 md:px-8 lg:grid-cols-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* 3. VISITORS OVERVIEW WIDGET (Full Width) */}
                    <motion.div
                        variants={item}
                        className="sm:col-span-2 lg:col-span-4" // Spans all 4 columns
                    >
                        <VisitorsOverviewWidget />
                    </motion.div>

                    {/* 4. CONVERSIONS, IMPRESSIONS, VISITS ROW (1/3, 1/3, 1/3) */}
                    {/* NEW SOLUTION: A nested 3-column grid to force perfect 1/3 splits. */}
                    <motion.div
                        variants={item}
                        // This outer div spans all 4 columns of the main grid
                        className="sm:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                        {/* WIDGET 1/3 */}
                        <motion.div variants={item}>
                            <ConversionsWidget />
                        </motion.div>

                        {/* WIDGET 1/3 */}
                        <motion.div variants={item}>
                            <ImpressionsWidget />
                        </motion.div>

                        {/* WIDGET 1/3 */}
                        <motion.div variants={item}>
                            <VisitsWidget />
                        </motion.div>
                    </motion.div>
                    
                    {/* 5. VISITORS VS PAGE VIEWS (Full Width) */}
                    <motion.div
                        variants={item}
                        className="sm:col-span-2 lg:col-span-4" // Spans all 4 columns
                    >
                        <VisitorsVsPageViewsWidget />
                    </motion.div>

                    {/* 6. AUDIENCE HEADER (Full Width) */}
                    <div className="mt-4 w-full sm:col-span-2 lg:col-span-4">
                    </div>

                    {/* 7. AUDIENCE WIDGETS (4-in-a-row is now correct) */}
                    <motion.div variants={item}>
                        <NewVsReturningWidget />
                    </motion.div>
                    <motion.div variants={item}>
                        <GenderWidget />
                    </motion.div>
                    <motion.div variants={item}>
                        <AgeWidget />
                    </motion.div>
                    <motion.div variants={item}>
                        <LanguageWidget />
                    </motion.div>
                </motion.div>
            }
        />
    );
}

export default AnalyticsDashboardAppView;