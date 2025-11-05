import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
