'use client';

import { useState, useCallback } from 'react';

interface UuidOptions {
  uppercase: boolean;
  hyphens: boolean;
  braces: boolean;
}

function formatUuid(uuid: string, options: UuidOptions): string {
  let result = uuid;

  if (!options.hyphens) {
    result = result.replace(/-/g, '');
  }

  if (options.uppercase) {
    result = result.toUpperCase();
  }

  if (options.braces) {
    result = `{${result}}`;
  }

  return result;
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [options, setOptions] = useState<UuidOptions>({
    uppercase: false,
    hyphens: true,
    braces: false,
  });

  const generateUuids = useCallback((count: number) => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      const uuid = crypto.randomUUID();
      newUuids.push(formatUuid(uuid, options));
    }
    setUuids(newUuids);
  }, [options]);

  const handleCopyAll = async () => {
    if (uuids.length === 0) return;
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleClear = () => {
    setUuids([]);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Generate Buttons */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => generateUuids(1)} className="tool-btn-primary">
          Generate 1
        </button>
        <button onClick={() => generateUuids(10)} className="tool-btn-primary">
          Generate 10
        </button>
        <button onClick={() => generateUuids(100)} className="tool-btn-primary">
          Generate 100
        </button>
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-6">
        {/* Case Radio */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-secondary font-medium">Case:</span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="case"
              className="tool-checkbox"
              checked={!options.uppercase}
              onChange={() => setOptions({ ...options, uppercase: false })}
            />
            <span className="text-sm text-text-secondary">Lowercase</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="case"
              className="tool-checkbox"
              checked={options.uppercase}
              onChange={() => setOptions({ ...options, uppercase: true })}
            />
            <span className="text-sm text-text-secondary">Uppercase</span>
          </label>
        </div>

        {/* Hyphens Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="tool-checkbox"
            checked={options.hyphens}
            onChange={(e) => setOptions({ ...options, hyphens: e.target.checked })}
          />
          <span className="text-sm text-text-secondary">Include hyphens</span>
        </label>

        {/* Braces Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="tool-checkbox"
            checked={options.braces}
            onChange={(e) => setOptions({ ...options, braces: e.target.checked })}
          />
          <span className="text-sm text-text-secondary">Include braces</span>
        </label>
      </div>

      {/* Output */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Generated UUIDs ({uuids.length})</label>
        <div className="tool-output min-h-[200px] max-h-[500px] overflow-y-auto p-4">
          {uuids.length === 0 ? (
            <p className="text-text-muted text-sm">Click a generate button to create UUIDs</p>
          ) : (
            <div className="flex flex-col gap-1">
              {uuids.map((uuid, index) => (
                <div key={index} className="font-mono text-sm text-text-primary break-all">
                  {uuid}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button onClick={handleCopyAll} className="tool-btn-secondary" disabled={uuids.length === 0}>
          Copy All
        </button>
        <button onClick={handleClear} className="tool-btn-danger" disabled={uuids.length === 0}>
          Clear
        </button>
      </div>
    </div>
  );
}
