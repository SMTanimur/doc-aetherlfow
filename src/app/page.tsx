'use client';

import React, { useState, useEffect } from 'react';
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { MarkdownRenderer } from '@/components/docs/markdown-renderer';
import { docsSections } from '@/lib/docs-data';
import { Loader2, Play, CheckCircle, Terminal } from 'lucide-react';

interface CodeBlockType {
  lang: string;
  code: string;
}

export default function Home() {
  const [activeSectionId, setActiveSectionId] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [cleanText, setCleanText] = useState('');
  const [codeBlocks, setCodeBlocks] = useState<CodeBlockType[]>([]);
  const [loading, setLoading] = useState(true);

  // Playground simulation states
  const [simulating, setSimulating] = useState(false);
  const [simulated, setSimulated] = useState(false);

  const activeSection = docsSections.find(sec => sec.id === activeSectionId) || docsSections[0];

  useEffect(() => {
    let active = true;
    setLoading(true);
    setSimulated(false);
    setSimulating(false);

    fetch(activeSection.filePath)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load document');
        return res.text();
      })
      .then((text) => {
        if (active) {
          // Parse code blocks dynamically
          const blocks: CodeBlockType[] = [];
          const regex = /```(\w*)\n([\s\S]*?)```/g;
          let match;
          
          while ((match = regex.exec(text)) !== null) {
            blocks.push({
              lang: match[1] || 'json',
              code: match[2].trim(),
            });
          }

          // Strip code blocks to get narrative content for the center pane
          const narrative = text.replace(/```\w*\n[\s\S]*?```/g, '').trim();

          setCleanText(narrative);
          setCodeBlocks(blocks);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setCleanText(`Failed to load document: ${err instanceof Error ? err.message : String(err)}`);
          setCodeBlocks([]);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [activeSection.filePath]);

  const handleSimulate = () => {
    setSimulating(true);
    setSimulated(false);
    setTimeout(() => {
      setSimulating(false);
      setSimulated(true);
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-white text-zinc-900 overflow-hidden font-sans select-text">
      {/* Navigation Sidebar */}
      <DocsSidebar
        activeSectionId={activeSectionId}
        setActiveSectionId={setActiveSectionId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Documentation Container */}
      <main className="flex-1 flex h-full min-w-0 bg-white">
        {/* Top Header Bar */}
        <div className="h-14 border-b border-zinc-200 px-8 flex items-center justify-between bg-zinc-50/20 backdrop-blur flex-shrink-0">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-450 tracking-wider">
            <span>AetherFlow Docs</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-500 uppercase tracking-widest">{activeSection.category}</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-800 uppercase tracking-widest">{activeSection.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://smtanimur.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-extrabold text-zinc-650 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 px-3 py-1.5 rounded-lg bg-white shadow-sm transition-colors"
            >
              Developer Profile
            </a>
          </div>
        </div>

        {/* Content Pane Split */}
        <div className="flex-1 flex min-h-0 divide-x divide-zinc-200 overflow-hidden">
          {/* Middle Column: Narrative Text (Markdown) */}
          <div className="flex-1 overflow-y-auto px-8 py-10">
            <div className="max-w-2xl space-y-6">
              {/* Title Block */}
              <div className="border-b border-zinc-200 pb-5 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-none">
                  {activeSection.title}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-550 leading-normal font-semibold">
                  {activeSection.subtitle}
                </p>
              </div>

              {/* Markdown Narrative Parser */}
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-zinc-400 gap-2.5 select-none">
                  <Loader2 size={24} className="animate-spin text-zinc-400" />
                  <span className="text-xs font-semibold">Fetching documentation...</span>
                </div>
              ) : (
                <MarkdownRenderer content={cleanText} />
              )}
            </div>
          </div>

          {/* Right Column: Code & Response Playground */}
          <div className="w-[420px] bg-zinc-950 border-l border-zinc-900 flex flex-col h-full flex-shrink-0 select-none overflow-hidden">
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between text-zinc-400 bg-zinc-900/30">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-indigo-400" />
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-300">API Console Playground</span>
              </div>
              {codeBlocks.length > 0 && (
                <button
                  disabled={simulating}
                  onClick={handleSimulate}
                  className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors shadow"
                >
                  {simulating ? <Loader2 size={10} className="animate-spin" /> : <Play size={10} />}
                  Run Test
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {codeBlocks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-[10px] text-center px-6 leading-relaxed">
                  <Terminal size={20} className="text-zinc-700 mb-2.5" />
                  <span>Select any developer route to view mock payloads and trigger sandbox test calls.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {codeBlocks.map((block, idx) => {
                    const isResponse = idx > 0 || block.code.startsWith('{') && !block.code.includes('POST');
                    return (
                      <div
                        key={idx}
                        className={`space-y-1.5 rounded-lg overflow-hidden border transition-all duration-350 ${
                          isResponse && simulated ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'border-zinc-800'
                        }`}
                      >
                        <div className="px-3 py-1 bg-zinc-900 border-b border-zinc-850 flex items-center justify-between text-zinc-400 text-[9px] font-bold uppercase tracking-wider">
                          <span>{isResponse ? 'RESPONSE BODY' : 'REQUEST SPECIFICATION'}</span>
                          <span>{block.lang}</span>
                        </div>
                        <pre className="p-3 overflow-x-auto text-[10px] font-mono text-zinc-200 leading-relaxed bg-zinc-900/60 select-text">
                          {block.code}
                        </pre>
                      </div>
                    );
                  })}

                  {/* Simulated Output Status Banner */}
                  {simulating && (
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-semibold flex items-center gap-2 animate-pulse">
                      <Loader2 size={12} className="animate-spin text-indigo-400" />
                      <span>Resolving upstream parameters and checking quotas...</span>
                    </div>
                  )}

                  {simulated && (
                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-[10px] text-emerald-400 font-semibold flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">HTTP 200 OK (145ms)</div>
                        <div className="text-[9px] text-emerald-500/80 font-normal mt-0.5">Estimated quota cost: 0.0038 credits. Run execution logs completed.</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
