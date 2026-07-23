import type { Metadata } from 'next';
import type { Tool } from '@/data/tools';
import type { Faq } from '@/data/faqs';

const SITE_URL = 'https://www.openware.top';
const SITE_NAME = 'Openware';
const SITE_DESCRIPTION = 'Free, fast, and private online developer tools. All processing happens in your browser — your data never leaves your device.';

export function generateToolMetadata(tool: Tool): Metadata {
  return {
    title: `${tool.name} — Free Online Tool | ${SITE_NAME}`,
    description: tool.description,
    keywords: tool.keywords,
    authors: [{ name: SITE_NAME }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${SITE_URL}/tools/${tool.slug}`,
      siteName: SITE_NAME,
      title: `${tool.name} — Free Online Tool`,
      description: tool.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} — Free Online Tool`,
      description: tool.description,
    },
    alternates: {
      canonical: `${SITE_URL}/tools/${tool.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateFaqSchema(faqs: Faq[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

export function generateWebAppSchema(tool: Tool): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': tool.name,
    'description': tool.description,
    'url': `${SITE_URL}/tools/${tool.slug}`,
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': SITE_NAME,
  'url': SITE_URL,
  'description': SITE_DESCRIPTION,
  'logo': `${SITE_URL}/logo.svg`,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': SITE_NAME,
  'url': SITE_URL,
  'description': SITE_DESCRIPTION,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${SITE_URL}/tools?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};
