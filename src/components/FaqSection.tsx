'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Faq } from '@/data/faqs';

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Frequently Asked Questions</h2>
      <div className="divide-y divide-border">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-3 text-left"
            >
              <span className="text-sm font-medium text-text-primary pr-4">{faq.question}</span>
              <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <p className="text-sm text-text-secondary leading-relaxed pb-3">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
