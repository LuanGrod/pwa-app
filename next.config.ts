import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sistemasclientes.com.br",
        port: "",
        pathname: "/projetos/medrqe/uploads/**",
      },
    ],
  },
  swcMinify: false,
};

export default nextConfig;
