import { Metadata } from 'next';
import { Search } from 'lucide-react';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import { tools } from '@/data/tools';

export const metadata: Metadata = {
  title: 'All Developer Tools — Openware',
  description: 'Browse all 15 free online developer tools. All tools run entirely in your browser — your data never leaves your device.',
};

export default function ToolsIndexPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-2">All Developer Tools</h1>
      <p className="text-sm text-text-secondary mb-6">
        Browse all 15 free developer tools. All tools run entirely in your browser.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
