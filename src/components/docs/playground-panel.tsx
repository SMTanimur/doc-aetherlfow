'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, RefreshCw } from 'lucide-react';

interface PlaygroundPanelProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  headers?: Record<string, string>;
  body?: Record<string, string>;
  response: Record<string, unknown> | string;
}

export function PlaygroundPanel({
  method,
  path,
  headers,
  body,
  response,
}: PlaygroundPanelProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');

  const methodColors = {
    GET: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    POST: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    PATCH: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    DELETE: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const handleCopy = () => {
    const textToCopy = activeTab === 'request'
      ? JSON.stringify({ headers, body }, null, 2)
      : JSON.stringify(response, null, 2);
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrigger = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveTab('response');
    }, 800);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full shadow-2xl">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-300">Terminal Playground</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer flex items-center gap-1 text-[10px]"
            title="Copy selection"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleTrigger}
            disabled={loading}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 disabled:opacity-60 shadow-lg shadow-indigo-600/10"
          >
            {loading ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />}
            Send Request
          </button>
        </div>
      </div>

      {/* URL Display */}
      <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/40 flex items-center gap-2">
        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border ${methodColors[method]}`}>
          {method}
        </span>
        <code className="text-xs font-semibold text-slate-400 select-all">{path}</code>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800/50 bg-slate-950/20">
        <button
          onClick={() => setActiveTab('request')}
          className={`flex-1 py-2 text-center text-xs font-bold border-b transition-colors cursor-pointer ${
            activeTab === 'request'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          Request
        </button>
        <button
          onClick={() => setActiveTab('response')}
          className={`flex-1 py-2 text-center text-xs font-bold border-b transition-colors cursor-pointer ${
            activeTab === 'response'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          Response
        </button>
      </div>

      {/* Sandbox Terminal Content */}
      <div className="flex-1 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto min-h-[160px] bg-slate-950/60">
        {loading ? (
          <div className="h-full flex items-center justify-center text-slate-500 gap-2">
            <RefreshCw size={14} className="animate-spin" />
            <span>Resolving endpoint...</span>
          </div>
        ) : activeTab === 'request' ? (
          <div className="space-y-4">
            <div>
              <span className="text-slate-500 font-bold block mb-1.5">// Request Headers</span>
              <pre className="text-indigo-300">
                {JSON.stringify(headers || { 'Content-Type': 'application/json' }, null, 2)}
              </pre>
            </div>
            {body && (
              <div>
                <span className="text-slate-500 font-bold block mb-1.5">// Request Payload Body</span>
                <pre className="text-amber-300">
                  {JSON.stringify(body, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div>
            <span className="text-slate-550 font-bold block mb-1.5">// JSON API Response (Status 200 OK)</span>
            <pre className="text-emerald-400">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
