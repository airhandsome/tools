/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://openware.top',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
    ],
  },
};
