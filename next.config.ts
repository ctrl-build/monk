import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,

  serverExternalPackages: ["resend"],
};

export default nextConfig;