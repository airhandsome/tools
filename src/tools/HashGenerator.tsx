'use client';

import { useState, useCallback, useEffect } from 'react';
import CryptoJS from 'crypto-js';

interface Hashes {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

const EMPTY_HASHES: Hashes = {
  md5: '',
  sha1: '',
  sha256: '',
  sha512: '',
};

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Hashes>(EMPTY_HASHES);
  const [autoGenerate, setAutoGenerate] = useState(true);

  const generateHashes = useCallback((text: string): Hashes => {
    if (!text) return EMPTY_HASHES;
    return {
      md5: CryptoJS.MD5(text).toString(),
      sha1: CryptoJS.SHA1(text).toString(),
      sha256: CryptoJS.SHA256(text).toString(),
      sha512: CryptoJS.SHA512(text).toString(),
    };
  }, []);

  const handleGenerate = () => {
    setHashes(generateHashes(input));
  };

  // Auto-generate on input change
  useEffect(() => {
    if (autoGenerate) {
      setHashes(generateHashes(input));
    }
  }, [input, autoGenerate, generateHashes]);

  const handleCopyHash = async (hash: string) => {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleCopyAll = async () => {
    if (!hashes.md5 && !hashes.sha1 && !hashes.sha256 && !hashes.sha512) return;
    const text = `MD5: ${hashes.md5}\nSHA-1: ${hashes.sha1}\nSHA-256: ${hashes.sha256}\nSHA-512: ${hashes.sha512}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleClear = () => {
    setInput('');
    setHashes(EMPTY_HASHES);
  };

  const hashFields: { label: string; value: keyof Hashes }[] = [
    { label: 'MD5', value: 'md5' },
    { label: 'SHA-1', value: 'sha1' },
    { label: 'SHA-256', value: 'sha256' },
    { label: 'SHA-512', value: 'sha512' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Input Text</label>
        <textarea
          className="tool-input font-mono min-h-[120px] w-full resize-y"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          spellCheck={false}
        />
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="tool-checkbox"
            checked={autoGenerate}
            onChange={(e) => setAutoGenerate(e.target.checked)}
          />
          <span className="text-sm text-text-secondary">Auto-generate on input</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button onClick={handleGenerate} className="tool-btn-primary">
          Generate Hashes
        </button>
        <button onClick={handleCopyAll} className="tool-btn-secondary">
          Copy All
        </button>
        <button onClick={handleClear} className="tool-btn-danger">
          Clear
        </button>
      </div>

      {/* Hash Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hashFields.map((field) => (
          <div key={field.value} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="tool-label mb-0">{field.label}</label>
              <button
                onClick={() => handleCopyHash(hashes[field.value])}
                className="tool-btn-secondary text-xs px-2 py-1"
                disabled={!hashes[field.value]}
              >
                Copy
              </button>
            </div>
            <div className="tool-output min-h-[60px] p-3">
              <p className="font-mono text-xs text-text-secondary break-all">
                {hashes[field.value] || 'Hash will appear here'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
