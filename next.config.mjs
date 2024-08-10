/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "gitee.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.douyinpic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**.showapi.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.tuniucdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
