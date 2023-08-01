import "./env.mjs"
import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "illustrations.popsy.co"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.job-jive.vercel.app/:path*",
      },
    ]
  },
}

export default withContentlayer(nextConfig)
