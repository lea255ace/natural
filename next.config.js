/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/natural_time' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;