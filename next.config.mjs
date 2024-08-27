/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "bid-buddy-storage.s3.ap-south-1.amazonaws.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "bid-buddy-storage.s3.amazonaws.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};
export default nextConfig;
