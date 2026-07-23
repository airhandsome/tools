'use client';

import { useState, useEffect, useCallback } from 'react';

interface SlugOptions {
  separator: string;
  lowercase: boolean;
  removeStopWords: boolean;
  stripDiacritics: boolean;
}

const STOP_WORDS = [
  'the',
  'a',
  'an',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'and',
  'or',
  'but',
  'is',
  'it',
];

function generateSlug(text: string, opts: SlugOptions): string {
  if (!text) return '';

  let result = text;

  // Strip diacritics
  if (opts.stripDiacritics) {
    result = result.normalize('NFKD');
    result = result.replace(/[\u0300-\u036f]/g, '');
  }

  // Apply lowercase
  if (opts.lowercase) {
    result = result.toLowerCase();
  }

  // Remove stop words
  if (opts.removeStopWords) {
    const words = result.split(/\s+/);
    const filtered = words.filter((word) => {
      const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      return !STOP_WORDS.includes(clean);
    });
    result = filtered.join(' ');
  }

  // Replace non-alphanumeric with separator
  const escSep = opts.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`[^a-zA-Z0-9]+`, 'g');
  result = result.replace(regex, opts.separator);

  // Collapse multiple separators
  const collapseRegex = new RegExp(`${escSep}+`, 'g');
  result = result.replace(collapseRegex, opts.separator);

  // Trim leading/trailing separators
  const trimRegex = new RegExp(`^${escSep}|${escSep}$`, 'g');
  result = result.replace(trimRegex, '');

  return result;
}

export default function TextToSlug() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [options, setOptions] = useState<SlugOptions>({
    separator: '-',
    lowercase: true,
    removeStopWords: false,
    stripDiacritics: true,
  });

  const convert = useCallback(
    (text: string, opts: SlugOptions) => {
      setOutput(generateSlug(text, opts));
    },
    [],
  );

  // Real-time conversion
  useEffect(() => {
    convert(input, options);
  }, [input, options, convert]);

  const handleCopySlug = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const separators = [
    { label: 'Hyphen (-)', value: '-' },
    { label: 'Underscore (_)', value: '_' },
    { label: 'Dot (.)', value: '.' },
  ];

  const checkboxes: { key: keyof SlugOptions; label: string }[] = [
    { key: 'lowercase', label: 'Lowercase' },
    { key: 'removeStopWords', label: 'Remove stop words' },
    { key: 'stripDiacritics', label: 'Strip diacritics (cafe)' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Text</label>
        <input
          type="text"
          className="tool-input w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert to slug..."
        />
      </div>

      {/* Output */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Slug</label>
        <div className="tool-output py-3 px-4">
          <p className="font-mono text-lg text-text-primary break-all">
            {output || 'slug-will-appear-here'}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="tool-card flex flex-col gap-4">
        {/* Separator */}
        <div className="flex flex-col gap-2">
          <label className="tool-label">Separator</label>
          <div className="flex flex-wrap gap-4">
            {separators.map((sep) => (
              <label
                key={sep.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="slug-separator"
                  className="tool-checkbox"
                  checked={options.separator === sep.value}
                  onChange={() =>
                    setOptions({ ...options, separator: sep.value })
                  }
                />
                <span className="text-sm text-text-secondary">{sep.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3">
          {checkboxes.map((cb) => (
            <label
              key={cb.key}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="tool-checkbox"
                checked={options[cb.key] as boolean}
                onChange={(e) =>
                  setOptions({ ...options, [cb.key]: e.target.checked })
                }
              />
              <span className="text-sm text-text-secondary">{cb.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopySlug}
          className="tool-btn-secondary"
          disabled={!output}
        >
          Copy Slug
        </button>
        <button onClick={handleClear} className="tool-btn-danger">
          Clear
        </button>
      </div>

      {/* Example */}
      <div className="tool-card">
        <p className="text-sm text-text-muted">
          Example: <span className="font-mono">&apos;Hello World! This is a Test.&apos;</span>{' '}
          <span className="text-accent">&rarr;</span>{' '}
          <span className="font-mono text-text-secondary">&apos;hello-world-this-is-a-test&apos;</span>
        </p>
      </div>
    </div>
  );
}
