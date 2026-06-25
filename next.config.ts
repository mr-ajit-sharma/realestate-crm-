import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};
console.log('ENV CHECK:', process.env.NEXT_PUBLIC_API_URL); // Terminal mein dikhega

export default nextConfig;
