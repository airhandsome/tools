export interface SeoSection {
  heading: string;
  paragraphs: string[];
}

export interface ToolSeoContent {
  about: SeoSection;
  howTo: { heading: string; steps: string[] };
  features: { heading: string; items: string[] };
  useCases: SeoSection;
}

export const seoContent: Record<string, ToolSeoContent> = {
  'json-formatter': {
    about: {
      heading: 'About JSON Formatter',
      paragraphs: [
        'JSON Formatter is a free online tool that instantly beautifies and validates your JSON data. Whether you are debugging an API response, configuring a web application, or inspecting a data payload, properly formatted JSON makes the structure immediately readable. Paste minified or messy JSON and get perfectly indented output in one click.',
        'Unlike many online JSON formatters that send your data to a remote server for processing, this tool runs entirely in your browser using JavaScript\'s native JSON parser. Your data never leaves your device — making it safe to format JSON containing API keys, authentication tokens, or sensitive configuration values.',
        'JSON (JavaScript Object Notation) is the de facto standard for data exchange in modern web APIs. However, API responses are often minified to reduce bandwidth, making them hard to read. Our JSON beautifier restores proper indentation, line breaks, and syntax highlighting so you can quickly spot missing commas, unmatched brackets, or data type issues.',
      ],
    },
    howTo: {
      heading: 'How to Format JSON',
      steps: [
        'Paste your raw JSON data into the input textarea above.',
        'The formatter automatically detects whether your input is valid JSON and beautifies it instantly.',
        'Click "Minify" if you need to compress formatted JSON back into a single line for production use.',
        'Click "Copy" to copy the formatted result to your clipboard.',
        'If your JSON contains errors, the tool highlights the exact line and character where the syntax issue occurs.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Instant formatting with 2-space indentation by default',
        'Built-in JSON validator with precise error reporting',
        'One-click minification for production compression',
        'Full UTF-8 and Unicode character support',
        'Handles deeply nested objects and arrays of any complexity',
        '100% client-side processing — no data ever transmitted',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Developers use JSON Formatter daily when debugging REST API responses from services like Stripe, GitHub, and AWS. Instead of reading a wall of minified text, formatted JSON reveals the data hierarchy at a glance. It is equally valuable when writing configuration files for tools like ESLint, Babel, or tsconfig, where a missing comma can break the entire build.',
        'QA engineers and API testers use this tool to inspect webhook payloads, verify response structures, and compare expected versus actual JSON output. Data analysts working with NoSQL databases like MongoDB also rely on JSON formatting to examine document structures before writing aggregation pipelines.',
      ],
    },
  },

  'json-to-csv': {
    about: {
      heading: 'About JSON to CSV Converter',
      paragraphs: [
        'JSON to CSV Converter transforms JSON arrays into clean, spreadsheet-ready CSV format. If you have data stored as JSON — from an API response, a NoSQL database export, or a configuration file — this tool converts it into CSV that opens directly in Excel, Google Sheets, or any spreadsheet application.',
        'CSV (Comma-Separated Values) remains the universal format for tabular data exchange. While JSON is ideal for programmatic use, CSV is what business analysts, data scientists, and non-technical stakeholders expect. This converter bridges that gap instantly, handling nested objects through dot notation flattening and supporting custom delimiters.',
        'All conversion happens in your browser. Your JSON data is never uploaded to a server, which is critical when working with customer records, financial data, or any sensitive information that should not transit over the internet.',
      ],
    },
    howTo: {
      heading: 'How to Convert JSON to CSV',
      steps: [
        'Paste your JSON array into the input field. A single object is automatically wrapped in an array.',
        'Toggle "Flatten nested objects" if your JSON contains nested properties — they will be converted to dot notation (e.g., user.address.city).',
        'Choose your delimiter: comma (default), semicolon, or tab.',
        'Click "Convert" to generate the CSV output instantly.',
        'Click "Download CSV" to save the file to your device.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Automatic header row generation from JSON keys',
        'Nested object flattening with configurable dot notation',
        'Support for comma, semicolon, and tab delimiters',
        'Handles arrays of objects with inconsistent keys',
        'Download as .csv file with proper escaping',
        'No file size limits beyond your browser\'s memory',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'A typical scenario: you call an API that returns 500 customer records as JSON, but your marketing team needs them in Excel. Paste the JSON, click convert, download the CSV, and share it — all in under 30 seconds. No Python scripts, no command-line tools, no data upload to third-party converters.',
        'Developers also use this tool when migrating data from MongoDB to SQL databases, exporting API data for reporting dashboards, or preparing test datasets in spreadsheet format. The ability to flatten nested JSON objects into dot-notation columns means even complex data structures become spreadsheet-readable.',
      ],
    },
  },

  'sql-formatter': {
    about: {
      heading: 'About SQL Formatter',
      paragraphs: [
        'SQL Formatter beautifies your SQL queries with proper indentation, line breaks, and keyword capitalization. Whether you are writing a complex JOIN across multiple tables or debugging a stored procedure, formatted SQL is dramatically easier to read, review, and maintain than a wall of unstructured text.',
        'This tool supports standard SQL syntax used by MySQL, PostgreSQL, SQLite, SQL Server, and Oracle. Keywords like SELECT, FROM, WHERE, JOIN, GROUP BY, and ORDER BY are automatically placed on separate lines with consistent indentation. Subqueries and nested expressions get their own indentation levels for maximum clarity.',
        'Your SQL queries are processed entirely in your browser. This is especially important for queries that contain sensitive data — table names with customer information, WHERE clauses filtering on PII, or queries embedded with API credentials. Nothing is sent to any server.',
      ],
    },
    howTo: {
      heading: 'How to Format SQL',
      steps: [
        'Paste your raw SQL query into the input textarea.',
        'Click "Format" to beautify the query with standard indentation.',
        'Review the formatted output — keywords are capitalized and clauses are properly aligned.',
        'Click "Copy" to copy the formatted SQL to your clipboard.',
        'Use "Minify" to compress formatted SQL back to a single line for embedded use.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Automatic keyword capitalization (SELECT, FROM, WHERE, JOIN, etc.)',
        'Proper indentation for subqueries and nested expressions',
        'Support for JOINs, UNIONs, CTEs, and window functions',
        'Compatible with MySQL, PostgreSQL, SQLite, SQL Server, and Oracle syntax',
        'One-click minification for embedding SQL in application code',
        '100% client-side — safe for queries containing sensitive schema names',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Database administrators use SQL Formatter when reviewing slow queries from log files — a single-line query spanning 500 characters becomes instantly readable with proper line breaks. Developers use it when writing complex analytics queries, ensuring that JOIN conditions and GROUP BY clauses are visually separated for code review.',
        'Data engineers working on ETL pipelines format SQL transformations before committing them to version control. Consistent formatting makes diffs cleaner and code reviews faster. The tool is also popular among developers debugging ORM-generated SQL, where the raw query output is typically minified and difficult to parse.',
      ],
    },
  },

  'xml-formatter': {
    about: {
      heading: 'About XML Formatter',
      paragraphs: [
        'XML Formatter beautifies XML documents with proper indentation and line breaks. Whether you are working with SOAP API responses, SVG files, Maven POM files, or configuration documents, formatted XML makes the element hierarchy immediately visible and editable.',
        'XML (eXtensible Markup Language) remains widely used in enterprise systems, SOAP web services, configuration files, and document formats like SVG and RSS. However, XML generated by servers is often minified or inconsistently indented. Our formatter uses the browser\'s built-in DOMParser to produce clean, standards-compliant output.',
        'All formatting is performed client-side. Your XML data — including configuration files with database credentials, SOAP envelopes with authentication headers, or SVG assets — never leaves your browser.',
      ],
    },
    howTo: {
      heading: 'How to Format XML',
      steps: [
        'Paste your raw XML content into the input textarea.',
        'Click "Format" to beautify the XML with consistent 2-space indentation.',
        'Review the formatted output — each element is on its own line with proper nesting.',
        'Click "Copy" to copy the formatted XML to your clipboard.',
        'Use "Minify" to compress XML back to a single line for production transmission.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Proper element indentation with configurable spacing',
        'Full namespace and attribute preservation',
        'Handles CDATA sections and processing instructions',
        'Supports large XML files limited only by browser memory',
        'One-click minification for bandwidth optimization',
        '100% browser-based processing using native DOMParser',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Developers working with SOAP APIs use XML Formatter to inspect response envelopes, making it easy to identify the relevant payload within nested Body and Header elements. System administrators format XML configuration files for Tomcat, Spring, or Maven before editing them, reducing the risk of syntax errors from misaligned tags.',
        'Front-end developers use this tool when working with SVG files — formatting makes it easier to locate specific paths, gradients, and transform attributes. Data integration engineers format XML feeds from legacy systems before transforming them into JSON for modern APIs.',
      ],
    },
  },

  'base64': {
    about: {
      heading: 'About Base64 Encode/Decode',
      paragraphs: [
        'Base64 Encode/Decode is a free online tool for converting text to and from Base64 encoding. Whether you need to embed binary data in a JSON payload, decode an email attachment, or inspect an Authorization header, this tool handles both directions instantly with full UTF-8 support.',
        'Base64 is an encoding scheme that represents binary data using 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It is not encryption — it is easily reversible by anyone. Base64 is used everywhere in web development: data URIs for images, HTTP Basic Authentication headers, email MIME attachments, JWT tokens, and embedding fonts in CSS.',
        'This tool uses the browser\'s native TextEncoder and TextDecoder APIs, ensuring correct UTF-8 handling for all languages including Chinese, Japanese, Arabic, and emoji. Your input is never transmitted to any server — encoding and decoding happen entirely on your device.',
      ],
    },
    howTo: {
      heading: 'How to Use Base64 Encoder/Decoder',
      steps: [
        'Choose "Encode" to convert text to Base64, or "Decode" to convert Base64 back to text.',
        'Paste your input into the textarea.',
        'The result appears instantly in the output area — no button to click.',
        'Click "Copy" to copy the result to your clipboard.',
        'Toggle "Live mode" to automatically convert as you type.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Bidirectional: encode text to Base64 and decode Base64 to text',
        'Full UTF-8 support for all languages and emoji',
        'Real-time conversion as you type',
        'Handles large inputs without freezing the browser',
        'Correct padding (=) handling for standards compliance',
        '100% client-side — safe for encoding sensitive tokens',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Backend developers use Base64 encoding when implementing HTTP Basic Authentication, where the username and password are sent as a Base64-encoded string in the Authorization header. Front-end developers use it to create data URIs for small images, embedding them directly in HTML or CSS to reduce HTTP requests.',
        'DevOps engineers decode Base64-encoded secrets in Kubernetes ConfigMaps and Secrets. Email developers use Base64 to inspect MIME-encoded attachments. API developers use it to encode binary file uploads in JSON payloads where binary data cannot be directly represented.',
      ],
    },
  },

  'url-encoder': {
    about: {
      heading: 'About URL Encode/Decode',
      paragraphs: [
        'URL Encode/Decode converts text to and from percent-encoded format, ensuring that special characters in URLs are properly escaped. Whether you are building query strings with user input, debugging a redirect URL, or parsing encoded parameters, this tool handles both encodeURI and encodeURIComponent modes.',
        'URL encoding (also known as percent-encoding) replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits. For example, spaces become %20, ampersands become %26, and equal signs become %3D. This is essential when including special characters, non-ASCII text, or binary data in URL query parameters.',
        'All encoding and decoding happens in your browser. URLs containing sensitive parameters — session tokens, API keys, or user PII — are never sent to any external server.',
      ],
    },
    howTo: {
      heading: 'How to URL Encode/Decode',
      steps: [
        'Select "Encode" to convert a URL or text string to percent-encoded format, or "Decode" to reverse it.',
        'Choose "encodeURI" for full URLs or "encodeURIComponent" for individual query parameter values.',
        'Paste your input into the textarea.',
        'The encoded or decoded result appears instantly.',
        'Click "Copy" to copy the result to your clipboard.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Both encodeURI and encodeURIComponent modes',
        'Bidirectional: encode and decode in one tool',
        'Real-time conversion with instant output',
        'Handles Unicode characters and multi-byte UTF-8 sequences',
        'Correctly preserves URL-structural characters in encodeURI mode',
        '100% client-side processing for sensitive URLs',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Front-end developers use URL encoding when building query strings from user input. If a user searches for "hello & goodbye", the ampersand must be encoded as %26 to avoid being interpreted as a parameter separator. Similarly, redirect URLs embedded in query parameters require double-encoding to preserve their structure.',
        'API developers encode OAuth callback URLs, encode search queries for Elasticsearch endpoints, and decode incoming webhook parameters. Mobile developers use URL encoding when constructing deep links with custom parameters. The distinction between encodeURI and encodeURIComponent is critical: use encodeURI for full URLs, encodeURIComponent for individual parameter values.',
      ],
    },
  },

  'html-encode': {
    about: {
      heading: 'About HTML Entity Encoder',
      paragraphs: [
        'HTML Entity Encoder converts special characters to their HTML entity equivalents and back. When you need to display characters like <, >, &, or quotes in HTML content without them being interpreted as markup, HTML encoding is the solution. This tool supports both named entities (&amp;, &lt;) and numeric entities (&#38;, &#60;).',
        'HTML entities are essential for security and correctness. Displaying user-generated content without encoding special characters can lead to XSS (Cross-Site Scripting) vulnerabilities. Encoding < as &lt; ensures the browser renders it as text rather than interpreting it as the start of an HTML tag. This is fundamental to any application that displays user input.',
        'All encoding and decoding is performed entirely in your browser. HTML content containing sensitive data — internal documentation, source code snippets, or configuration values — is never transmitted to any server.',
      ],
    },
    howTo: {
      heading: 'How to HTML Encode/Decode',
      steps: [
        'Select "Encode" to convert special characters to HTML entities, or "Decode" to reverse the process.',
        'Paste your text or HTML into the input textarea.',
        'The result appears instantly in the output area.',
        'Click "Copy" to copy the result to your clipboard.',
        'Use the tool to safely prepare text for inclusion in HTML documents or templates.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Encodes all five mandatory HTML characters: & < > " \'',
        'Supports both named entities (&amp;) and numeric entities (&#38;)',
        'Bidirectional: encode and decode in a single tool',
        'Real-time conversion as you type',
        'Handles Unicode characters with numeric entity output',
        '100% client-side — safe for encoding internal documentation',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Blog authors and technical writers use HTML encoding to display code snippets containing angle brackets and ampersands. Without encoding, <div class="example"> would be rendered as an actual HTML element rather than displayed as text. Content management systems often auto-encode user input, but when writing raw HTML templates, manual encoding is necessary.',
        'Security-conscious developers use HTML encoding as a defense against XSS attacks. Any user-supplied data displayed in HTML — comments, profile names, search queries — must be encoded to prevent script injection. Backend developers also use this tool when generating HTML email templates or XML documents that contain reserved characters.',
      ],
    },
  },

  'hash-generator': {
    about: {
      heading: 'About Hash Generator',
      paragraphs: [
        'Hash Generator computes MD5, SHA-1, SHA-256, and SHA-512 hashes from any text input. Whether you are verifying file integrity, generating checksums, or testing password hashing, this tool produces all four hash types simultaneously in a single operation.',
        'A cryptographic hash function takes input of any size and produces a fixed-length output called a digest. The same input always produces the same hash, but even a one-character change produces a completely different result. Hashes are one-way: you cannot recover the original input from the hash. This makes them ideal for verifying data integrity and storing password fingerprints.',
        'All hashing is performed in your browser using the Web Crypto API and crypto-js. Your input text — whether it contains passwords, API keys, or sensitive configuration — is never sent to any server. This is critical for security, as transmitting sensitive data to an online hash generator would defeat the purpose of hashing.',
      ],
    },
    howTo: {
      heading: 'How to Generate Hashes',
      steps: [
        'Paste or type your text into the input field.',
        'All four hash types (MD5, SHA-1, SHA-256, SHA-512) are generated instantly as you type.',
        'Click the "Copy" button next to any hash to copy it to your clipboard.',
        'Compare hashes to verify data integrity or check for changes.',
        'For security-sensitive applications, prefer SHA-256 or SHA-512 over MD5 and SHA-1.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Generates MD5, SHA-1, SHA-256, and SHA-512 simultaneously',
        'Real-time hashing as you type — no button to click',
        'One-click copy for each hash type',
        'Uses browser Web Crypto API for cryptographic operations',
        'Full Unicode and UTF-8 text support',
        '100% client-side — safe for hashing passwords and sensitive data',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Developers use hash generators to verify file integrity — comparing the SHA-256 of a downloaded file against the publisher\'s checksum to detect corruption or tampering. DevOps engineers generate hashes for Docker image labels and CI/CD cache keys. Backend developers test password hashing algorithms and verify that identical inputs produce identical hashes.',
        'Security researchers use MD5 and SHA-1 hashes for malware signature lookup in threat intelligence databases. Blockchain developers compute SHA-256 hashes when testing Bitcoin-related code. QA engineers generate hashes to verify that API responses remain consistent across deployments, detecting subtle data changes that visual inspection might miss.',
      ],
    },
  },

  'uuid-generator': {
    about: {
      heading: 'About UUID Generator',
      paragraphs: [
        'UUID Generator creates version 4 UUIDs (Universally Unique Identifiers) using cryptographically strong random numbers. Generate a single UUID or batch-create hundreds at once — perfect for database records, distributed systems, test data, and any scenario requiring guaranteed-unique identifiers.',
        'A UUID is a 128-bit identifier represented as a 36-character string in the format 8-4-4-4-12 (e.g., 550e8400-e29b-41d4-a716-446655440000). UUID v4 uses random numbers for 122 of the 128 bits, making the probability of a collision astronomically low — you would need to generate billions of UUIDs to have a realistic chance of a duplicate.',
        'This tool uses your browser\'s crypto.randomUUID() API, which provides the same cryptographic randomness as server-side UUID generation. Your generated UUIDs are created locally and never transmitted. This is important for UUIDs used in security-sensitive contexts like session tokens or database primary keys.',
      ],
    },
    howTo: {
      heading: 'How to Generate UUIDs',
      steps: [
        'Enter the number of UUIDs you want to generate (1 to 1000) in the count field.',
        'Optionally toggle "Uppercase" for hexadecimal characters in uppercase.',
        'Optionally toggle "Remove hyphens" for compact UUID format without dashes.',
        'Click "Generate" to create the UUIDs.',
        'Click "Copy All" to copy all generated UUIDs to your clipboard.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Generates UUID v4 using crypto.randomUUID() for cryptographic randomness',
        'Batch generation: create up to 1000 UUIDs at once',
        'Optional uppercase hexadecimal output',
        'Optional hyphen removal for compact storage format',
        'One-click copy for individual or all UUIDs',
        '100% client-side generation — no server communication',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Backend developers use UUIDs as database primary keys in distributed systems where auto-increment integers would cause conflicts across servers. UUIDs eliminate the need for central ID coordination — each server generates unique IDs independently. This is standard practice in microservices architectures and event-sourced systems.',
        'Front-end developers use UUIDs for React component keys, temporary file names, and client-side tracking IDs. QA engineers generate UUIDs for test data fixtures. DevOps engineers use them as correlation IDs in distributed tracing and logging systems. Mobile developers use UUIDs for device installation identifiers and push notification tokens.',
      ],
    },
  },

  'jwt-decoder': {
    about: {
      heading: 'About JWT Decoder',
      paragraphs: [
        'JWT Decoder lets you inspect the contents of a JSON Web Token by decoding its header and payload. Paste any JWT and instantly see the algorithm, claims, expiration time, and custom fields — all without sending the token to a server.',
        'A JWT (JSON Web Token) is a compact, URL-safe token used for authentication and information exchange. It consists of three Base64URL-encoded parts separated by dots: header.payload.signature. The header specifies the signing algorithm, the payload contains claims (user ID, roles, expiration), and the signature verifies integrity. This tool decodes the header and payload for inspection.',
        'Important: decoding a JWT does not verify its signature. Anyone can create a JWT with any payload. Signature verification requires the signing secret or public key, which this tool does not perform. Always verify JWTs server-side before trusting their contents. All decoding happens in your browser — your token never leaves your device.',
      ],
    },
    howTo: {
      heading: 'How to Decode a JWT',
      steps: [
        'Paste your JWT token into the input field. It should be a long string with two dots separating three parts.',
        'The tool automatically decodes the header and payload sections.',
        'Review the decoded header to see the token type and signing algorithm.',
        'Review the payload to inspect claims like sub, exp, iat, and custom fields.',
        'Check the expiration status indicator to see if the token is still valid.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Instant decoding of JWT header and payload',
        'Expiration time detection with valid/expired status indicator',
        'Formatted JSON output for easy reading',
        'Supports all standard claims: iss, sub, aud, exp, nbf, iat, jti',
        'Handles HS256, RS256, ES256, and other algorithm types in the header',
        '100% client-side decoding — token never transmitted',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Front-end developers use JWT Decoder to inspect authentication tokens returned by OAuth providers like Auth0, Firebase, or AWS Cognito. Seeing the expiration time (exp claim) helps debug session timeout issues. Inspecting custom claims like roles or permissions helps debug authorization logic without adding console.log statements.',
        'API developers decode JWTs to verify that the payload structure matches their backend expectations before implementing server-side validation. Security researchers analyze JWTs to check for weak algorithms, missing expiration claims, or overly broad scopes. QA engineers decode tokens to verify that login endpoints return the correct user claims.',
      ],
    },
  },

  'qr-code-generator': {
    about: {
      heading: 'About QR Code Generator',
      paragraphs: [
        'QR Code Generator creates scannable QR codes from any text, URL, or data. Customize the size and color, then download as a PNG image — perfect for marketing materials, business cards, WiFi sharing, product packaging, and contactless information distribution.',
        'QR (Quick Response) codes are two-dimensional barcodes that can be scanned by smartphone cameras. Unlike traditional barcodes that encode only numbers, QR codes can store URLs, text, contact information, WiFi credentials, payment links, and much more. They have become ubiquitous in marketing, retail, restaurants, and event management.',
        'All QR code generation happens in your browser using the qrcode JavaScript library. Your data — whether it contains a private URL, personal contact information, or a WiFi password — is never sent to any server. This is especially important for QR codes used in sensitive contexts.',
      ],
    },
    howTo: {
      heading: 'How to Generate a QR Code',
      steps: [
        'Enter the text or URL you want to encode in the input field.',
        'Select the image size: 128px (small), 256px (default), or 512px (high quality).',
        'Optionally customize the foreground and background colors.',
        'The QR code preview updates instantly as you type.',
        'Click "Download PNG" to save the QR code image to your device.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Instant QR code generation from any text or URL',
        'Three size options: 128px, 256px, and 512px',
        'Customizable foreground and background colors',
        'Error correction level M for reliable scanning',
        'Download as PNG image file',
        '100% client-side generation — no data transmitted',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Marketing teams use QR codes on print materials — flyers, posters, billboards — to bridge offline and online experiences. A QR code on a restaurant menu links directly to the digital version. A QR code on a product packaging links to setup instructions or warranty registration. Event organizers use QR codes for contactless check-in and digital ticketing.',
        'IT professionals generate QR codes for WiFi network sharing — encoding the SSID and password so guests can connect by scanning. Developers use QR codes to share development URLs, app download links, and configuration data. Small business owners create QR codes for payment links, Google Maps locations, and social media profiles.',
      ],
    },
  },

  'password-generator': {
    about: {
      heading: 'About Password Generator',
      paragraphs: [
        'Password Generator creates strong, cryptographically random passwords with customizable length and character sets. Generate passwords that meet any security policy — from simple 8-character PINs to complex 64-character master passwords with uppercase, lowercase, numbers, and special characters.',
        'Weak passwords are the leading cause of account breaches. Using human-generated passwords — even with letter substitutions and special characters — makes you vulnerable to dictionary attacks and pattern-based cracking. A truly random password generated by a cryptographic random number generator is exponentially harder to crack. This tool uses your browser\'s crypto.getRandomValues() API, the same cryptographic source used for SSL/TLS.',
        'All password generation happens entirely in your browser. Generated passwords are never transmitted, stored, or logged. This is critical — using an online password generator that sends passwords over the internet would be a security contradiction. Your passwords are created locally and stay on your device.',
      ],
    },
    howTo: {
      heading: 'How to Generate a Strong Password',
      steps: [
        'Set the desired password length using the slider (default: 16 characters).',
        'Toggle character types: uppercase letters, lowercase letters, numbers, and symbols.',
        'Optionally enable "Exclude ambiguous characters" to remove look-alike characters like 0/O and 1/l.',
        'Click "Generate" to create a new random password.',
        'Click "Copy" to copy the password to your clipboard, then paste it into your password manager.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Cryptographic randomness via crypto.getRandomValues() API',
        'Adjustable length from 4 to 64 characters',
        'Four character type toggles: uppercase, lowercase, numbers, symbols',
        'Ambiguous character exclusion for readability',
        'Password strength meter with real-time feedback',
        '100% client-side generation — passwords never leave your device',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Users generate strong passwords when creating new accounts, rotating compromised passwords, or setting up password managers like Bitwarden, 1Password, or KeePass. A 16-character password with all character types has over 90 bits of entropy — sufficient for most security requirements. For high-value accounts like banking or primary email, consider 24+ characters.',
        'System administrators use password generators to create initial passwords for new user accounts, API keys, and service account credentials. Developers generate random secrets for JWT signing keys, session tokens, and OAuth client secrets. Database administrators create strong passwords for database users and replication accounts.',
      ],
    },
  },

  'word-counter': {
    about: {
      heading: 'About Word Counter',
      paragraphs: [
        'Word Counter instantly calculates word count, character count, sentence count, paragraph count, and estimated reading time for any text. Whether you are writing an essay, a blog post, a tweet, or SEO meta descriptions, this tool gives you the exact metrics you need in real time.',
        'Word count matters in many contexts: academic essays have strict word limits, SEO content targets specific word ranges for search ranking, social media platforms enforce character limits, and professional writers track productivity by daily word counts. This tool provides all relevant text metrics simultaneously as you type or paste.',
        'All counting is performed in your browser using JavaScript. Your text — whether it is a draft blog post, confidential business document, or personal writing — is never transmitted to any server. This makes it safe for counting words in sensitive documents.',
      ],
    },
    howTo: {
      heading: 'How to Count Words',
      steps: [
        'Paste or type your text into the input area.',
        'All metrics update instantly: word count, character count (with and without spaces), sentence count, paragraph count, and reading time.',
        'Use the metrics to ensure your text meets the required length.',
        'Edit your text directly in the input area — metrics update in real time.',
        'No need to click any button — everything is automatic.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time word count as you type',
        'Character count with and without spaces',
        'Sentence and paragraph counting',
        'Estimated reading time at 200 words per minute',
        'Works with any language and text format',
        '100% client-side processing — text never leaves your browser',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Content writers and SEO specialists use Word Counter to ensure articles meet target word counts — typically 1,500-2,500 words for comprehensive blog posts, 300+ words for product descriptions, and 50-160 characters for meta descriptions. Academic writers check that essays stay within assignment limits.',
        'Social media managers use character counts to stay within platform limits: 280 characters for Twitter, 2,200 for Instagram captions, and 3,000 for Facebook posts. Copywriters track word count for billing purposes. Novelists and NaNoWriMo participants track daily word count progress toward writing goals.',
      ],
    },
  },

  'case-converter': {
    about: {
      heading: 'About Case Converter',
      paragraphs: [
        'Case Converter transforms text between nine different cases instantly: UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and Sentence case. Whether you are converting variable names between programming languages or formatting titles for publications, this tool handles every case style.',
        'Different programming languages and contexts require different naming conventions. JavaScript uses camelCase for variables and PascalCase for classes. Python uses snake_case for functions and variables. CSS uses kebab-case for property names. Database columns often use snake_case or CONSTANT_CASE. This tool converts between all of them in a single click.',
        'All conversion happens in your browser. Your text — including source code, variable names, or document content — is never sent to any server.',
      ],
    },
    howTo: {
      heading: 'How to Convert Text Case',
      steps: [
        'Paste or type your text into the input area.',
        'Click any of the nine case conversion buttons to transform your text.',
        'The converted text appears instantly in the output area.',
        'Click "Copy" to copy the converted text to your clipboard.',
        'Each line is converted independently, preserving your text structure.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Nine case styles: UPPER, lower, Title, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Sentence case',
        'Instant conversion with a single click',
        'Multi-line support — each line converted independently',
        'Preserves empty lines and text structure',
        'One-click copy to clipboard',
        '100% client-side processing for sensitive source code',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Developers use Case Converter when porting code between languages — converting JavaScript camelCase variables to Python snake_case, or Java PascalCase class names to TypeScript interfaces. Database engineers convert table column names between snake_case (PostgreSQL convention) and camelCase (ORM convention).',
        'Content writers convert titles to Title Case for headlines, or to Sentence case for subtitles. UX designers convert feature names between display format ("Sign In") and code format ("signIn"). DevOps engineers convert environment variable names from CONSTANT_CASE to camelCase for configuration files.',
      ],
    },
  },

  'text-to-slug': {
    about: {
      heading: 'About Text to Slug Converter',
      paragraphs: [
        'Text to Slug Converter transforms any text into a clean, SEO-friendly URL slug. Perfect for blog posts, product pages, and any web content where descriptive URLs improve search ranking and user experience. Handles special characters, accented letters, and stop word removal automatically.',
        'A URL slug is the human-readable part of a URL that identifies a specific page. For example, in "openware.top/tools/json-formatter", the slug is "json-formatter". Descriptive slugs help search engines understand page content and improve click-through rates from search results. Google explicitly recommends using hyphens to separate words in URLs.',
        'This tool follows SEO best practices: converts to lowercase, replaces spaces with hyphens, removes special characters, transliterates accented characters (cafe -> cafe), and optionally removes stop words like "the", "a", "an" for cleaner, more focused slugs. All processing happens in your browser.',
      ],
    },
    howTo: {
      heading: 'How to Convert Text to Slug',
      steps: [
        'Paste or type your title or text into the input field.',
        'Toggle "Remove stop words" to strip common words like "the", "a", "an" for shorter slugs.',
        'The slug is generated instantly as you type.',
        'Review the generated slug in the output area.',
        'Click "Copy" to copy the slug to your clipboard for use in your CMS or routing configuration.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Automatic lowercase conversion',
        'Spaces and special characters replaced with hyphens',
        'Accented character transliteration (e.g., cafe -> cafe)',
        'Optional stop word removal for cleaner slugs',
        'Multiple consecutive hyphens collapsed to single hyphen',
        '100% client-side processing — no data transmitted',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      paragraphs: [
        'Bloggers and content managers use Text to Slug when creating new posts — converting a title like "10 Tips for Better JSON Formatting" into "10-tips-better-json-formatting". CMS platforms like WordPress and Ghost auto-generate slugs, but manual conversion gives you control over the exact URL structure.',
        'E-commerce managers create SEO-friendly product URLs from product names. Web developers generate route slugs for Next.js, Astro, or Rails applications. SEO specialists optimize existing URLs by removing stop words and shortening overly long slugs. The hyphen separator is explicitly recommended by Google over underscores.',
      ],
    },
  },
};
