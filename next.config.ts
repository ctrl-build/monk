import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable experimental compiler to prevent edge runtime crashes
  reactCompiler: false,

  // Ensure 'resend' is treated as a server package and not bundled for the client
  serverExternalPackages: ["resend"],
};

export default nextConfig;