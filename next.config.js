/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.candyd.co',
        port: '',
      },
      // {
      //   protocol: 'http',
      //   hostname: 'res.cloudinary.com',
      //   port: '',
      // }
    ],
  }
}

module.exports = nextConfig
