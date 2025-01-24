import { withPlausibleProxy } from 'next-plausible';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({ bufferutil: 'bufferutil' });
    }

    return config;
  },
};

export default withPlausibleProxy({
  customDomain: 'https://plausible.vernouillet.dev',
})(nextConfig);
