import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Link from '@create/core/Link'; 
import CreateSvgIcon from '@create/core/CreateSvgIcon';

type GoToDocBoxProps = {
    className?: string;
};

// Defines the left menu bar bottom documentation area

function GoToDocBox(props: GoToDocBoxProps) {
    const { className } = props;

    return (
        <Box
            className={clsx('documentation-hero flex flex-col items-center justify-center px-4 py-3 gap-4', className)}
            sx={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(200, 200, 255, 0.2))',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                borderWidth: 0,
                boxShadow: 'none', 
                transition: 'all 0.3s ease-in-out',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 'none', 
                },
            }}
        >
            
        </Box>
    );
}

export default GoToDocBox;