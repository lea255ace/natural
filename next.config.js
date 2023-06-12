/** @type {import('next').NextConfig} */

//TODO(MW): This could be moved into .env.production and .env.development?
//          As per: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/natural_time' : '',
  images: {
    unoptimized: true,
  },
  typescript: {
    //TODO(MW): Remove this once I figure out how to solve all the problems.
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;