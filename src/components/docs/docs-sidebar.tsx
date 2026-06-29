import React from 'react';
import { Search, Flame, Layout, ArrowUpRight, Globe } from 'lucide-react';
import { docsSections, type DocSection } from '../../lib/docs-data';

interface DocsSidebarProps {
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

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
    <div className="w-72 border-r border-zinc-200 bg-zinc-50 flex flex-col h-full flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center shadow-md">
            <Flame size={14} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wider text-zinc-900 uppercase">AetherFlow</span>
            <span className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-widest">Developers</span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-zinc-200 bg-zinc-50/50">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-450 dark:text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search docs..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-5">
        {Object.entries(categories).map(([catName, items]) => {
          if (items.length === 0) return null;
          return (
            <div key={catName} className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 px-2 block mb-1">
                {catName}
              </span>
              {items.map((item) => {
                const isActive = activeSectionId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSectionId(item.id)}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold border border-transparent transition-all cursor-pointer outline-none block truncate ${
                      isActive
                        ? 'bg-zinc-200/60 text-zinc-900 font-bold border-zinc-200/80 shadow-sm'
                        : 'text-zinc-650 hover:text-zinc-900 hover:bg-zinc-100/60'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer Info & Portal Links */}
      <div className="p-4 border-t border-zinc-200 bg-zinc-100/40 flex flex-col gap-2">
        <a
          href="https://aetherflow-omega.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-[10px] font-bold text-zinc-650 hover:text-zinc-900 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Layout size={12} />
            Console Dashboard
          </span>
          <ArrowUpRight size={10} className="text-zinc-400" />
        </a>
        <a
          href="https://github.com/SMTanimur"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-[10px] font-bold text-zinc-650 hover:text-zinc-900 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Globe size={12} />
            GitHub Profile
          </span>
          <ArrowUpRight size={10} className="text-zinc-400" />
        </a>
      </div>
    </div>
  );
}
