/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json in the home folder confuses root detection.
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
