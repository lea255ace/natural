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
};

module.exports = nextConfig;