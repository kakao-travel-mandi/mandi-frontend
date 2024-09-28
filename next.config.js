const path = require('path');

const prod = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  dynamicStartUrl: true,
  dynamicStartUrlRedirect: '/login',
});

module.exports = withPWA({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    });
    return config;
  },
  images: {
    domains: ['openweathermap.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mandi-image.s3.ap-northeast-2.amazonaws.com',
      },
      {
        // TODO: 백엔드 분들도 임시로 준거라 추후 사라져야함.
        protocol: 'https',
        hostname: 'shorturl.at',
      },
    ],
  },
});
