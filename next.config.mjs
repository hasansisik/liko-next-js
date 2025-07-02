/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  // Disable static generation for pages that use Redux
  experimental: {
    // This will disable static generation completely
    appDocumentPreloading: false,
  },
  // SASS configuration to suppress deprecation warnings
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import'],
    quietDeps: true,
  },
};

export default nextConfig;
