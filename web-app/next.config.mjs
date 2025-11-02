/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 enables static HTML export
  images: {
    unoptimized: true, // prevents errors from Next Image in static mode
  },
  trailingSlash: true, // recommended for Electron/Local apps
};

export default nextConfig;
