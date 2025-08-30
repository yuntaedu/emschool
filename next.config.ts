import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const repo = "emschool";
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  trailingSlash: true
};
export default nextConfig;
