'use client';

import { useState, useCallback, useEffect } from 'react';

function encodeBase64(text: string): string {
  try {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch {
    return '';
  }
}

function decodeBase64(b64: string): string {
  try {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  } catch {
    throw new Error('Invalid Base64 string');
  }
}

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleConvert = useCallback(() => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(encodeBase64(input));
      } else {
        setOutput(decodeBase64(input));
      }
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input, mode]);

  // Real-time conversion
  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
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
    setError('');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleToggleEncode = () => {
    setMode('encode');
    setError('');
  };

  const handleToggleDecode = () => {
    setMode('decode');
    setError('');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleEncode}
          className={mode === 'encode' ? 'tool-btn-primary' : 'tool-btn-secondary'}
        >
          Encode &rarr;
        </button>
        <button
          onClick={handleToggleDecode}
          className={mode === 'decode' ? 'tool-btn-primary' : 'tool-btn-secondary'}
        >
          &larr; Decode
        </button>
        <span className="text-sm text-text-muted ml-2">
          {mode === 'encode' ? 'Converting text to Base64' : 'Converting Base64 to text'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Column */}
        <div className="flex flex-col gap-3">
          <label className="tool-label">
            {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
          </label>
          <textarea
            className="tool-input font-mono min-h-[300px] w-full resize-y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
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
            {mode === 'encode' ? 'Base64 Output' : 'Text Output'}
          </label>
          <textarea
            className="tool-output font-mono min-h-[300px] w-full resize-y"
            value={output}
            readOnly
            placeholder={
              mode === 'encode'
                ? 'Base64 encoded text will appear here'
                : 'Decoded text will appear here'
            }
            spellCheck={false}
          />
          {error && (
            <p className="text-danger text-sm">{error}</p>
          )}
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
