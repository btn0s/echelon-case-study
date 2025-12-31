import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
