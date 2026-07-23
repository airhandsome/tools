import { ShieldCheck } from 'lucide-react';

export default function PrivacyBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-success/10 border border-success/30 rounded-full px-4 py-1.5 text-success text-sm">
      <ShieldCheck className="w-4 h-4" />
      <span>Your data never leaves your browser</span>
    </div>
  );
}
