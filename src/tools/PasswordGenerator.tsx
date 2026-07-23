'use client';

import { useState, useEffect, useCallback } from 'react';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  special: boolean;
  excludeAmbiguous: boolean;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = '0Ol1I';

function getSecureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword(opts: PasswordOptions): string {
  let charset = '';
  if (opts.uppercase) charset += UPPERCASE;
  if (opts.lowercase) charset += LOWERCASE;
  if (opts.numbers) charset += NUMBERS;
  if (opts.special) charset += SPECIAL;

  if (opts.excludeAmbiguous) {
    charset = charset
      .split('')
      .filter((c) => !AMBIGUOUS.includes(c))
      .join('');
  }

  if (!charset) return '';

  let password = '';
  for (let i = 0; i < opts.length; i++) {
    password += charset[getSecureRandomInt(charset.length)];
  }

  return password;
}

function calculateStrength(password: string, opts: PasswordOptions): number {
  if (!password) return 0;

  let variety = 0;
  if (/[A-Z]/.test(password)) variety++;
  if (/[a-z]/.test(password)) variety++;
  if (/[0-9]/.test(password)) variety++;
  if (/[^A-Za-z0-9]/.test(password)) variety++;

  const varietyBonus = variety > 0 ? (variety - 1) * 0.25 : 0;
  const rawStrength = password.length * (1 + varietyBonus);
  const maxStrength = 64 * (1 + 0.75);
  return Math.min(100, (rawStrength / maxStrength) * 100);
}

function getStrengthLabel(strength: number): string {
  if (strength < 40) return 'Weak';
  if (strength < 70) return 'Medium';
  if (strength < 90) return 'Strong';
  return 'Very Strong';
}

function getStrengthColor(strength: number): string {
  if (strength < 40) return '#F85149';
  if (strength < 70) return '#F0883E';
  if (strength < 90) return '#3FB950';
  return '#2EA043';
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
    excludeAmbiguous: false,
  });

  const handleGenerate = useCallback(() => {
    setPassword(generatePassword(options));
  }, [options]);

  // Generate on mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
    } catch {
      // Clipboard API may not be available
    }
  };

  const strength = calculateStrength(password, options);
  const strengthLabel = getStrengthLabel(strength);
  const strengthColor = getStrengthColor(strength);

  const checkboxes: { key: keyof PasswordOptions; label: string }[] = [
    { key: 'uppercase', label: 'Include uppercase (A-Z)' },
    { key: 'lowercase', label: 'Include lowercase (a-z)' },
    { key: 'numbers', label: 'Include numbers (0-9)' },
    { key: 'special', label: 'Include special characters (!@#$%^&*...)' },
    { key: 'excludeAmbiguous', label: 'Exclude ambiguous (0, O, l, 1, I)' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Password Display */}
      <div className="tool-output py-4 px-4 text-center">
        <p className="font-mono text-2xl text-text-primary break-all">
          {password || 'Click Generate'}
        </p>
      </div>

      {/* Strength Indicator */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Password Strength</span>
          <span className="text-sm font-medium" style={{ color: strengthColor }}>
            {strengthLabel}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${strength}%`,
              backgroundColor: strengthColor,
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleGenerate}
          className="tool-btn-primary text-base px-6 py-2"
        >
          Generate
        </button>
        <button
          onClick={handleCopy}
          className="tool-btn-secondary"
          disabled={!password}
        >
          Copy
        </button>
      </div>

      {/* Options Panel */}
      <div className="tool-card flex flex-col gap-4">
        {/* Length Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="tool-label mb-0">Length</label>
            <span className="text-sm text-text-primary font-mono font-bold">
              {options.length}
            </span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={options.length}
            onChange={(e) =>
              setOptions({ ...options, length: parseInt(e.target.value) })
            }
            className="tool-slider"
          />
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
    </div>
  );
}
