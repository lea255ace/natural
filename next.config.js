/** @type {import('next').NextConfig} */

//TODO(MW): This could be moved into .env.production and .env.development?
//          As per: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
const isProd = process.env.NODE_ENV === 'production';
const debugBuild = process.env.BUILD_MODE === 'debug';
const prefix = (isProd & !debugBuild) ? '/natural_time' : '';

const nextConfig = {
    output: 'export',
    assetPrefix: prefix,
    pageExtensions: ['mdx', 'tsx', 'ts', 'jsx', 'js'],
    images: {
        unoptimized: true,
    }
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);