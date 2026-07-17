/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep the native-ish postgres.js driver out of the bundler so it runs as a
  // normal Node module in server routes.
  serverExternalPackages: ['postgres'],
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
