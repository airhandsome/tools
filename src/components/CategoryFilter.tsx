'use client';

import { categories } from '@/data/tools';

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}) {
  return (
    <div className="flex gap-1 flex-wrap">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeCategory === cat
              ? 'bg-accent text-white'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
