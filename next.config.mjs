/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['thread-stream', 'pino', '@walletconnect/universal-provider'],
  transpilePackages: ['@web3modal/wagmi', '@walletconnect/ethereum-provider'],
  turbopack: {
    // Empty config to acknowledge Turbopack usage
  },
  webpack: (config, { isServer, webpack }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
}

export default nextConfig
