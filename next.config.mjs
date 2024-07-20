import nextMdx from '@next/mdx';
import smartypants from 'remark-smartypants';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: '',
    basePath: '',
    images: {
        unoptimized: true,
    }
};

const withMDX = nextMdx({
    options: {
        remarkPlugins: [
            [smartypants, {
                ellipses: false
            }]
        ],
        target: 'serverless'
    }
});

export default withMDX(nextConfig);