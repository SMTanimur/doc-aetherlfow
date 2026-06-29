import React from 'react';
import { BookOpen, Network, Database, Terminal, Search, Flame } from 'lucide-react';

export type DocSection = 'intro' | 'api' | 'nodes' | 'schemas';

interface DocsSidebarProps {
  activeSection: DocSection;
  setActiveSection: (sec: DocSection) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function DocsSidebar({
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery,
}: DocsSidebarProps) {
  const menuItems = [
    { id: 'intro' as const, label: 'Introduction', icon: BookOpen, desc: 'Overview & Architecture' },
    { id: 'api' as const, label: 'API Reference', icon: Terminal, desc: 'REST Integration schemas' },
    { id: 'nodes' as const, label: 'Node Registry', icon: Network, desc: 'Inputs & Output definitions' },
    { id: 'schemas' as const, label: 'DB Schemas', icon: Database, desc: 'Mongoose models & indices' },
  ];

  return (
    <div className="w-80 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl flex flex-col h-full flex-shrink-0">
      {/* Brand Logo Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Flame size={16} className="text-white animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-black tracking-wider text-slate-100 uppercase">AetherFlow</span>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Developer Docs</span>
        </div>
      </div>

      {/* Live search input */}
      <div className="p-4 border-b border-slate-800/50">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Navigation Tree */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="px-2 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Documentation</span>
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left border border-transparent transition-all cursor-pointer outline-none ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className={`p-2 rounded-lg border ${
                isActive ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
              }`}>
                <Icon size={14} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold">{item.label}</span>
                <span className="text-[9px] text-slate-500 truncate mt-0.5">{item.desc}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/20 flex flex-col gap-1 text-[10px] text-slate-500">
        <div className="flex items-center justify-between">
          <span>Version</span>
          <span className="font-bold text-slate-400">v1.2.0</span>
        </div>
        <div className="flex items-center justify-between">
          <span>License</span>
          <span className="font-bold text-slate-400">Proprietary</span>
        </div>
      </div>
    </div>
  );
}
