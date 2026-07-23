import { notFound } from 'next/navigation';
import { tools, getToolBySlug, getRelatedTools } from '@/data/tools';
import { faqs } from '@/data/faqs';
import { generateToolMetadata } from '@/lib/seo';
import ToolLayout from '@/components/ToolLayout';

// Tool component imports
import JsonFormatterTool from '@/tools/JsonFormatter';
import JsonToCsvTool from '@/tools/JsonToCsv';
import SqlFormatterTool from '@/tools/SqlFormatter';
import XmlFormatterTool from '@/tools/XmlFormatter';
import Base64Tool from '@/tools/Base64Tool';
import UrlEncoderTool from '@/tools/UrlEncoder';
import HtmlEncoderTool from '@/tools/HtmlEncoder';
import HashGeneratorTool from '@/tools/HashGenerator';
import UuidGeneratorTool from '@/tools/UuidGenerator';
import JwtDecoderTool from '@/tools/JwtDecoder';
import QrCodeGeneratorTool from '@/tools/QrCodeGenerator';
import PasswordGeneratorTool from '@/tools/PasswordGenerator';
import WordCounterTool from '@/tools/WordCounter';
import CaseConverterTool from '@/tools/CaseConverter';
import TextToSlugTool from '@/tools/TextToSlug';

const toolComponents: Record<string, React.ComponentType> = {
  'json-formatter': JsonFormatterTool,
  'json-to-csv': JsonToCsvTool,
  'sql-formatter': SqlFormatterTool,
  'xml-formatter': XmlFormatterTool,
  'base64': Base64Tool,
  'url-encoder': UrlEncoderTool,
  'html-encode': HtmlEncoderTool,
  'hash-generator': HashGeneratorTool,
  'uuid-generator': UuidGeneratorTool,
  'jwt-decoder': JwtDecoderTool,
  'qr-code-generator': QrCodeGeneratorTool,
  'password-generator': PasswordGeneratorTool,
  'word-counter': WordCounterTool,
  'case-converter': CaseConverterTool,
  'text-to-slug': TextToSlugTool,
};

export async function generateStaticParams() {
  return tools.map(tool => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return generateToolMetadata(tool);
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const toolFaqs = faqs[tool.slug] || [];
  const related = getRelatedTools(tool);
  const ToolComponent = toolComponents[tool.slug];

  if (!ToolComponent) notFound();

  return (
    <ToolLayout tool={tool} faqs={toolFaqs} relatedTools={related}>
      <ToolComponent />
    </ToolLayout>
  );
}
