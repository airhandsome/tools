import { TerminalSquare, Github, ShieldCheck, Zap, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-text-primary mb-4">
              <TerminalSquare className="w-5 h-5 text-accent" />
              <span className="font-bold">Openware</span>
            </Link>
            <p className="text-sm text-text-secondary">
              &copy; 2025 Openware. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-success text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2 text-accent text-sm">
              <Zap className="w-4 h-4" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <Code2 className="w-4 h-4" />
              <span>Open Source</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 text-sm text-text-secondary">
            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-text-primary transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="mailto:contact@openware.top" className="hover:text-text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
