'use client';

import { useState, useCallback } from 'react';

const MAJOR_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE',
  'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', 'JOIN',
  'ON', 'GROUP BY', 'ORDER BY', 'HAVING',
  'LIMIT', 'OFFSET',
  'INSERT', 'INTO', 'VALUES',
  'UPDATE', 'SET',
  'DELETE', 'FROM',
  'CREATE', 'TABLE', 'ALTER', 'DROP',
  'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
  'AS', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'LIKE', 'BETWEEN', 'EXISTS',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'ASC', 'DESC', 'DISTINCT', 'ALL',
  'WITH', 'RECURSIVE',
];

function formatSql(input: string): string {
  // Remove extra whitespace but preserve content
  let sql = input.trim().replace(/\s+/g, ' ');

  // Protect quoted strings
  const strings: string[] = [];
  sql = sql.replace(/'[^']*'/g, (match) => {
    strings.push(match);
    return `__STRING_${strings.length - 1}__`;
  });
  sql = sql.replace(/"[^"]*"/g, (match) => {
    strings.push(match);
    return `__STRING_${strings.length - 1}__`;
  });

  // Find all keywords (case-insensitive) and replace with uppercase versions
  // Also add newlines before major clause keywords
  const clauseKeywords = ['SELECT', 'FROM', 'WHERE',
    'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', 'JOIN',
    'ON', 'GROUP BY', 'ORDER BY', 'HAVING',
    'LIMIT', 'OFFSET',
    'INSERT', 'INTO', 'VALUES',
    'UPDATE', 'SET',
    'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP',
    'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
    'WITH',
  ];

  // Uppercase all keywords
  const keywordPatterns = MAJOR_KEYWORDS.sort((a, b) => b.length - a.length).map(kw => kw.toUpperCase());

  const upperKeyword = (token: string): string => {
    const upper = token.toUpperCase();
    for (const kw of keywordPatterns) {
      if (upper === kw) {
        return kw;
      }
    }
    return token;
  };

  // Tokenize: split by spaces while respecting parentheses and commas
  const tokens: string[] = [];
  let i = 0;
  let current = '';
  while (i < sql.length) {
    const ch = sql[i];
    if (ch === '(' || ch === ')' || ch === ',') {
      if (current.trim()) {
        tokens.push(current.trim());
        current = '';
      }
      tokens.push(ch);
    } else if (ch === ' ') {
      if (current.trim()) {
        tokens.push(current.trim());
        current = '';
      }
    } else {
      current += ch;
    }
    i++;
  }
  if (current.trim()) {
    tokens.push(current.trim());
  }

  // Now format: uppercase keywords, add newlines before clause keywords
  const NEWLINE_BEFORE = new Set(clauseKeywords.map(k => k.toUpperCase()));
  const resultLines: string[] = [];
  let currentLine = '';
  let indent = 0;

  for (let idx = 0; idx < tokens.length; idx++) {
    const token = tokens[idx];
    const upperToken = upperKeyword(token);

    // Check if this token starts a multi-word keyword (like LEFT JOIN)
    let multiWordKw = upperToken;
    if (idx + 1 < tokens.length) {
      const nextUpper = upperKeyword(tokens[idx + 1]);
      const combined = `${multiWordKw} ${nextUpper}`;
      if (NEWLINE_BEFORE.has(combined)) {
        multiWordKw = combined;
      }
    }

    if (multiWordKw === '(') {
      currentLine += '(';
      indent++;
    } else if (multiWordKw === ')') {
      indent = Math.max(0, indent - 1);
      currentLine += ')';
    } else if (multiWordKw === ',') {
      currentLine += ',';
    } else if (NEWLINE_BEFORE.has(multiWordKw) && currentLine.trim() !== '') {
      resultLines.push(currentLine.trimEnd());
      currentLine = '';
      // Push the keyword (maybe multi-word)
      if (multiWordKw.includes(' ')) {
        currentLine = '  '.repeat(indent) + multiWordKw;
        idx++; // Skip the second word since we consumed both
      } else {
        currentLine = '  '.repeat(indent) + upperToken;
      }
      currentLine += ' ';
    } else if (multiWordKw === upperToken) {
      currentLine += upperToken + ' ';
    } else {
      currentLine += multiWordKw + ' ';
    }
  }

  if (currentLine.trim()) {
    resultLines.push(currentLine.trimEnd());
  }

  let result = resultLines.join('\n');

  // Restore quoted strings
  result = result.replace(/__STRING_(\d+)__/g, (_, n) => strings[parseInt(n)] || '');

  return result;
}

function minifySql(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFormat = useCallback(() => {
    setOutput(formatSql(input));
  }, [input]);

  const handleMinify = useCallback(() => {
    setOutput(minifySql(input));
  }, [input]);

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
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Input Column */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">SQL Input</label>
        <textarea
          className="tool-input font-mono min-h-[300px] w-full resize-y"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT * FROM users WHERE id = 1"
          spellCheck={false}
        />
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
        <label className="tool-label">Formatted SQL</label>
        <textarea
          className="tool-output font-mono min-h-[300px] w-full resize-y"
          value={output}
          readOnly
          placeholder="Formatted SQL will appear here"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
