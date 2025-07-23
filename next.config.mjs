/**
 * Next.js configuration with allowedDevOrigins for local network development.
 * See: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.1.253:3000',
    'http://192.168.1.253',
  ],
  transpilePackages: ['@react-three/drei', '@react-three/fiber'],
};

export default nextConfig;
