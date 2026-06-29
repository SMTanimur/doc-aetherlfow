'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';

export function IntroSection() {
  const cards = [
    {
      title: 'Canvas-First AI Builder',
      desc: 'Orchestrate agents visually using React Flow. Connect nodes to compose advanced agent workflows.',
      icon: Layers,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Scalable NestJS Core',
      desc: 'High-performance NestJS engine backing concurrent calls, live SSE polling streams, and strict token quotas.',
      icon: Zap,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Dual key Authorization',
      desc: 'Toggle between using the shared platform API keys or browser-local overrides for maximum privacy control.',
      icon: ShieldCheck,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <div className="space-y-8 overflow-y-auto h-full pr-4">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-extrabold uppercase tracking-wider">
          <Sparkles size={10} className="animate-spin" />
          AetherFlow v1.2.0 Release
        </div>
        <h2 className="text-2xl font-black text-slate-100 tracking-tight sm:text-3xl leading-none">
          Introduction to AetherFlow
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
          AetherFlow is a premium, visual orchestration platform for AI agents. It allows developers to build complex, multi-modal workflows connecting LLMs, real-time search, sandboxed code executors, database operations, and media generators.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col gap-3">
              <div className={`p-2.5 rounded-xl border w-fit ${card.color}`}>
                <Icon size={16} />
              </div>
              <h4 className="text-xs font-bold text-slate-200">{card.title}</h4>
              <p className="text-[11px] text-slate-400 leading-normal">{card.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Architecture overview section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-4">
        <h4 className="text-xs font-bold text-slate-200">State Synchronization Event Loop</h4>
        <p className="text-[11px] text-slate-400 leading-normal">
          During chat simulations, AetherFlow coordinates active runs visually across the React Flow nodes and lines. 
          When an execution starts, a runtime token verification is made at the backend. Upon validation, the stream begins execution, reporting logs and status updates to the UI step-by-step.
        </p>

        {/* Visual pipeline step representation */}
        <div className="grid grid-cols-5 items-center gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800/60 font-mono text-[10px] text-slate-500">
          <div className="flex flex-col items-center gap-1 bg-slate-900/60 p-2 rounded border border-slate-800 text-indigo-400 font-bold">
            <span>Canvas</span>
            <span className="text-[8px] text-slate-500">Trigger Init</span>
          </div>
          <div className="flex justify-center text-slate-700">
            <ArrowRight size={14} />
          </div>
          <div className="flex flex-col items-center gap-1 bg-slate-900/60 p-2 rounded border border-slate-800 text-amber-400 font-bold">
            <span>NestJS Gate</span>
            <span className="text-[8px] text-slate-500">Quota Check</span>
          </div>
          <div className="flex justify-center text-slate-700">
            <ArrowRight size={14} />
          </div>
          <div className="flex flex-col items-center gap-1 bg-slate-900/60 p-2 rounded border border-slate-800 text-emerald-400 font-bold">
            <span>SSE Stream</span>
            <span className="text-[8px] text-slate-500">Execution</span>
          </div>
        </div>
      </div>
    </div>
  );
}
