'use client';

import React, { useState } from 'react';
import { DocsSidebar, type DocSection } from '@/components/docs/docs-sidebar';
import { IntroSection } from '@/components/docs/intro-section';
import { ApiSection } from '@/components/docs/api-section';
import { NodesSection } from '@/components/docs/nodes-section';
import { SchemaSection } from '@/components/docs/schema-section';

export default function Home() {
  const [activeSection, setActiveSection] = useState<DocSection>('intro');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Navigation Sidebar */}
      <DocsSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Documentation Container */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-slate-950">
        {/* Top Spacer/Header */}
        <div className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between bg-slate-950/40 backdrop-blur-xl flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">AetherFlow Docs</span>
            <span className="text-slate-700">/</span>
            <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">
              {activeSection}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://aetherflow-omega.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg bg-slate-900 transition-colors"
            >
              Open Web App
            </a>
          </div>
        </div>

        {/* Content pane */}
        <div className="flex-1 min-h-0 p-8 bg-slate-950/40">
          {activeSection === 'intro' && <IntroSection />}
          {activeSection === 'api' && <ApiSection searchQuery={searchQuery} />}
          {activeSection === 'nodes' && <NodesSection searchQuery={searchQuery} />}
          {activeSection === 'schemas' && <SchemaSection searchQuery={searchQuery} />}
        </div>
      </main>
    </div>
  );
}
