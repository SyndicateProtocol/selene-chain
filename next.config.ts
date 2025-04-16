import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]"
      }
    })
    return config
  }
}

export default nextConfig
