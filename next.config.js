const withNextIntl = require('next-intl/plugin')(
  './i18n/request.js' // path to your request.js file
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {}
};

module.exports = withNextIntl(nextConfig);
