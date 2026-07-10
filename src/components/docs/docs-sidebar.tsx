import React from 'react';
import { Search, Zap, Layout, ArrowUpRight, Globe, BookOpen } from 'lucide-react';
import { docsSections, type DocSection } from '../../lib/docs-data';

interface DocsSidebarProps {
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'GET STARTED': <BookOpen size={9} />,
  'DEVELOPER SDK': <Zap size={9} />,
  'API REFERENCE': <Globe size={9} />,
};

export function DocsSidebar({
  activeSectionId,
  setActiveSectionId,
  searchQuery,
  setSearchQuery,
}: DocsSidebarProps) {
  const categories: Record<string, DocSection[]> = {
    'GET STARTED': [],
    'DEVELOPER SDK': [],
    'API REFERENCE': [],
  };

  const filteredSections = docsSections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  for (const sec of filteredSections) {
    if (categories[sec.category]) {
      categories[sec.category].push(sec);
    }
  }

  return (
    <div className="w-64 border-r border-zinc-200 bg-white flex flex-col h-full flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-zinc-200 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-md flex-shrink-0">
          <Zap size={13} className="text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-black tracking-wider text-zinc-900 uppercase leading-none">
            AetherFlow
          </span>
          <span className="text-[9px] text-indigo-500 font-bold uppercase tracking-widest leading-none mt-0.5">
            Developers
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-4 py-3 border-b border-zinc-100">
        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-3 w-3 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search docs..."
            className="w-full pl-7 pr-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-[11px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-300 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {Object.entries(categories).map(([catName, items]) => {
          if (items.length === 0) return null;
          return (
            <div key={catName} className="space-y-0.5">
              <div className="flex items-center gap-1.5 px-2 mb-2">
                <span className="text-zinc-400">{CATEGORY_ICONS[catName]}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  {catName}
                </span>
              </div>
              {items.map((item) => {
                const isActive = activeSectionId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSectionId(item.id)}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer outline-none group ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    <span className={`text-[11px] font-semibold block leading-tight truncate ${
                      isActive ? 'font-bold' : ''
                    }`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer Links */}
      <div className="px-4 py-3 border-t border-zinc-100 space-y-1.5">
        <a
          href="https://aetherflow-omega.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-[10px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors px-1 py-0.5 rounded group"
        >
          <span className="flex items-center gap-1.5">
            <Layout size={11} />
            Console Dashboard
          </span>
          <ArrowUpRight size={10} className="text-zinc-300 group-hover:text-zinc-500 transition-colors" />
        </a>
        <a
          href="https://github.com/SMTanimur"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-[10px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors px-1 py-0.5 rounded group"
        >
          <span className="flex items-center gap-1.5">
            <Globe size={11} />
            GitHub
          </span>
          <ArrowUpRight size={10} className="text-zinc-300 group-hover:text-zinc-500 transition-colors" />
        </a>
      </div>
    </div>
  );
}
