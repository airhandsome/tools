import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16 text-center">
      <p className="text-5xl font-bold text-accent mb-4">404</p>
      <h1 className="text-2xl font-semibold text-text-primary mb-2">Page not found</h1>
      <p className="text-sm text-text-secondary mb-6">
        The tool you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="tool-btn-primary inline-flex items-center gap-2">
        ← Back to all tools
      </Link>
    </div>
  );
}
