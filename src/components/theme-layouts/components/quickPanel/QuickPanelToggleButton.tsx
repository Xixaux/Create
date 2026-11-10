import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'src/store/hooks';
import CreateSvgIcon from '@create/core/CreateSvgIcon';
import clsx from 'clsx';
import { toggleQuickPanel } from './quickPanelSlice';

type QuickPanelToggleButtonProps = {
    className?: string;
    children?: React.ReactNode;
};

/**
 * The quick panel toggle button.
 */
function QuickPanelToggleButton(props: QuickPanelToggleButtonProps) {
    const { className = '', children = <CreateSvgIcon size={20}>heroicons-outline:bookmark</CreateSvgIcon> } = props;
    const dispatch = useAppDispatch();

    return (
        <IconButton
            onClick={() => dispatch(toggleQuickPanel())}
            // BORDER REMOVED: The 'border border-divider' utility classes were deleted.
            className={clsx(className)}
        >
            {children}
        </IconButton>
    );
}

export default QuickPanelToggleButton;