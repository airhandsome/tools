'use client';

import { useState, useCallback, useEffect } from 'react';

function base64UrlDecode(str: string): string {
  // Convert base64url to base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  // Pad with '=' if needed
  const padding = base64.length % 4;
  if (padding) {
    base64 += '='.repeat(4 - padding);
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

interface ExpiryInfo {
  isExpired: boolean;
  expiryDate: string | null;
  issuedDate: string | null;
}

const EMPTY_EXPIRY: ExpiryInfo = {
  isExpired: false,
  expiryDate: null,
  issuedDate: null,
};

export default function JwtDecoder() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState<Record<string, unknown> | null>(null);
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');
  const [expiryInfo, setExpiryInfo] = useState<ExpiryInfo>(EMPTY_EXPIRY);

  const decodeJwt = useCallback((token: string) => {
    if (!token.trim()) {
      setHeader(null);
      setPayload(null);
      setError('');
      setExpiryInfo(EMPTY_EXPIRY);
      return;
    }

    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
      }

      const headerObj = JSON.parse(base64UrlDecode(parts[0]));
      const payloadObj = JSON.parse(base64UrlDecode(parts[1]));

      setHeader(headerObj);
      setPayload(payloadObj);
      setError('');

      // Check expiry info
      const now = Math.floor(Date.now() / 1000);
      const info: ExpiryInfo = {
        isExpired: false,
        expiryDate: null,
        issuedDate: null,
      };

      if (payloadObj.iat && typeof payloadObj.iat === 'number') {
        info.issuedDate = new Date(payloadObj.iat * 1000).toLocaleString();
      }

      if (payloadObj.exp && typeof payloadObj.exp === 'number') {
        info.expiryDate = new Date(payloadObj.exp * 1000).toLocaleString();
        info.isExpired = payloadObj.exp < now;
      }

      setExpiryInfo(info);
    } catch (e) {
      setHeader(null);
      setPayload(null);
      setExpiryInfo(EMPTY_EXPIRY);
      setError((e as Error).message);
    }
  }, []);

  // Auto-decode on input change
  useEffect(() => {
    decodeJwt(input);
  }, [input, decodeJwt]);

  const handleCopyHeader = async () => {
    if (!header) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(header, null, 2));
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleCopyPayload = async () => {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    } catch {
      // Clipboard API may not be available
    }
  };

  const handleClear = () => {
    setInput('');
    setHeader(null);
    setPayload(null);
    setError('');
    setExpiryInfo(EMPTY_EXPIRY);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">JWT Token</label>
        <textarea
          className="tool-input font-mono min-h-[100px] w-full resize-y"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JWT token here..."
          spellCheck={false}
        />
        {error && (
          <p className="text-danger text-sm">{error}</p>
        )}
      </div>

      {/* Output Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <label className="tool-label">Header</label>
          <div
            className="tool-output min-h-[180px] p-4"
            style={{ borderLeft: '3px solid var(--accent, #1F6FEB)' }}
          >
            {header ? (
              <pre className="font-mono text-sm text-text-primary whitespace-pre-wrap break-all">
                {JSON.stringify(header, null, 2)}
              </pre>
            ) : (
              <p className="text-text-muted text-sm">Header will appear here</p>
            )}
          </div>
          <button onClick={handleCopyHeader} className="tool-btn-secondary self-start" disabled={!header}>
            Copy Header
          </button>
        </div>

        {/* Payload Section */}
        <div className="flex flex-col gap-2">
          <label className="tool-label">Payload</label>
          <div
            className="tool-output min-h-[180px] p-4"
            style={{ borderLeft: '3px solid var(--success, #3FB950)' }}
          >
            {payload ? (
              <pre className="font-mono text-sm text-text-primary whitespace-pre-wrap break-all">
                {JSON.stringify(payload, null, 2)}
              </pre>
            ) : (
              <p className="text-text-muted text-sm">Payload will appear here</p>
            )}
          </div>
          <button onClick={handleCopyPayload} className="tool-btn-secondary self-start" disabled={!payload}>
            Copy Payload
          </button>
        </div>
      </div>

      {/* Token Info */}
      {header && payload && (
        <div className="flex flex-col gap-2">
          <label className="tool-label">Token Information</label>
          <div className="tool-output p-4 flex flex-col gap-2">
            <div className="flex gap-2 text-sm">
              <span className="text-text-secondary font-medium min-w-[120px]">Algorithm:</span>
              <span className="text-text-primary font-mono">
                {typeof header.alg === 'string' ? header.alg : 'N/A'}
              </span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-text-secondary font-medium min-w-[120px]">Token Type:</span>
              <span className="text-text-primary font-mono">
                {typeof header.typ === 'string' ? header.typ : 'N/A'}
              </span>
            </div>
            {expiryInfo.issuedDate && (
              <div className="flex gap-2 text-sm">
                <span className="text-text-secondary font-medium min-w-[120px]">Issued At:</span>
                <span className="text-text-primary">{expiryInfo.issuedDate}</span>
              </div>
            )}
            {expiryInfo.expiryDate && (
              <div className="flex gap-2 text-sm">
                <span className="text-text-secondary font-medium min-w-[120px]">Expiry:</span>
                <span className={expiryInfo.isExpired ? 'text-danger' : 'text-success'}>
                  {expiryInfo.expiryDate}
                </span>
              </div>
            )}
            {expiryInfo.isExpired && expiryInfo.expiryDate && (
              <p className="text-danger text-sm font-medium mt-1">
                {'\u26A0'} This token expired on {expiryInfo.expiryDate}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Security Note */}
      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: 'rgba(240, 136, 62, 0.1)',
          border: '1px solid rgba(240, 136, 62, 0.3)',
        }}
      >
        <p className="text-sm" style={{ color: '#F0883E' }}>
          <strong>Security Note:</strong> This tool only decodes JWT tokens. It does not verify
          signatures. Your token never leaves your device since all processing is client-side.
        </p>
      </div>

      {/* Clear Button */}
      <div className="flex flex-wrap gap-2">
        <button onClick={handleClear} className="tool-btn-danger">
          Clear
        </button>
      </div>
    </div>
  );
}
