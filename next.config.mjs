/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXTAUTH_URL: process.env.HOST },
};

export default nextConfig;
