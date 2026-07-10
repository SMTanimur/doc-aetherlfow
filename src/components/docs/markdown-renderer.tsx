'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Info, AlertTriangle, AlertCircle, Lightbulb } from 'lucide-react';

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

  const langLabel = lang === 'http' ? 'HTTP' : lang.toUpperCase();

  return (
    <div className="relative rounded-xl border border-zinc-200 bg-zinc-950 text-zinc-50 overflow-hidden font-mono text-xs my-5 shadow-sm group">
      <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-zinc-400 text-[10px] font-bold uppercase tracking-wider select-none">
        <span className="text-zinc-500">{langLabel}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 text-zinc-400 hover:text-zinc-100 cursor-pointer transition-all duration-150"
        >
          {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed text-zinc-200 scrollbar-thin">{codeText}</pre>
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

type AlertVariant = 'note' | 'tip' | 'important' | 'warning' | 'caution';

interface AlertConfig {
  icon: React.ReactNode;
  containerClass: string;
  labelClass: string;
  label: string;
}

const ALERT_CONFIGS: Record<AlertVariant, AlertConfig> = {
  note: {
    icon: <Info size={14} className="text-indigo-500 flex-shrink-0 mt-0.5" />,
    containerClass: 'bg-indigo-50/60 border-indigo-200/80 text-indigo-900',
    labelClass: 'text-indigo-600',
    label: 'Note',
  },
  tip: {
    icon: <Lightbulb size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />,
    containerClass: 'bg-emerald-50/60 border-emerald-200/80 text-emerald-900',
    labelClass: 'text-emerald-600',
    label: 'Tip',
  },
  important: {
    icon: <AlertCircle size={14} className="text-violet-500 flex-shrink-0 mt-0.5" />,
    containerClass: 'bg-violet-50/60 border-violet-200/80 text-violet-900',
    labelClass: 'text-violet-600',
    label: 'Important',
  },
  warning: {
    icon: <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />,
    containerClass: 'bg-amber-50/60 border-amber-200/80 text-amber-900',
    labelClass: 'text-amber-600',
    label: 'Warning',
  },
  caution: {
    icon: <AlertTriangle size={14} className="text-rose-500 flex-shrink-0 mt-0.5" />,
    containerClass: 'bg-rose-50/60 border-rose-200/80 text-rose-900',
    labelClass: 'text-rose-600',
    label: 'Caution',
  },
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="max-w-2xl text-xs text-zinc-700 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="text-xl font-black text-zinc-900 mt-10 mb-4 tracking-tight leading-tight">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="text-base font-black text-zinc-900 mt-8 mb-3 pb-2 border-b border-zinc-150 tracking-tight">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-sm font-bold text-zinc-800 mt-6 mb-2.5 tracking-tight">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-xs text-zinc-600 leading-relaxed mt-3 mb-1">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-none pl-0 my-3 space-y-1.5">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-3 space-y-1.5">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-xs text-zinc-600 flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-400 flex-shrink-0 mt-1.5" />
              <span>{children}</span>
            </li>
          ),
          hr: () => (
            <hr className="border-zinc-150 my-6" />
          ),
          blockquote: ({ children }) => {
            const childrenArray = React.Children.toArray(children);

            let variant: AlertVariant = 'note';
            const cleanChildren = childrenArray.filter((child) => {
              const text = getRawText(child).trim();
              if (text === '[!NOTE]') { variant = 'note'; return false; }
              if (text === '[!TIP]') { variant = 'tip'; return false; }
              if (text === '[!IMPORTANT]') { variant = 'important'; return false; }
              if (text === '[!WARNING]') { variant = 'warning'; return false; }
              if (text === '[!CAUTION]') { variant = 'caution'; return false; }
              return true;
            });

            const cfg = ALERT_CONFIGS[variant];

            return (
              <div className={`flex items-start gap-3 p-4 rounded-xl border my-5 ${cfg.containerClass}`}>
                {cfg.icon}
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${cfg.labelClass}`}>
                    {cfg.label}
                  </span>
                  <div className="text-xs leading-relaxed font-medium opacity-90">
                    {cleanChildren}
                  </div>
                </div>
              </div>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 border border-zinc-200 rounded-xl shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-zinc-50 border-b border-zinc-200">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-zinc-100 bg-white">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-zinc-50/60 transition-colors duration-100">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 text-xs text-zinc-700 leading-relaxed align-top">
              {children}
            </td>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !className;

            if (isInline) {
              return (
                <code
                  className="bg-zinc-100 text-indigo-700 font-mono text-[10.5px] px-1.5 py-0.5 rounded border border-zinc-200 whitespace-nowrap"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                codeText={String(children).replace(/\n$/, '')}
                lang={match ? match[1] : 'text'}
              />
            );
          },
          strong: ({ children }) => (
            <strong className="font-bold text-zinc-900">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
