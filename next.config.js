/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({ bufferutil: 'bufferutil' });
    }

    return config;
  },
};

module.exports = nextConfig;
