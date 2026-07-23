'use client';

import { useState, useCallback, useEffect } from 'react';

function encodeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function decodeHtml(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export default function HtmlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = useCallback(() => {
    if (!input) {
      setOutput('');
      return;
    }
    if (mode === 'encode') {
      setOutput(encodeHtml(input));
    } else {
      setOutput(decodeHtml(input));
    }
  }, [input, mode]);

  // Real-time conversion
  useEffect(() => {
    handleConvert();
  }, [input, mode, handleConvert]);

  const handleCopyInput = async () => {
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input);
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleCopyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMode('encode')}
          className={mode === 'encode' ? 'tool-btn-primary' : 'tool-btn-secondary'}
        >
          Encode &rarr;
        </button>
        <button
          onClick={() => setMode('decode')}
          className={mode === 'decode' ? 'tool-btn-primary' : 'tool-btn-secondary'}
        >
          &larr; Decode
        </button>
        <span className="text-sm text-text-muted ml-2">
          {mode === 'encode'
            ? 'Converting text to HTML entities'
            : 'Converting HTML entities to text'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Column */}
        <div className="flex flex-col gap-3">
          <label className="tool-label">
            {mode === 'encode' ? 'Text Input' : 'HTML-Encoded Input'}
          </label>
          <textarea
            className="tool-input font-mono min-h-[300px] w-full resize-y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Enter text to HTML encode...'
                : 'Enter HTML entities to decode...'
            }
            spellCheck={false}
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={handleCopyInput} className="tool-btn-secondary">
              Copy Input
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col gap-3">
          <label className="tool-label">
            {mode === 'encode' ? 'HTML-Encoded Output' : 'Decoded Output'}
          </label>
          <textarea
            className="tool-output font-mono min-h-[300px] w-full resize-y"
            value={output}
            readOnly
            placeholder={
              mode === 'encode'
                ? 'HTML-encoded text will appear here'
                : 'Decoded text will appear here'
            }
            spellCheck={false}
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={handleCopyOutput} className="tool-btn-secondary">
              Copy Output
            </button>
            <button onClick={handleSwap} className="tool-btn-secondary">
              Swap
            </button>
            <button onClick={handleClear} className="tool-btn-danger">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
