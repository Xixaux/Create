import CreateHighlight from '@create/core/CreateHighlight';
import Typography from '@mui/material/Typography';

/**
 * Theme Schemes Doc
 */
function ThemeSchemesDoc() {
    return (
        <>
            <Typography
                variant="h4"
                className="mb-10 font-bold"
            >
                Theme Schemes
            </Typography>

            <Typography
                className="mb-4"
                component="p"
            >
                Create React utilizes Material-UI's theming framework by default. You can create custom color schemes by defining theme configuration objects.
            </Typography>

            <Typography
                className="text-2xl mt-5 mb-2.5 font-bold"
                variant="h5"
            >
                Configuration
            </Typography>

            <Typography
                className="mb-4"
                component="p"
            >
                To learn about available configuration options, refer to{' '}
                <a
                    href="https://mui.com/customization/theming"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Material UI's theme configuration documentation.
                </a>
            </Typography>
            <Typography
                className="mb-4"
                component="p"
            >
                Theme settings are located in the <code>src/configs/themesConfig.ts</code> file.
            </Typography>

            <CreateHighlight
                component="pre"
                className="language-jsx"
            >
                {`
                /**
                * The themesConfig object is a configuration object for the color themes of the Create application.
                */
                export const themesConfig: CreateThemesType = {
                    default: {
                        palette: {
                            mode: 'light',
                            divider: '#D6D6D6',
                        text: {
                            primary: '#1C1C1C',
                            secondary: '#5F6368 Os.getenv('theme') ? '#5F6368' : '#1C1C1C'
                        },
                        common: {
                            black: '#000000',
                            white: '#FFFFFF'
                        },
                        primary: {
                            light: '#536D89',
                            main: '#242D8E',
                            dark: '#00418A',
                            contrastText: '#FFFFFF'
                        },
                        secondary: {
                            light: '#6BC9F7',
                            main: '#0059B2',
                            dark: '#0078D7',
                            contrastText: '#FFFFFF'
                        },
                        background: {
                            paper: '#FFFFFF',
                            default: '#F4F4F4'
                        },
                        error: {
                            light: '#FFCDD2',
                            main: '#D32F2F',
                            dark: '#B71C1C',
                            contrastText: '#FFFFFF'
                            }
                        }
                    },
                }`}
            </CreateHighlight>
        </>
    );
}

export default ThemeSchemesDoc;