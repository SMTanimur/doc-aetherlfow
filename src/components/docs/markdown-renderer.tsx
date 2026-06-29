'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Info, AlertTriangle } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

interface CodeBlockProps {
  codeText: string;
  lang: string;
}

function CodeBlock({ codeText, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl border border-zinc-200 bg-zinc-950 text-zinc-50 overflow-hidden font-mono text-xs my-4 shadow-sm">
      <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-zinc-400 text-[10px] font-bold uppercase tracking-wider select-none">
        <span>{lang}</span>
        <button
          onClick={handleCopy}
          className="p-1 rounded bg-zinc-800 hover:bg-zinc-750 border border-zinc-800 text-zinc-400 hover:text-zinc-200 cursor-pointer flex items-center gap-1 transition-all"
        >
          {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[11px] leading-normal">{codeText}</pre>
    </div>
  );
}

function getRawText(node: React.ReactNode): string {
  if (!node) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getRawText).join('');
  if (React.isValidElement(node)) {
    return getRawText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-zinc max-w-3xl text-xs text-zinc-700 leading-relaxed space-y-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="text-xl font-black text-zinc-900 mt-10 mb-4 tracking-tight">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="text-base font-black text-zinc-900 mt-8 mb-3 border-b border-zinc-150 pb-1.5 tracking-tight">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-sm font-black text-zinc-900 mt-6 mb-2 tracking-tight">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-xs text-zinc-700 leading-normal mt-2.5">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 my-2 space-y-1.5">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-2 space-y-1.5">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-xs text-zinc-700">
              {children}
            </li>
          ),
          blockquote: ({ children }) => {
            const childrenArray = React.Children.toArray(children);
            let isWarning = false;

            const cleanChildren = childrenArray.filter((child) => {
              const text = getRawText(child).trim();
              if (text === '[!NOTE]') {
                return false;
              }
              if (text === '[!WARNING]') {
                isWarning = true;
                return false;
              }
              return true;
            });

            return (
              <div className={`p-4 rounded-xl border flex items-start gap-3 my-4 ${
                isWarning ? 'bg-amber-50/50 border-amber-200 text-amber-900' : 'bg-indigo-50/50 border-indigo-200 text-indigo-900'
              }`}>
                {isWarning ? (
                  <AlertTriangle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <Info size={15} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 text-xs leading-normal font-medium">
                  {cleanChildren}
                </div>
              </div>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 border border-zinc-200 rounded-xl shadow-sm bg-white">
              <table className="w-full text-left text-xs border-collapse divide-y divide-zinc-200">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-zinc-50/75 text-zinc-700 font-bold uppercase tracking-wider">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-zinc-150 bg-white">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-zinc-50/50 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-[10px] font-bold text-zinc-550 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-xs text-zinc-700 font-normal leading-normal">
              {children}
            </td>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !className;

            if (isInline) {
              return (
                <code className="bg-zinc-100 text-indigo-600 font-mono text-[11px] px-1.5 py-0.5 rounded border border-zinc-250/30" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                codeText={String(children).replace(/\n$/, '')}
                lang={match ? match[1] : 'json'}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
