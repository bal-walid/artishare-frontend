import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "", // Remove the port since Nginx serves Laravel
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
