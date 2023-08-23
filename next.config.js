/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets.coingecko.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
