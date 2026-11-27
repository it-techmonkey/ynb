import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hide the dev badge so it doesn't show up while presenting to the client.
  devIndicators: false,
};

export default nextConfig;
