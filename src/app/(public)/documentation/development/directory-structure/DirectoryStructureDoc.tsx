import Typography from '@mui/material/Typography';
import CreateHighlight from '@create/core/CreateHighlight';

/**
 * Directory Structure Doc
 * This document explains the directory structure and naming conventions used in the Create React Next.js project.
 */
function DirectoryStructureDoc() {
    return (
        <>
            <Typography
                variant="h4"
                className="mb-10 font-bold"
            >
                Directory Structure and Naming Conventions
            </Typography>
            <Typography
                className="mb-4"
                component="p"
            >
                This document outlines the directory organization and naming practices for the Create React Next.js project. 
                The project adopts a modular structure guided by route configurations defined in config files. 
                The directory layout and naming conventions are crafted to enhance codebase navigation and comprehension.
            </Typography>
            <CreateHighlight
                component="pre"
                className="language-jsx my-6"
            >
                {`
                .
                ├── @auth
                ├── @create
                ├── @i18n
                ├── @mock-utils
                ├── app
                │   ├── (control-panel)
                │   │   ├── apps
                │   │   ├── auth
                │   │   ├── dashboards
                │   │   ├── documentation
                │   │   ├── layout.tsx
                │   │   ├── sign-in
                │   │   ├── sign-out
                │   │   └── sign-up
                │   ├── api
                │   ├── auth
                │   ├── layout.tsx
                │   └── page.tsx
                ├── components
                ├── configs
                ├── contexts
                ├── store
                ├── styles
                └── utils`}
            </CreateHighlight>
            <Typography
                className="mb-4"
                component="p"
            >
                The Create React Next.js project’s directory structure is arranged by feature and functionality, 
                with each primary section housed in its own dedicated folder.
            </Typography>
            <Typography
                className="mb-4"
                component="p"
            >
                <strong>Key Directories:</strong>
            </Typography>
            <ul className="list-disc list-inside mb-4">
                <li>
                    <code>app/</code>: The main application directory using Next.js 13+ App Router.
                </li>
                <li>
                    <code>@auth/</code>: AuthJs configuration and utilities.
                </li>
                <li>
                    <code>@create/</code>: Create core components and utilities.
                </li>
                <li>
                    <code>@i18n/</code>: Internationalization configuration and utilities.
                </li>
                <li>
                    <code>@mock-utils/</code>: Mock utilities for data fetching and manipulation.
                </li>
                <li>
                    <code>components/</code>: Reusable React components.
                </li>
                <li>
                    <code>configs/</code>: Configuration files for various aspects of the application.
                </li>
                <li>
                    <code>contexts/</code>: React context providers.
                </li>
                <li>
                    <code>store/</code>: State management related files, likely using Redux.
                </li>
                <li>
                    <code>styles/</code>: CSS and style-related files.
                </li>
                <li>
                    <code>utils/</code>: Utility functions and scripts.
                </li>
            </ul>
            <Typography
                className="mb-4"
                component="p"
            >
                <strong>Naming Conventions:</strong>
            </Typography>
            <ul className="list-disc list-inside mb-4">
                <li>
                    React components use PascalCase (e.g., <code>MainLayout.tsx</code>, <code>PageTitle.tsx</code>).
                </li>
                <li>
                    Utility functions and configuration files use camelCase (e.g., <code>apiFetch.ts</code>,{' '}
                    <code>navigationConfig.ts</code>).
                </li>
                <li>
                    API routes and page components within the <code>app/</code> directory use the <code>page.tsx</code>{' '}
                    naming convention as per Next.js 13+ standards.
                </li>
                <li>Feature-specific components and utilities are grouped in directories named after the feature.</li>
            </ul>
            <Typography
                className="mb-4"
                component="p"
            >
                This organization promotes a modular and scalable framework for developing sophisticated applications with Create React Next.js, 
                supporting features like authentication, internationalization, and various UI elements typical of an admin dashboard or control panel.
            </Typography>
        </>
    );
}

export default DirectoryStructureDoc;