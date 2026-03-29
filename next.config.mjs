/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'z50m8u0xhlij7sue.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '69c86795a9fb0ef7c012e385.imgix.net',
      },
    ],
  },
};

export default nextConfig;
