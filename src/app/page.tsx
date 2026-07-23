'use client';

import { useState, useMemo } from 'react';
import { Search, Zap, Lock, Code2 } from 'lucide-react';
import PrivacyBadge from '@/components/PrivacyBadge';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import { tools, getToolsByCategory } from '@/data/tools';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    let result = getToolsByCategory(activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some(k => k.includes(q))
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-[1280px] mx-auto px-6">
      {/* Hero */}
      <section className="pt-16 pb-12 text-center">
        <div className="flex justify-center mb-6">
          <PrivacyBadge />
        </div>
        <h1 className="text-4xl font-extrabold text-text-primary mb-4">
          Free Developer Tools
        </h1>
        <p className="text-base text-text-secondary max-w-[560px] mx-auto mb-8">
          15 essential tools for developers. Fast, private, and always free.
          No ads, no tracking, no signup.
        </p>
        <div className="max-w-[480px] mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search tools... (Press /)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-input border border-border rounded-lg pl-10 pr-4 h-10 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
          />
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <span className="text-sm text-text-muted">{filteredTools.length} tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        {filteredTools.length === 0 && (
          <p className="text-center text-text-muted py-12">No tools match your search.</p>
        )}
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-surface/50 -mx-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-[720px] mx-auto">
          <div>
            <Lock className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="text-base font-semibold text-text-primary mb-1">100% Client-Side</h3>
            <p className="text-xs text-text-secondary">All processing happens in your browser. We never see your data.</p>
          </div>
          <div>
            <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="text-base font-semibold text-text-primary mb-1">Lightning Fast</h3>
            <p className="text-xs text-text-secondary">No server round-trips. Instant results on every input.</p>
          </div>
          <div>
            <Code2 className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="text-base font-semibold text-text-primary mb-1">Open Source</h3>
            <p className="text-xs text-text-secondary">Full source code available on GitHub. Audit it yourself.</p>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 max-w-[720px] mx-auto">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Why Openware?</h2>
        <div className="text-sm text-text-secondary leading-[1.8] space-y-4">
          <p>
            Openware is a collection of free online developer tools that run entirely in your browser.
            Unlike other tool sites that process your data on remote servers, Openware handles everything
            client-side using JavaScript. This means your data is never sent to any server, never stored,
            and never accessible to anyone else. Whether you&apos;re formatting JSON, encoding Base64, or
            generating hashes — your information stays on your device.
          </p>
          <p>
            Many popular developer tool websites have suffered data breaches, exposing users&apos; sensitive
            information including API keys, passwords, and private data. Openware&apos;s architecture makes
            this impossible by design — since we don&apos;t have servers that process your data, there&apos;s
            nothing to breach. Your data literally never leaves your device. This is especially important
            for developers working with sensitive information like JWT tokens, SSH keys, and configuration
            files.
          </p>
          <p>
            Our suite includes 15 essential developer tools: JSON formatter, JSON to CSV converter,
            SQL formatter, XML formatter, Base64 encoder/decoder, URL encoder, HTML entity encoder,
            hash generator, UUID generator, JWT decoder, QR code generator, password generator,
            word counter, case converter, and text to slug converter. All tools are free, require no
            signup, and work on any device with a modern browser.
          </p>
        </div>
      </section>
    </div>
  );
}
