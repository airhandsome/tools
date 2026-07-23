import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.openware.top'),
  title: {
    default: 'Openware — Free Online Developer Tools | Private & Fast',
    template: '%s | Openware',
  },
  description: 'Free, fast, and private online developer tools. JSON formatter, Base64 encoder, JWT decoder, UUID generator, and more. All processing happens in your browser — your data never leaves your device.',
  keywords: ['developer tools', 'online tools', 'json formatter', 'base64 decoder', 'jwt decoder', 'uuid generator', 'free tools', 'web tools'],
  authors: [{ name: 'Openware' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.openware.top',
    siteName: 'Openware',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Header />
        <main className="min-h-[calc(100vh-56px)]">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
