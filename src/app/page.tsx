'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-8 max-w-[800px] mx-auto">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Browse Tools by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-2">
              <Link href="/tools/json-formatter" className="hover:text-accent transition-colors">Data Format Tools</Link>
            </h3>
            <p className="text-sm text-text-secondary leading-[1.7]">
              Format and beautify structured data with our <Link href="/tools/json-formatter" className="text-accent hover:underline">JSON Formatter</Link>,
              <Link href="/tools/json-to-csv" className="text-accent hover:underline"> JSON to CSV Converter</Link>,
              <Link href="/tools/sql-formatter" className="text-accent hover:underline"> SQL Formatter</Link>, and
              <Link href="/tools/xml-formatter" className="text-accent hover:underline"> XML Formatter</Link>.
              Perfect for debugging API responses, converting data formats, and preparing data for analysis.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-2">
              <Link href="/tools/base64" className="hover:text-accent transition-colors">Encoder Tools</Link>
            </h3>
            <p className="text-sm text-text-secondary leading-[1.7]">
              Encode and decode data with our <Link href="/tools/base64" className="text-accent hover:underline">Base64</Link>,
              <Link href="/tools/url-encoder" className="text-accent hover:underline"> URL Encoder</Link>,
              <Link href="/tools/html-encode" className="text-accent hover:underline"> HTML Entity Encoder</Link>, and
              <Link href="/tools/hash-generator" className="text-accent hover:underline"> Hash Generator</Link>.
              Essential for web development, security, and data transformation.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-2">
              <Link href="/tools/uuid-generator" className="hover:text-accent transition-colors">Generator Tools</Link>
            </h3>
            <p className="text-sm text-text-secondary leading-[1.7]">
              Generate unique identifiers and codes with our <Link href="/tools/uuid-generator" className="text-accent hover:underline">UUID Generator</Link>,
              <Link href="/tools/jwt-decoder" className="text-accent hover:underline"> JWT Decoder</Link>,
              <Link href="/tools/qr-code-generator" className="text-accent hover:underline"> QR Code Generator</Link>, and
              <Link href="/tools/password-generator" className="text-accent hover:underline"> Password Generator</Link>.
              Cryptographically secure, instantly generated, ready to use.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-2">
              <Link href="/tools/word-counter" className="hover:text-accent transition-colors">Text Tools</Link>
            </h3>
            <p className="text-sm text-text-secondary leading-[1.7]">
              Manipulate and analyze text with our <Link href="/tools/word-counter" className="text-accent hover:underline">Word Counter</Link>,
              <Link href="/tools/case-converter" className="text-accent hover:underline"> Case Converter</Link>, and
              <Link href="/tools/text-to-slug" className="text-accent hover:underline"> Text to Slug Converter</Link>.
              Ideal for writers, developers, and SEO professionals.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 max-w-[720px] mx-auto">
        <h2 className="text-xl font-semibold text-text-primary mb-6">How Openware Works</h2>
        <div className="text-sm text-text-secondary leading-[1.8] space-y-4">
          <p>
            Every tool on Openware follows the same simple principle: your data stays in your browser.
            When you paste JSON into our formatter, the JavaScript running on this page parses and beautifies it.
            When you generate a password, the browser&apos;s cryptographic random number generator creates it.
            When you encode Base64, the browser&apos;s native APIs handle the conversion. No server requests, no API calls, no data collection.
          </p>
          <p>
            This architecture provides three key benefits: <strong className="text-text-primary">Privacy</strong> — your sensitive data
            never touches a network; <strong className="text-text-primary">Speed</strong> — no network latency means instant results;
            and <strong className="text-text-primary">Reliability</strong> — no server downtime means tools are always available.
            You can even use Openware offline once the page has loaded, since all processing is client-side.
          </p>
          <p>
            Our 15 tools cover the most common developer tasks: JSON formatting, JSON-to-CSV conversion, SQL formatting,
            XML formatting, Base64 encoding, URL encoding, HTML entity encoding, hash generation, UUID generation,
            JWT decoding, QR code generation, password generation, word counting, case conversion, and slug generation.
            All free, all private, all in your browser.
          </p>
        </div>
      </section>
    </div>
  );
}
