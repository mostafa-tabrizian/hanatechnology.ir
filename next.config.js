/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'tabrizian.storage.iran.liara.space',
            port: '',
         },
      ],
   },
}

module.exports = nextConfig
