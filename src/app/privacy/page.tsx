import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Openware',
  description: 'Openware privacy policy. All tools run in your browser — your data never leaves your device.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Privacy Policy</h1>
      <div className="text-sm text-text-secondary leading-[1.8] space-y-4">
        <p><strong className="text-text-primary">Openware is committed to your privacy.</strong></p>
        <p>
          All tools on Openware run entirely in your browser. We do not have servers that process your data.
          When you use our JSON formatter, Base64 encoder, JWT decoder, or any other tool, the computation
          happens on your device using JavaScript. Your data is never transmitted, stored, or logged anywhere.
        </p>
        <p>
          We do not collect, store, or transmit any data you enter into our tools. This is not just a promise
          — it&apos;s a technical reality. Our tools have no backend. There are no API calls, no server logs,
          and no databases that could ever contain your information.
        </p>
        <p>
          We do not use cookies for tracking. We may use anonymized analytics to understand general site usage
          patterns (such as page views and tool popularity), but this data is never linked to you personally
          or to the content you process in our tools.
        </p>
        <p>
          We are not responsible for the content of external sites linked from Openware. Our links to
          third-party sites are provided for convenience and do not imply endorsement.
        </p>
        <p className="text-xs text-text-muted mt-8">Last updated: July 2025</p>
      </div>
    </div>
  );
}
