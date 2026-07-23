'use client';

import { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';

interface QrOptions {
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  foreground: string;
  background: string;
}

export default function QrCodeGenerator() {
  const [input, setInput] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [options, setOptions] = useState<QrOptions>({
    size: 256,
    errorCorrectionLevel: 'M',
    foreground: '#000000',
    background: '#FFFFFF',
  });

  const generateQr = useCallback(async (text: string, opts: QrOptions) => {
    if (!text) {
      setQrDataUrl('');
      return;
    }
    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: opts.size,
        errorCorrectionLevel: opts.errorCorrectionLevel,
        color: {
          dark: opts.foreground,
          light: opts.background,
        },
      });
      setQrDataUrl(dataUrl);
    } catch {
      setQrDataUrl('');
    }
  }, []);

  useEffect(() => {
    generateQr(input, options);
  }, [input, options, generateQr]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setInput('');
    setQrDataUrl('');
  };

  const handleCopy = async () => {
    if (!qrDataUrl) return;
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
    } catch {
      // Clipboard API may not be available
    }
  };

  const sizes = [
    { label: '128px', value: 128 },
    { label: '256px', value: 256 },
    { label: '512px', value: 512 },
  ];

  const errorLevels: { label: string; value: 'L' | 'M' | 'Q' | 'H' }[] = [
    { label: 'L (7%)', value: 'L' },
    { label: 'M (15%)', value: 'M' },
    { label: 'Q (25%)', value: 'Q' },
    { label: 'H (30%)', value: 'H' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">Text or URL</label>
        <input
          type="text"
          className="tool-input w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or URL to encode..."
        />
      </div>

      {/* Options */}
      <div className="flex flex-col gap-4">
        {/* Size */}
        <div className="flex flex-col gap-2">
          <label className="tool-label">Size</label>
          <div className="flex flex-wrap gap-4">
            {sizes.map((s) => (
              <label key={s.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="qr-size"
                  className="tool-checkbox"
                  checked={options.size === s.value}
                  onChange={() => setOptions({ ...options, size: s.value })}
                />
                <span className="text-sm text-text-secondary">{s.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Error Correction */}
        <div className="flex flex-col gap-2">
          <label className="tool-label">Error Correction Level</label>
          <div className="flex flex-wrap gap-4">
            {errorLevels.map((e) => (
              <label key={e.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="qr-error"
                  className="tool-checkbox"
                  checked={options.errorCorrectionLevel === e.value}
                  onChange={() => setOptions({ ...options, errorCorrectionLevel: e.value })}
                />
                <span className="text-sm text-text-secondary">{e.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-2">
            <label className="tool-label">Foreground Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-12 h-10 rounded cursor-pointer bg-transparent border border-border"
                value={options.foreground}
                onChange={(e) => setOptions({ ...options, foreground: e.target.value })}
              />
              <span className="text-sm text-text-secondary font-mono">{options.foreground}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="tool-label">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-12 h-10 rounded cursor-pointer bg-transparent border border-border"
                value={options.background}
                onChange={(e) => setOptions({ ...options, background: e.target.value })}
              />
              <span className="text-sm text-text-secondary font-mono">{options.background}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDownload}
          className="tool-btn-primary"
          disabled={!qrDataUrl}
        >
          Download PNG
        </button>
        <button
          onClick={handleCopy}
          className="tool-btn-secondary"
          disabled={!qrDataUrl}
        >
          Copy Image
        </button>
        <button onClick={handleClear} className="tool-btn-danger">
          Clear
        </button>
      </div>

      {/* QR Code Output */}
      <div className="tool-card flex flex-col items-center justify-center min-h-[300px]">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="Generated QR Code"
            className="max-w-full max-h-[512px]"
            style={{ width: `${options.size}px`, height: `${options.size}px` }}
          />
        ) : (
          <p className="text-text-muted text-sm">
            QR code will appear here
          </p>
        )}
      </div>
    </div>
  );
}
