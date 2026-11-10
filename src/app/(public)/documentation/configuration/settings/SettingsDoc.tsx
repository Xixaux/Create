import CreateHighlight from '@create/core/CreateHighlight';
import Typography from '@mui/material/Typography';
import settingsConfigRaw from 'src/configs/settingsConfig.ts?raw';

/**
 * Theme Layouts Doc
 * This document provides information on how to use theme layouts.
 */
function SettingsDoc() {
    return (
        <>
            <Typography
                variant="h4"
                className="mb-10 font-bold"
            >
                Default Settings
            </Typography>

            <Typography
                className="mb-4"
                component="p"
            >
                To configure the default layout and theme settings for your application, locate the file:
                <code>src/configs/settingsConfig.ts</code>
            </Typography>

            <CreateHighlight
                component="pre"
                className="language-jsx"
            >
                {settingsConfigRaw}
            </CreateHighlight>
        </>
    );
}

export default SettingsDoc;