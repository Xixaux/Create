import CreateHighlight from '@create/core/CreateHighlight';
import Typography from '@mui/material/Typography';

function InstallationDoc() {
    return (
        <>
            <Typography
                variant="h4"
                className="mb-10 font-bold"
            >
                Installation
            </Typography>

            <Typography
                className="text-2xl mb-2.5 font-bold"
                variant="h5"
            >
                Prerequisites
            </Typography>

            <Typography
                className="mb-4"
                component="p"
            >
                This section outlines the essential tools required for using Create React.
            </Typography>

            <Typography
                className="text-lg mt-4 mb-2.5 font-bold"
                variant="h6"
            >
                Node.js
            </Typography>

            <Typography
                className="mb-4"
                component="p"
            >
                To set up and work with Create React, you must have{' '}
                <a
                    href="https://nodejs.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Node.js
                </a>{' '}
                installed on your system. This documentation won’t delve deeply into Node.js, as it’s beyond its scope. Note that Node.js is only necessary for the development process, not for using the application.
            </Typography>

            <Typography
                className="text-2xl mt-5 mb-2.5 font-bold"
                variant="h5"
            >
                Installation
            </Typography>

            <Typography
                className="text-lg mt-6 mb-2.5 font-bold"
                variant="h6"
            >
                A. Installing Prerequisites
            </Typography>

            <Typography component="div">
                Download and install <b>at least the LTS</b> or the most recent version of{' '}
                <a
                    href="https://nodejs.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Node.js
                </a>{' '}
                from its official website.
            </Typography>

            <Typography
                className="text-lg mt-6 mb-2.5 font-bold"
                variant="h6"
            >
                B. Installing Create React
            </Typography>

            <Typography component="div">
                Before starting the installation, create a directory to extract the contents of the downloaded .zip file.
            </Typography>

            <div className="mx-4 my-8">
                <Typography
                    className="flex text-lg mb-2.5 font-bold"
                    variant="h6"
                >
                    B.1. Choose which version you want to install
                </Typography>

                <Typography component="div">
                    Upon extracting the .zip file from Themeforest, you’ll find four additional .zip files among other contents. You can select either the React (Vite) or Next.js version, each available in demo or skeleton variants.
                </Typography>

                <ul className="list-disc mx-4">
                    <li>
                        
                        <Typography
                            className="mt-3 space-y-1"
                            component="div"
                        >
                            <ul className="list-disc ml-4"> 
                                <li>
                                    Create React ViteJs Demo Project <b>Create-React-vx.x.x-vitejs-demo.zip</b>
                                </li>
                                <li>
                                    Create React NextJs Demo Project <b>Create-React-vx.x.x-nextjs-demo.zip </b>
                                </li>
                            </ul>
                        </Typography>
                        <Typography
                            className="mt-3"
                            component="div"
                        >
                            This .zip contains the Demo version, which includes all applications, pages, and UI sections from the Demo application. It’s intended solely for reference and should only be used to extract code or modules.
                        </Typography>
                        <Typography
                            className="mt-3"
                            component="div"
                        >
                            <b>AVOID</b> using the Demo version as the foundation for your app, as it includes excessive components that can overburden your project and hinder the development experience.
                        </Typography>
                    </li>
                    

                    <li>
                        
                        <Typography
                            className="mt-3 space-y-1"
                            component="div"
                        >
                            <ul className="list-disc ml-4"> 
                                <li>
                                    Create React ViteJs Skeleton Project <b>Create-React-vx.x.x-vitejs-skeleton.zip</b>
                                </li>
                                <li>
                                    Create React NextJs Skeleton Project <b>Create-React-vx.x.x-nextjs-skeleton.zip</b>
                                </li>
                            </ul>
                        </Typography>
                        <Typography
                            className="mt-3"
                            component="div"
                        >
                            This .zip contains the Skeleton version, which provides all core components and functionality of Create without the Demo applications, pages, or UI sections. <b>USE</b> the Skeleton version as the base for building your application.
                        </Typography>
                    </li>
                    
                </ul>

                <Typography
                    className="flex text-lg mt-8 mb-2.5 font-bold"
                    variant="h6"
                >
                    B.2. Unzip
                </Typography>

                <Typography component="div">
                    Once you’ve selected your preferred version, extract its .zip file into your workspace directory.
                </Typography>
            </div>

            <Typography
                className="text-lg mt-6 mb-2.5 font-bold"
                variant="h6"
            >
                C. Run the installation command
            </Typography>

            <Typography
                className="mb-4"
                component="div"
            >
                Open a terminal or console and navigate to your workspace directory, ensuring you’re in the same folder as the package.json file to execute the commands.
            </Typography>

            <Typography
                className="mb-4"
                component="div"
            >
                To finalize the installation, run the following command:
            </Typography>

            <CreateHighlight
                component="pre"
                className="language-bash mb-4"
            >
                {` npm install `}
            </CreateHighlight>

            <Typography
                className="mb-4"
                component="div"
            >
                This command will take a few moments to install all necessary libraries into the node_modules directory, enabling you to begin development.
            </Typography>
        </>
    );
}

export default InstallationDoc;