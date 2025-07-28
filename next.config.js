// next.config.js
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  experimental: {
    appDir: true
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  }
});
