/** @type {import('next').NextConfig} */
const path = require('path');
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
   images: {
      domains: ['localhost'],
   },
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/i,
         use: ['@svgr/webpack'],
      });

      return config;
   },
   sassOptions: {
      includePaths: [path.join(__dirname, 'src')],
      outputStyle: isProd ? 'compressed' : 'expanded',
   },
};

module.exports = withNextIntl(nextConfig);
