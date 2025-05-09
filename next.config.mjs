/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/meta-llama-analyzer",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
