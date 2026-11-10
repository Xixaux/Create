// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: process.env.NODE_ENV === 'production'
    },
    typescript: {
        ignoreBuildErrors: true
    },
    webpack: (config) => {
        if (config.module && config.module.rules) {
            config.module.rules.push({
                test: /\.(json|js|ts|tsx|jsx)$/,
                resourceQuery: /raw/,
                use: 'raw-loader'
            });
        }
        return config;
    },

    experimental: {
        reactCompiler: false,  // ← THIS LINE DISABLES THE GHOSTS
    },

    async rewrites() {
        return [
            {
                source: '/api/env/:path*',
                destination: 'http://localhost:5000/api/env/:path*',
            },
            {
                source: '/api/SpatialEnvironment/:path*',
                destination: 'http://localhost:5000/api/SpatialEnvironment/:path*',
            },
            {
                source: '/api/live/:path*',
                destination: 'http://localhost:5000/api/live/:path*',
            },
        ];
    }
};

export default nextConfig;