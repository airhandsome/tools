'use client';

import { useState } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const handleCopy = async () => {
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
    setError('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Input Column */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Input</label>
        <textarea
          className="tool-input font-mono min-h-[300px] w-full resize-y"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"hello": "world"}'
          spellCheck={false}
        />
        {error && (
          <p className="text-danger text-sm">{error}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button onClick={handleFormat} className="tool-btn-primary">
            Format
          </button>
          <button onClick={handleMinify} className="tool-btn-secondary">
            Minify
          </button>
          <button onClick={handleCopy} className="tool-btn-secondary">
            Copy Result
          </button>
          <button onClick={handleClear} className="tool-btn-danger">
            Clear
          </button>
        </div>
      </div>

      {/* Output Column */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Output</label>
        <textarea
          className="tool-output font-mono min-h-[300px] w-full resize-y"
          value={output}
          readOnly
          placeholder="Formatted JSON will appear here"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
