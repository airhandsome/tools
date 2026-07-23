'use client';

import { useState, useCallback } from 'react';

export default function JsonToCsv() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [delimiter, setDelimiter] = useState(',');
  const [flatten, setFlatten] = useState(true);

  const flattenObject = (
    obj: Record<string, unknown>,
    prefix = ''
  ): Record<string, string> => {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
      } else {
        result[newKey] = value === null || value === undefined ? '' : String(value);
      }
    }
    return result;
  };

  const escapeCsvValue = (value: string): string => {
    if (
      value.includes(delimiter) ||
      value.includes('"') ||
      value.includes('\n') ||
      value.includes('\r')
    ) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const handleConvert = useCallback(() => {
    try {
      setError('');
      let parsed = JSON.parse(input);

      if (!Array.isArray(parsed)) {
        parsed = [parsed];
      }

      if (parsed.length === 0) {
        setOutput('');
        setError('JSON array is empty');
        return;
      }

      const processed = flatten ? parsed.map((item: unknown) => flattenObject(item as Record<string, unknown>)) : parsed;
      const headersSet = new Set<string>();
      for (const item of processed) {
        Object.keys(item).forEach((k) => headersSet.add(k));
      }
      const headers = Array.from(headersSet);
      const lines: string[] = [];

      if (includeHeaders) {
        lines.push(headers.map(escapeCsvValue).join(delimiter));
      }

      for (const item of processed) {
        const row = headers.map((h) => escapeCsvValue(item[h] ?? ''));
        lines.push(row.join(delimiter));
      }

      setOutput(lines.join('\n'));
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input, includeHeaders, delimiter, flatten]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.csv';
    link.click();
    URL.revokeObjectURL(url);
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
        <label className="tool-label">Input (JSON Array)</label>
        <textarea
          className="tool-input font-mono min-h-[300px] w-full resize-y"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='[{"name": "John", "age": 30}]'
          spellCheck={false}
        />

        {/* Options */}
        <div className="tool-card flex flex-col gap-3">
          <label className="text-xs text-text-secondary font-medium">Options</label>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="tool-checkbox"
                checked={includeHeaders}
                onChange={(e) => setIncludeHeaders(e.target.checked)}
              />
              <span className="text-sm text-text-secondary">Include Headers</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="tool-checkbox"
                checked={flatten}
                onChange={(e) => setFlatten(e.target.checked)}
              />
              <span className="text-sm text-text-secondary">Flatten Nested</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Delimiter:</span>
              <input
                type="text"
                className="tool-input w-16 px-2 py-1 text-center text-sm"
                value={delimiter}
                maxLength={1}
                onChange={(e) => setDelimiter(e.target.value || ',')}
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-danger text-sm">{error}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <button onClick={handleConvert} className="tool-btn-primary">
            Convert
          </button>
          <button onClick={handleCopy} className="tool-btn-secondary">
            Copy CSV
          </button>
          <button onClick={handleDownload} className="tool-btn-secondary">
            Download CSV
          </button>
          <button onClick={handleClear} className="tool-btn-danger">
            Clear
          </button>
        </div>
      </div>

      {/* Output Column */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">CSV Output</label>
        <textarea
          className="tool-output font-mono min-h-[300px] w-full resize-y"
          value={output}
          readOnly
          placeholder="CSV output will appear here"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
