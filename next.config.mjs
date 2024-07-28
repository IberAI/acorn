
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEBUG: process.env.DEBUG,
    DOMAIN: process.env.DOMAIN,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  images: {
    domains: ['picsum.photos'],
  },
};

export default nextConfig;

