import Link from 'next/link';
import type { Tool } from '@/data/tools';
import type { Faq } from '@/data/faqs';
import { seoContent } from '@/data/seoContent';
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
      {seoContent[tool.slug] && (
        <div className="mt-8 space-y-6">
          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">{seoContent[tool.slug].about.heading}</h2>
            <div className="text-sm text-text-secondary leading-[1.8] space-y-3">
              {seoContent[tool.slug].about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">{seoContent[tool.slug].howTo.heading}</h2>
            <ol className="text-sm text-text-secondary leading-[1.8] space-y-2 list-decimal list-inside">
              {seoContent[tool.slug].howTo.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">{seoContent[tool.slug].features.heading}</h2>
            <ul className="text-sm text-text-secondary leading-[1.8] space-y-1.5">
              {seoContent[tool.slug].features.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">{seoContent[tool.slug].useCases.heading}</h2>
            <div className="text-sm text-text-secondary leading-[1.8] space-y-3">
              {seoContent[tool.slug].useCases.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </div>
      )}

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
