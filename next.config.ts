import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['async_hooks'] = false;
    }
    return config;
  },
};

export default nextConfig;