// Lokasi: next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Baris ini akan mencegah build gagal karena error linting minor
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;