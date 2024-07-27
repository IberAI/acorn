
import { MetadataRoute } from 'next'

/**
 * Generates the robots.txt configuration for the site.
 * 
 * @returns {MetadataRoute.Robots} The robots.txt configuration.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/api/*',
          '/_next/',
          '/_next/*',
          '/404',
          '/500',
          '/server-sitemap.xml',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/api/*',
          '/_next/',
          '/_next/*',
          '/404',
          '/500',
          '/server-sitemap.xml',
        ],
      },
    ],

    host: process.env.DOMAIN,
  }
}

