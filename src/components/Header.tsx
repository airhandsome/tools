'use client';

import { useState, useEffect, useCallback } from 'react';
import { TerminalSquare, Github, Search } from 'lucide-react';
import Link from 'next/link';
import { tools, categories } from '@/data/tools';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredTools = searchQuery.trim()
    ? tools.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.keywords.some(k => k.includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      e.preventDefault();
      document.getElementById('header-search')?.focus();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors">
          <TerminalSquare className="w-5 h-5 text-accent" />
          <span className="font-bold text-base">Openware</span>
        </Link>

        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="header-search"
              type="text"
              placeholder="Search tools... (Press /)"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="w-full bg-input border border-border rounded-lg pl-10 pr-4 h-9 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          {showResults && filteredTools.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg overflow-hidden">
              {filteredTools.slice(0, 8).map(tool => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-accent/10 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary">{tool.name}</span>
                  <span className="text-xs text-text-muted">{tool.category}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-4 text-sm text-text-secondary">
          <Link href="/tools" className="hover:text-text-primary transition-colors">All Tools</Link>
          <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
        </nav>

        <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
          <Github className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
}
