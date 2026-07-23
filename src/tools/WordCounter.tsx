'use client';

import { useState, useMemo } from 'react';

interface TextStats {
  words: number;
  charsWithSpaces: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

function calculateStats(text: string): TextStats {
  if (!text.trim()) {
    return {
      words: 0,
      charsWithSpaces: 0,
      charsNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0,
    };
  }

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return {
    words,
    charsWithSpaces,
    charsNoSpaces,
    sentences,
    paragraphs,
    readingTime,
  };
}

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => calculateStats(text), [text]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleClear = () => {
    setText('');
  };

  const statCards: { label: string; value: number; suffix?: string }[] = [
    { label: 'Words', value: stats.words },
    { label: 'Characters (with spaces)', value: stats.charsWithSpaces },
    { label: 'Characters (no spaces)', value: stats.charsNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Reading Time', value: stats.readingTime, suffix: ' min read' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Text</label>
        <textarea
          className="tool-input min-h-[200px] w-full resize-y"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          spellCheck={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button onClick={handleCopy} className="tool-btn-secondary" disabled={!text}>
          Copy
        </button>
        <button onClick={handleClear} className="tool-btn-danger">
          Clear
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="tool-card flex flex-col items-center text-center">
            <span className="text-2xl text-accent font-bold">
              {card.value}
              {card.suffix && (
                <span className="text-sm text-text-secondary font-normal ml-1">
                  {card.suffix}
                </span>
              )}
            </span>
            <span className="text-xs text-text-secondary mt-1">{card.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
