/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dashscope-intl.aliyuncs.com', pathname: '/**' }
    ]
  }
}; 