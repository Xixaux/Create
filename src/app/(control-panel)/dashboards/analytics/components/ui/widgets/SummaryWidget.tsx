import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { memo, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import CreateSvgIcon from '@create/core/CreateSvgIcon';
import CreateLoading from '@create/core/CreateLoading';

// Corrected import paths
import WidgetDataType, { RangeType } from '../../../../project/api/types/home/WidgetDataType';
import { useGetWidget } from '../../../../environment/api/hooks/widgets/useGetWidget';

/**
 * The SummaryWidget widget.
 *
 * FIX: We now pass the `currentRange` state to the `useGetWidget` hook to ensure
 * that a new API call (re-fetch) is triggered whenever the user selects a
 * different range from the dropdown, refreshing the displayed data.
 */
function SummaryWidget() {
    // 1. Fetch initial widget structure (metadata, including default range and all available ranges)
    const { data: initialWidget } = useGetWidget<WidgetDataType>('summary');

    // State to track if the initial default range has been applied from the API data.
    const [hasInitialRangeBeenSet, setHasInitialRangeBeenSet] = useState(false);

    // 2. Initialize the range state using a sensible default.
    // The actual default from the API will be synced in the useEffect below.
    const [currentRange, setCurrentRange] = useState<RangeType>('today' as RangeType);

    // 3. --- FIX: Synchronize state with actual API default WHEN METADATA LOADS (ONLY ONCE) ---
    // This useEffect watches for the initial widget metadata to load and ensures the 
    // correct default range (e.g., 'DY') is set in the state, triggering the main data fetch.
    // Crucially, the logic is gated by `!hasInitialRangeBeenSet` to prevent reverting 
    // user's selections back to the default.
    useEffect(() => {
        if (initialWidget && initialWidget.currentRange && !hasInitialRangeBeenSet) {
            // Update state with the correct default from the API metadata.
            setCurrentRange(initialWidget.currentRange as RangeType);
            // Set flag to true so this effect doesn't run again and overwrite user input.
            setHasInitialRangeBeenSet(true);
        }
    }, [initialWidget, hasInitialRangeBeenSet]);
    // ---------------------------------------------------------------------------------

    // 4. Fetch the primary data, which now depends on the 'currentRange' state.
    const { data: widget, isLoading } = useGetWidget<WidgetDataType>(
        'summary', 
        // Pass the selected range as a query parameter (e.g., /api/widgets/summary?range=DY)
        { params: { range: currentRange } } 
    );

    const data = widget?.data;
    const ranges = widget?.ranges || [];

    function handleChangeRange(event: SelectChangeEvent<string>) {
        // Update the local state. This will automatically trigger the data fetch hook.
        const newRange = event.target.value as RangeType;
        setCurrentRange(newRange);
    }

    // Use widget's isLoading for a smoother experience during range change fetches.
    if (isLoading || !widget) {
        // Note: We use !widget here as well, to cover the time before the primary widget data loads.
        return <CreateLoading />;
    }

    return (
        <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-2 pt-2">
                <Select
                    className=""
                    classes={{ select: 'py-0 flex items-center' }}
                    value={currentRange}
                    onChange={handleChangeRange}
                    slotProps={{
                        input: {
                            name: 'currentRange'
                        }
                    }}
                >
                    {/* The ranges list should be derived from the loaded widget data */}
                    {Object.entries(ranges).map(([key, n]) => {
                        return (
                            <MenuItem
                                key={key}
                                value={key}
                            >
                                {n}
                            </MenuItem>
                        );
                    })}
                </Select>
                <IconButton aria-label="more">
                    <CreateSvgIcon>lucide:ellipsis-vertical</CreateSvgIcon>
                </IconButton>
            </div>
            <div className="mt-4 text-center">
                <Typography className="text-7xl leading-none font-bold tracking-tight sm:text-8xl">
                    {/* Data is accessed using the current range key */}
                    {data?.count[currentRange]}
                </Typography>
                <Typography
                    className="text-lg font-medium"
                    color="text.secondary"
                >
                    {data?.name}
                </Typography>
            </div>
            <Typography
                className="mt-5 mb-6 flex w-full items-baseline justify-center gap-2"
                color="text.secondary"
            >
                <span className="truncate">{data?.extra.name}:</span>
                <b>{data?.extra.count[currentRange]}</b>
            </Typography>
        </Paper>
    );
}

export default memo(SummaryWidget);
