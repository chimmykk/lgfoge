/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['www.rollingstone.com', 'pbs.twimg.com', 'abs.twimg.com'],
  },


  
}

module.exports = nextConfig
