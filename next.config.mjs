import nextMdx from '@next/mdx';

//TODO(MW): This could be moved into .env.production and .env.development?
//          As per: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
const isProd = process.env.NODE_ENV === 'production';
const debugBuild = process.env.BUILD_MODE === 'debug';
const prefix = (isProd & !debugBuild) ? '/natural_time' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: prefix,
    images: {
        unoptimized: true,
    }
};

const withMDX = nextMdx({
    options: {
        remarkPlugins: []
    }
});

export default withMDX(nextConfig);