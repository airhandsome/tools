'use client';

import { useState, useCallback } from 'react';

function formatXmlNode(node: Node, indent: number): string {
  let result = '';

  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as Element;
    const indentStr = '  '.repeat(indent);
    const children = Array.from(el.childNodes);
    const hasChildElements = children.some(
      (c) => c.nodeType === Node.ELEMENT_NODE
    );
    const textContent = children
      .filter((c) => c.nodeType === Node.TEXT_NODE)
      .map((c) => c.textContent)
      .join('')
      .trim();

    // Build attributes string
    let tagParts = `<${el.tagName}`;
    if (el.attributes.length > 0) {
      const attrs = Array.from(el.attributes)
        .map((a) => `${a.name}="${a.value}"`)
        .join(' ');
      tagParts += ` ${attrs}`;
    }

    if (children.length === 0) {
      // Self-closing
      result += `${indentStr}${tagParts} />\n`;
    } else if (!hasChildElements && textContent !== '') {
      // Only text, same line
      result += `${indentStr}${tagParts}>${textContent}</${el.tagName}>\n`;
    } else {
      // Has child elements
      result += `${indentStr}${tagParts}>\n`;
      for (const child of children) {
        result += formatXmlNode(child, indent + 1);
      }
      result += `${indentStr}</${el.tagName}>\n`;
    }
  } else if (node.nodeType === Node.TEXT_NODE) {
    const text = (node.textContent || '').trim();
    if (text) {
      result += `${'  '.repeat(indent)}${text}\n`;
    }
  } else if (node.nodeType === Node.COMMENT_NODE) {
    result += `${'  '.repeat(indent)}<!--${(node as Comment).data}-->\n`;
  } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
    result += `${'  '.repeat(indent)}<![CDATA[${(node as CDATASection).data}]]>\n`;
  }

  return result;
}

function formatXml(input: string): string {
  // Check for XML declaration
  let xmlDecl = '';
  let body = input;
  const declMatch = input.match(/^<\?xml[^?]*\?>/);
  if (declMatch) {
    xmlDecl = declMatch[0] + '\n';
    body = input.slice(declMatch[0].length);
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(body, 'text/xml');

  // Check for parse errors
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error(parseError.textContent || 'Invalid XML');
  }

  let result = xmlDecl;
  for (const child of Array.from(doc.childNodes)) {
    result += formatXmlNode(child, 0);
  }
  return result.trimEnd();
}

function minifyXml(input: string): string {
  // Preserve XML declaration
  let xmlDecl = '';
  let body = input;
  const declMatch = input.match(/^<\?xml[^?]*\?>/);
  if (declMatch) {
    xmlDecl = declMatch[0];
    body = input.slice(declMatch[0].length);
  }

  // Remove all whitespace between tags
  const minified = body
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();

  return xmlDecl + minified;
}

export default function XmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = useCallback(() => {
    try {
      const formatted = formatXml(input);
      setOutput(formatted);
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    try {
      setOutput(minifyXml(input));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
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
    setError('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Input Column */}
      <div className="flex flex-col gap-3">
        <label className="tool-label">XML Input</label>
        <textarea
          className="tool-input font-mono min-h-[300px] w-full resize-y"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<root><item>value</item></root>"
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
        <label className="tool-label">Formatted XML</label>
        <textarea
          className="tool-output font-mono min-h-[300px] w-full resize-y"
          value={output}
          readOnly
          placeholder="Formatted XML will appear here"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
