export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Record<string, Faq[]> = {
  'json-formatter': [
    { question: 'Is my JSON data sent to a server?', answer: 'No. All formatting happens entirely in your browser using JavaScript\'s built-in JSON parser. Your data never leaves your device — no servers, no APIs, no tracking.' },
    { question: 'What JSON formats are supported?', answer: 'Standard JSON objects, arrays, and primitive values. Nested structures of any depth are fully supported. The formatter handles all valid JSON syntax including escaped characters and Unicode.' },
    { question: 'Can I format large JSON files?', answer: 'Yes. Since all processing is client-side, you can format files of any size your browser can handle. There are no server-side limits — your device\'s memory is the only constraint.' },
    { question: 'Does this tool modify my data?', answer: 'No. Formatting only adds or removes whitespace for readability. Your actual data values, strings, numbers, and structure are never altered.' },
  ],
  'json-to-csv': [
    { question: 'How to convert JSON to CSV?', answer: 'Paste your JSON array into the input field, adjust options if needed (headers, delimiter, flattening), and click Convert. The CSV output appears instantly — no waiting, no uploads.' },
    { question: 'Can I convert nested JSON to CSV?', answer: 'Yes. Enable the "Flatten nested objects" option to convert nested keys to dot notation (e.g., user.name, address.city). This keeps your CSV readable while preserving the full data structure.' },
    { question: 'Is there a file size limit?', answer: 'No server-side limits exist. Your browser\'s memory is the only constraint. Most modern browsers can handle JSON files up to several hundred megabytes.' },
    { question: 'Does this work with JSON arrays?', answer: 'Yes. JSON arrays of objects are the primary use case. If you paste a single object, it\'s automatically wrapped in an array for conversion.' },
  ],
  'sql-formatter': [
    { question: 'Does this SQL formatter support all databases?', answer: 'It supports standard SQL syntax used by MySQL, PostgreSQL, SQLite, and most other databases. Database-specific extensions may not be perfectly formatted, but the core syntax is handled correctly.' },
    { question: 'Can I format complex queries with subqueries?', answer: 'Yes. The formatter handles subqueries, JOINs, UNIONs, and nested expressions. Each subquery gets its own indentation level for clear readability.' },
    { question: 'Is my SQL query sent anywhere?', answer: 'Absolutely not. All formatting is done in your browser using JavaScript. Your queries are never transmitted to any server. This is especially important for queries containing sensitive data.' },
    { question: 'What SQL keywords are supported?', answer: 'All major SQL keywords including SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, HAVING, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, and many more.' },
  ],
  'xml-formatter': [
    { question: 'What XML formats are supported?', answer: 'All valid XML documents including those with namespaces, attributes, CDATA sections, and processing instructions. The formatter preserves the complete XML structure.' },
    { question: 'Can I format large XML files?', answer: 'Yes. Since processing is entirely client-side, you can format XML files of any size your browser can handle. There are no upload limits or server restrictions.' },
    { question: 'Does this handle XML namespaces?', answer: 'Yes. Namespace declarations and prefixed elements are preserved exactly as-is. The formatter respects xmlns attributes and doesn\'t modify namespace bindings.' },
    { question: 'Is my XML data sent to a server?', answer: 'No. All formatting uses the browser\'s built-in DOMParser. Your XML stays on your device — never uploaded, never stored, never tracked.' },
  ],
  'base64': [
    { question: 'What is Base64 encoding?', answer: 'Base64 is an encoding scheme that represents binary data using 64 printable ASCII characters. It\'s commonly used to encode data for transport over media designed to handle text, such as email or JSON.' },
    { question: 'Is Base64 encryption?', answer: 'No. Base64 is encoding, not encryption. It\'s easily reversible — anyone can decode Base64. Never use Base64 as a security measure. Use proper encryption for sensitive data.' },
    { question: 'Can I encode Unicode text?', answer: 'Yes. This tool properly handles UTF-8 encoding using the browser\'s TextEncoder API. You can encode any Unicode text including Chinese, Japanese, Arabic, and emoji characters.' },
    { question: 'Why use Base64?', answer: 'Base64 is used when you need to represent binary data as text. Common uses include: embedding images in HTML/CSS, encoding email attachments, storing complex data in JSON, and transmitting data over text-based protocols.' },
  ],
  'url-encoder': [
    { question: 'What is URL encoding?', answer: 'URL encoding (also called percent-encoding) converts special characters in a URL to percent-encoded format (e.g., space becomes %20). This ensures URLs remain valid and interpretable by web servers.' },
    { question: 'When should I use URL encoding?', answer: 'Use URL encoding whenever you include special characters, spaces, or non-ASCII text in URL query parameters. It\'s essential for building valid URLs with dynamic content.' },
    { question: 'What\'s the difference between encodeURI and encodeURIComponent?', answer: 'encodeURI encodes a full URL, preserving characters like /, ?, and & that have structural meaning. encodeURIComponent encodes individual components, encoding everything except letters, digits, and - _ . ! ~ * \' ( ). Use encodeURIComponent for query parameter values.' },
    { question: 'Is URL encoding reversible?', answer: 'Yes. URL encoding is fully reversible. Decoding a properly encoded URL always produces the original text with no data loss.' },
  ],
  'html-encode': [
    { question: 'What are HTML entities?', answer: 'HTML entities are special codes that represent characters which have reserved meaning in HTML. For example, &amp; represents &, &lt; represents <, and &gt; represents >.' },
    { question: 'When should I use HTML encoding?', answer: 'Use HTML encoding when you need to display characters like <, >, &, or quotes within HTML content without them being interpreted as HTML markup. It\'s essential for displaying code snippets and special characters.' },
    { question: 'What characters need to be encoded in HTML?', answer: 'The five mandatory characters are: & (becomes &amp;), < (becomes &lt;), > (becomes &gt;), " (becomes &quot;), and \' (becomes &#39;). Other characters like non-breaking spaces and Unicode can also be encoded.' },
    { question: 'Is HTML encoding the same as escaping?', answer: 'In web development, "HTML encoding" and "HTML escaping" refer to the same process — replacing special characters with their HTML entity equivalents. Both terms are interchangeable in this context.' },
  ],
  'hash-generator': [
    { question: 'What is a hash function?', answer: 'A hash function takes input data of any size and produces a fixed-size output (the hash or digest). The same input always produces the same hash, but different inputs produce different hashes.' },
    { question: 'Are hashes reversible?', answer: 'No. Hash functions are one-way — you cannot recover the original input from the hash. This is fundamental to their design and makes them useful for password storage and data integrity verification.' },
    { question: 'What\'s the difference between MD5 and SHA-256?', answer: 'MD5 produces a 128-bit (32 character) hash and is considered cryptographically broken. SHA-256 produces a 256-bit (64 character) hash and is currently secure. Always prefer SHA-256 or SHA-512 for security purposes.' },
    { question: 'Is MD5 safe to use?', answer: 'MD5 is not safe for security purposes. Collision attacks can produce two different inputs with the same MD5 hash. Use SHA-256 or SHA-512 for any security-related application. MD5 is still useful for non-security checksums.' },
  ],
  'uuid-generator': [
    { question: 'What is a UUID?', answer: 'A UUID (Universally Unique Identifier) is a 128-bit identifier that\'s virtually guaranteed to be unique across all systems, without requiring a central coordination authority. The standard format is 8-4-4-4-12 hexadecimal characters.' },
    { question: 'What is UUID version 4?', answer: 'UUID v4 is generated using random numbers. It provides 122 bits of randomness, making collision probability astronomically low (you\'d need to generate billions of UUIDs to have a realistic chance of a duplicate).' },
    { question: 'Are UUIDs truly unique?', answer: 'UUID v4 IDs are practically unique. The probability of generating a duplicate is approximately 1 in 2.71 × 10^18. In real-world applications, you can treat UUID v4 as guaranteed unique.' },
    { question: 'What\'s the difference between UUID and GUID?', answer: 'UUID and GUID refer to the same thing. GUID (Globally Unique Identifier) is Microsoft\'s term, while UUID is the standard RFC 4122 term. They follow the same format and specification.' },
  ],
  'jwt-decoder': [
    { question: 'What is a JWT token?', answer: 'A JWT (JSON Web Token) is a compact, URL-safe way to represent claims between two parties. It consists of three parts: a header (algorithm info), a payload (the claims/data), and a signature (for verification).' },
    { question: 'Is it safe to paste my JWT here?', answer: 'Yes. This tool decodes JWTs entirely in your browser using JavaScript. Your token is never sent to any server. However, be cautious with tokens in shared or public environments.' },
    { question: 'Can this tool verify JWT signatures?', answer: 'No. This tool only decodes the header and payload portions of a JWT. It does not verify the signature, which requires the signing secret/key. Decoding alone doesn\'t confirm the token\'s authenticity.' },
    { question: 'What\'s in a JWT header?', answer: 'The header typically contains two fields: "typ" (token type, usually "JWT") and "alg" (signing algorithm, such as HS256, RS256). It tells the recipient how to verify the token\'s signature.' },
  ],
  'qr-code-generator': [
    { question: 'What is a QR code?', answer: 'A QR (Quick Response) code is a two-dimensional barcode that can store text, URLs, contact info, and other data. QR codes can be scanned by smartphone cameras and are widely used for marketing, payments, and information sharing.' },
    { question: 'What size should I use?', answer: '256px is the default and works well for most uses. Use 512px for high-quality prints or situations where the code will be displayed large. 128px is sufficient for small digital displays.' },
    { question: 'What is error correction level?', answer: 'Error correction allows a QR code to be read even when partially damaged or obscured. Higher levels (H) make the code more resilient but reduce data capacity. Level M (default) balances resilience and capacity.' },
    { question: 'Can I generate QR codes for URLs?', answer: 'Yes. Enter any URL and the QR code will encode it. When scanned, the user\'s phone will open the URL in their browser. This is the most common use case for QR codes.' },
  ],
  'password-generator': [
    { question: 'Is this password generator secure?', answer: 'Yes. This generator uses your browser\'s crypto.getRandomValues() API, which provides cryptographically strong random numbers. The generated passwords are truly random and cannot be predicted.' },
    { question: 'How long should my password be?', answer: 'For general accounts, 16 characters is recommended. For high-security accounts (banking, primary email), use 24+ characters. Longer passwords are exponentially harder to crack.' },
    { question: 'What are ambiguous characters?', answer: 'Ambiguous characters look similar in many fonts: 0 and O, 1 and l and I. If you enable "Exclude ambiguous characters," these are removed to prevent confusion when reading or typing passwords.' },
    { question: 'Can I use these passwords for important accounts?', answer: 'Yes, the passwords generated here are cryptographically random. However, always store passwords in a password manager rather than writing them down or reusing them across accounts.' },
  ],
  'word-counter': [
    { question: 'How is reading time calculated?', answer: 'Reading time is estimated by dividing the word count by 200 words per minute, which is the average adult reading speed for non-technical content. Technical content may take longer.' },
    { question: 'What counts as a word?', answer: 'A word is any sequence of characters separated by spaces. Hyphenated words count as one word. Numbers and symbols surrounded by spaces also count as words.' },
    { question: 'How are sentences counted?', answer: 'Sentences are counted by splitting text at periods, exclamation marks, and question marks. Abbreviations (like "U.S.") may cause minor overcounting.' },
    { question: 'Is my text sent to a server?', answer: 'No. All counting is done in your browser. Your text is never transmitted, stored, or processed anywhere outside your device.' },
  ],
  'case-converter': [
    { question: 'What is camelCase?', answer: 'camelCase starts with a lowercase letter and capitalizes the first letter of each subsequent word, with no spaces or separators. Example: "hello world" becomes "helloWorld". It\'s widely used in JavaScript and Java.' },
    { question: 'What is snake_case?', answer: 'snake_case uses all lowercase letters with underscores between words. Example: "hello world" becomes "hello_world". It\'s commonly used in Python, Ruby, and database column names.' },
    { question: 'What is PascalCase?', answer: 'PascalCase capitalizes the first letter of every word with no spaces or separators. Example: "hello world" becomes "HelloWorld". It\'s used for class names in C#, Java, and TypeScript.' },
    { question: 'Can I convert multiple lines at once?', answer: 'Yes. Each line is converted independently, preserving your line structure. Empty lines are preserved as-is.' },
  ],
  'text-to-slug': [
    { question: 'What is a URL slug?', answer: 'A URL slug is the part of a URL that identifies a specific page in human-readable form. For example, in "example.com/how-to-bake-bread", "how-to-bake-bread" is the slug.' },
    { question: 'Why are slugs important for SEO?', answer: 'Descriptive slugs help search engines understand page content and improve click-through rates. "how-to-bake-bread" is far better for SEO than "page-123" or "htbb45".' },
    { question: 'Should I remove stop words from slugs?', answer: 'It depends. Removing stop words ("the", "a", "an") makes slugs shorter and more focused, but keeping them can make URLs more readable. Most SEO experts recommend removing them for long slugs.' },
    { question: 'What separator should I use?', answer: 'Hyphens (-) are the standard and recommended separator for URLs. Google explicitly recommends hyphens over underscores. Only use underscores if your system specifically requires them.' },
  ],
};
