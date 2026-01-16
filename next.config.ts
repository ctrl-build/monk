import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the compiler disabled for stability on Edge
  reactCompiler: false,
};

export default nextConfig;