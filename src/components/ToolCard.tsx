import Link from 'next/link';
import type { Tool } from '@/data/tools';
import {
  Braces, Table, Database, FileCode, Lock, Link as LinkIcon, Code,
  Shield, Fingerprint, Key, QrCode, KeyRound, TextCursor, CaseSensitive,
  Hash as HashIcon
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }> > = {
  Braces, Table, Database, FileCode, Lock, Link: LinkIcon, Code,
  Shield, Fingerprint, Key, QrCode, KeyRound, TextCursor, CaseSensitive,
  Hash: HashIcon,
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const IconComponent = iconMap[tool.iconName] || Code;

  return (
    <Link href={`/tools/${tool.slug}`} className="tool-card group block">
      <div className="flex items-start justify-between mb-3">
        <IconComponent className="w-5 h-5 text-accent" />
        <span className="text-[10px] uppercase text-text-muted tracking-wider">{tool.category}</span>
      </div>
      <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
        {tool.name}
      </h3>
      <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
        {tool.description}
      </p>
    </Link>
  );
}
