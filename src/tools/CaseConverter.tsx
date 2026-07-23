'use client';

import { useState } from 'react';

type CaseType =
  | 'uppercase'
  | 'lowercase'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant';

function toTitleCase(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function toSentenceCase(text: string): string {
  let result = '';
  let capitalizeNext = true;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[.!?]/.test(char)) {
      result += char;
      capitalizeNext = true;
    } else if (capitalizeNext && /[a-zA-Z]/.test(char)) {
      result += char.toUpperCase();
      capitalizeNext = false;
    } else {
      result += char.toLowerCase();
    }
  }
  return result;
}

function toCamelCase(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

function toPascalCase(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  return words
    .map((word) => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

function toSnakeCase(text: string): string {
  return text.trim().split(/\s+/).filter(Boolean).join('_').toLowerCase();
}

function toKebabCase(text: string): string {
  return text.trim().split(/\s+/).filter(Boolean).join('-').toLowerCase();
}

function toConstantCase(text: string): string {
  return text.trim().split(/\s+/).filter(Boolean).join('_').toUpperCase();
}

function convert(text: string, type: CaseType): string {
  if (!text) return '';
  switch (type) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'title':
      return toTitleCase(text);
    case 'sentence':
      return toSentenceCase(text);
    case 'camel':
      return toCamelCase(text);
    case 'pascal':
      return toPascalCase(text);
    case 'snake':
      return toSnakeCase(text);
    case 'kebab':
      return toKebabCase(text);
    case 'constant':
      return toConstantCase(text);
    default:
      return text;
  }
}

const CASE_BUTTONS: { label: string; type: CaseType }[] = [
  { label: 'UPPERCASE', type: 'uppercase' },
  { label: 'lowercase', type: 'lowercase' },
  { label: 'Title Case', type: 'title' },
  { label: 'Sentence case', type: 'sentence' },
  { label: 'camelCase', type: 'camel' },
  { label: 'PascalCase', type: 'pascal' },
  { label: 'snake_case', type: 'snake' },
  { label: 'kebab-case', type: 'kebab' },
  { label: 'CONSTANT_CASE', type: 'constant' },
];

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);

  const handleConvert = (type: CaseType) => {
    setOutput(convert(input, type));
    setActiveCase(type);
  };

  const handleCopyResult = async () => {
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
    setActiveCase(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Input Text</label>
        <textarea
          className="tool-input min-h-[120px] w-full resize-y"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          spellCheck={false}
        />
      </div>

      {/* Conversion Buttons */}
      <div className="flex flex-col gap-2">
        <label className="tool-label">Conversion</label>
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {CASE_BUTTONS.map((btn) => (
            <button
              key={btn.type}
              onClick={() => handleConvert(btn.type)}
              className={
                activeCase === btn.type
                  ? 'tool-btn-primary whitespace-nowrap'
                  : 'tool-btn-secondary whitespace-nowrap'
              }
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Output</label>
        <textarea
          className="tool-output min-h-[120px] w-full resize-y"
          value={output}
          readOnly
          placeholder="Converted text will appear here..."
          spellCheck={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopyResult}
          className="tool-btn-secondary"
          disabled={!output}
        >
          Copy Result
        </button>
        <button onClick={handleClear} className="tool-btn-danger">
          Clear
        </button>
      </div>
    </div>
  );
}
