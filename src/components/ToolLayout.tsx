import Link from 'next/link';
import type { Tool } from '@/data/tools';
import type { Faq } from '@/data/faqs';
import FaqSection from '@/components/FaqSection';
import PrivacyBadge from '@/components/PrivacyBadge';
import JsonLd from '@/components/JsonLd';
import { generateFaqSchema, generateWebAppSchema } from '@/lib/seo';

export default function ToolLayout({
  tool,
  faqs,
  relatedTools,
  children,
}: {
  tool: Tool;
  faqs: Faq[];
  relatedTools: Tool[];
  children: React.ReactNode;
}) {
  const schemas = [
    generateFaqSchema(faqs),
    generateWebAppSchema(tool),
  ];

  return (
    <div className="max-w-[800px] mx-auto px-6 py-8">
      <JsonLd data={schemas} />

      {/* Breadcrumb */}
      <nav className="text-xs text-text-secondary mb-4">
        <Link href="/" className="hover:text-accent transition-colors">Home</Link>
        <span className="mx-1.5 text-text-muted">/</span>
        <span>{tool.category}</span>
        <span className="mx-1.5 text-text-muted">/</span>
        <span className="text-text-primary">{tool.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-2">{tool.name}</h1>
        <p className="text-sm text-text-secondary mb-3">{tool.description}</p>
        <PrivacyBadge />
      </div>

      {/* Tool Area */}
      <div className="bg-surface border border-border rounded-lg p-6 mb-2">
        {children}
      </div>

      {/* SEO Content */}
      <div className="mt-8 text-sm text-text-secondary leading-relaxed space-y-4">
        <p>
          <strong className="text-text-primary">{tool.name}</strong> is a free online tool that runs entirely in your browser. 
          Unlike many other tool websites, Openware processes all data client-side — meaning your information is never sent to any server. 
          This makes our tools especially suitable for sensitive data like API keys, passwords, and personal information.
        </p>
        <p>
          Simply paste your data into the input area above and get instant results. No signup required, no ads, no tracking. 
          {tool.name} works on any device with a modern browser — desktop, tablet, or mobile.
        </p>
      </div>

      {/* FAQ */}
      {faqs.length > 0 && <FaqSection faqs={faqs} />}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map(rt => (
              <Link key={rt.slug} href={`/tools/${rt.slug}`} className="tool-card block">
                <h3 className="text-sm font-medium text-text-primary group-hover:text-accent">{rt.name}</h3>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">{rt.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
