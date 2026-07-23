export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: 'Data Format' | 'Encoders' | 'Generators' | 'Text Tools';
  keywords: string[];
  iconName: string;
}

export const categories = ['All', 'Data Format', 'Encoders', 'Generators', 'Text Tools'] as const;

export const tools: Tool[] = [
  // Data Format
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and beautify JSON data instantly. Paste your JSON, get perfectly formatted output.',
    category: 'Data Format',
    keywords: ['json formatter', 'format json', 'beautify json', 'json beautifier', 'json validator'],
    iconName: 'Braces',
  },
  {
    slug: 'json-to-csv',
    name: 'JSON to CSV Converter',
    description: 'Convert JSON data to CSV format. Supports nested objects and arrays with dot notation.',
    category: 'Data Format',
    keywords: ['json to csv', 'convert json to csv', 'json csv converter', 'json to csv online'],
    iconName: 'Table',
  },
  {
    slug: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries with proper indentation and keyword highlighting.',
    category: 'Data Format',
    keywords: ['sql formatter', 'format sql', 'beautify sql', 'sql beautifier', 'sql format online'],
    iconName: 'Database',
  },
  {
    slug: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format and beautify XML documents with proper indentation and namespace support.',
    category: 'Data Format',
    keywords: ['xml formatter', 'format xml', 'beautify xml', 'xml beautifier', 'xml format online'],
    iconName: 'FileCode',
  },

  // Encoders
  {
    slug: 'base64',
    name: 'Base64 Encode/Decode',
    description: 'Encode text to Base64 or decode Base64 to text. Full UTF-8 support with real-time conversion.',
    category: 'Encoders',
    keywords: ['base64 decode', 'base64 encode', 'base64 decoder', 'base64 encoder', 'base64 online'],
    iconName: 'Lock',
  },
  {
    slug: 'url-encoder',
    name: 'URL Encode/Decode',
    description: 'Encode text for URLs or decode URL-encoded strings. Handles query parameters properly.',
    category: 'Encoders',
    keywords: ['url encode', 'url decode', 'urlencode online', 'url decoder', 'encode url'],
    iconName: 'Link',
  },
  {
    slug: 'html-encode',
    name: 'HTML Entity Encoder',
    description: 'Encode special characters to HTML entities or decode them back. Supports named and numeric entities.',
    category: 'Encoders',
    keywords: ['html entity encode', 'html encode', 'html decode', 'html entity decoder', 'html special characters'],
    iconName: 'Code',
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text. All processing is client-side.',
    category: 'Encoders',
    keywords: ['hash generator', 'sha256 hash', 'md5 hash', 'sha1 hash', 'hash online', 'sha512 generator'],
    iconName: 'Shield',
  },

  // Generators
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate v4 UUIDs instantly. Create one or batch generate multiple UUIDs with custom formatting.',
    category: 'Generators',
    keywords: ['uuid generator', 'uuid v4', 'generate uuid', 'uuid online', 'random uuid'],
    iconName: 'Fingerprint',
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode JWT tokens and inspect header and payload. All processing happens in your browser.',
    category: 'Generators',
    keywords: ['jwt decoder', 'decode jwt', 'jwt decoder online', 'jwt parser', 'jwt inspect'],
    iconName: 'Key',
  },
  {
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from any text or URL. Download as PNG with customizable size and colors.',
    category: 'Generators',
    keywords: ['qr code generator', 'generate qr code', 'qr code online', 'qr generator free', 'make qr code'],
    iconName: 'QrCode',
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords with customizable length and character sets. Cryptographically random.',
    category: 'Generators',
    keywords: ['password generator', 'strong password', 'generate password', 'random password', 'secure password'],
    iconName: 'KeyRound',
  },

  // Text Tools
  {
    slug: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text. Includes reading time estimate.',
    category: 'Text Tools',
    keywords: ['word counter', 'word count', 'character counter', 'count words online', 'text counter'],
    iconName: 'TextCursor',
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between uppercase, lowercase, title case, camelCase, snake_case, and more.',
    category: 'Text Tools',
    keywords: ['case converter', 'convert case', 'uppercase converter', 'camelcase converter', 'snake case converter'],
    iconName: 'CaseSensitive',
  },
  {
    slug: 'text-to-slug',
    name: 'Text to Slug Converter',
    description: 'Convert any text to URL-friendly slugs. Perfect for SEO-friendly URLs with stop word removal.',
    category: 'Text Tools',
    keywords: ['text to slug', 'slug generator', 'url slug converter', 'slugify', 'slug converter'],
    iconName: 'Hash',
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  if (category === 'All') return tools;
  return tools.filter(t => t.category === category);
}

export function getRelatedTools(tool: Tool): Tool[] {
  return tools.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 3);
}
