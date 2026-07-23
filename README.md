# Openware — Privacy-First Developer Tools

> 15 free online developer tools. 100% client-side. Your data never leaves your browser.

**Live site:** [openware.top](https://openware.top) (coming soon)

## Why Openware?

Most online developer tools (CodeBeautify, JSONFormatter, etc.) process your data on their servers. That means your JSON, JWT tokens, passwords, and API keys travel across the internet to someone else's backend.

Openware is different. **Every tool runs entirely in your browser.** No API calls, no server-side processing, no data collection. Paste your JWT token or JSON payload with zero privacy concerns.

## Tools (15)

### Data Format

| Tool | Path | What it does |
|------|------|--------------|
| JSON Formatter | `/tools/json-formatter` | Format, beautify, and minify JSON |
| JSON to CSV | `/tools/json-to-csv` | Convert JSON arrays to CSV with nested object support |
| SQL Formatter | `/tools/sql-formatter` | Format SQL queries with proper indentation and keyword highlighting |
| XML Formatter | `/tools/xml-formatter` | Format and beautify XML documents |

### Encoders

| Tool | Path | What it does |
|------|------|--------------|
| Base64 Encode/Decode | `/tools/base64` | Encode/decode Base64 with full UTF-8 support |
| URL Encode/Decode | `/tools/url-encoder` | Encode/decode URL components |
| HTML Entity Encoder | `/tools/html-encode` | Encode/decode HTML entities (named + numeric) |
| Hash Generator | `/tools/hash-generator` | Generate MD5, SHA-1, SHA-256, SHA-512 hashes |

### Generators

| Tool | Path | What it does |
|------|------|--------------|
| UUID Generator | `/tools/uuid-generator` | Generate v4 UUIDs (single or batch) |
| JWT Decoder | `/tools/jwt-decoder` | Decode JWT header and payload, check expiry |
| QR Code Generator | `/tools/qr-code-generator` | Generate QR codes with custom colors and sizes |
| Password Generator | `/tools/password-generator` | Generate cryptographically secure passwords |

### Text Tools

| Tool | Path | What it does |
|------|------|--------------|
| Word Counter | `/tools/word-counter` | Count words, characters, sentences, reading time |
| Case Converter | `/tools/case-converter` | Convert between UPPER, lower, Title, camelCase, snake_case, etc. |
| Text to Slug | `/tools/text-to-slug` | Convert text to URL-friendly slugs |

## Tech Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (GitHub Dark theme)
- **Icons:** Lucide React
- **SEO:** next-sitemap, JSON-LD structured data, Open Graph
- **Hosting:** Vercel + Cloudflare DNS
- **Domain:** openware.top

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production (static export to /out)
npm run build

# Preview production build
npx serve out
```

## Project Structure

```
openware/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (metadata, fonts, JSON-LD)
│   │   ├── page.tsx            # Homepage (hero, tool grid, trust section)
│   │   ├── tools/
│   │   │   ├── page.tsx        # All tools index page
│   │   │   └── [slug]/page.tsx # Dynamic tool page (SSG)
│   │   ├── privacy/page.tsx    # Privacy policy
│   │   └── not-found.tsx      # 404 page
│   ├── components/             # Shared UI components
│   │   ├── Header.tsx          # Nav with search + logo
│   │   ├── Footer.tsx          # Footer with links
│   │   ├── ToolCard.tsx        # Tool card for grid display
│   │   ├── CategoryFilter.tsx  # Category tab filter
│   │   ├── PrivacyBadge.tsx    # "Your data never leaves" badge
│   │   ├── FaqSection.tsx      # FAQ with FAQPage schema
│   │   ├── ToolLayout.tsx      # Tool page layout wrapper
│   │   ├── JsonLd.tsx           # JSON-LD structured data injector
│   │   └── BackToTop.tsx       # Scroll-to-top button
│   ├── data/
│   │   ├── tools.ts            # Tool registry (15 tools)
│   │   └── faqs.ts             # FAQ data per tool
│   ├── lib/
│   │   └── seo.ts              # SEO metadata generator
│   └── tools/                  # 15 tool components (all client-side)
│       ├── JsonFormatter.tsx
│       ├── JsonToCsv.tsx
│       ├── SqlFormatter.tsx
│       ├── XmlFormatter.tsx
│       ├── Base64Tool.tsx
│       ├── UrlEncoder.tsx
│       ├── HtmlEncoder.tsx
│       ├── HashGenerator.tsx
│       ├── UuidGenerator.tsx
│       ├── JwtDecoder.tsx
│       ├── QrCodeGenerator.tsx
│       ├── PasswordGenerator.tsx
│       ├── WordCounter.tsx
│       ├── CaseConverter.tsx
│       └── TextToSlug.tsx
├── public/                     # Static assets (logo, robots.txt)
├── next-sitemap.config.js      # Sitemap config
├── tailwind.config.ts          # Tailwind theme (dark mode)
├── next.config.mjs             # Next.js config (output: export)
└── package.json
```

## SEO Features

- Per-page `<title>`, `<meta description>`, `<meta keywords>`
- Open Graph tags (og:title, og:description, og:image)
- JSON-LD structured data (WebApplication, FAQPage, Organization, Website)
- Automatic `sitemap.xml` generation via next-sitemap
- `robots.txt` with proper allow/disallow rules
- Canonical URLs on every page
- Breadcrumb navigation
- Internal linking between related tools
- Semantic HTML (proper h1-h3 hierarchy)
- Mobile-first responsive design

## Privacy

**No backend. No analytics. No cookies. No tracking.**

Every tool performs its computation in the browser using JavaScript. Your data is never transmitted to any server. See our [Privacy Policy](https://openware.top/privacy).

## License

MIT

## Contributing

This is a solo project, but suggestions and bug reports are welcome. Open an issue on GitHub.
