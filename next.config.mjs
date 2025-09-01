/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({ bufferutil: 'bufferutil' });
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: '/leaderboard',
        destination: '/parrainage',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: '*.airsoftmarket.fr',
      },
    ],
  },
};

export default nextConfig;
