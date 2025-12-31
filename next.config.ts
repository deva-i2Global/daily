import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    DAILY_API_KEY: process.env.DAILY_API_KEY,
  }
};

export default nextConfig;
