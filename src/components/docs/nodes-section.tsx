'use client';

import React from 'react';
import { nodesData, type NodeDef } from '../../lib/docs-data';
import { Network, ArrowRight, HelpCircle } from 'lucide-react';

interface NodesSectionProps {
  searchQuery: string;
}

export function NodesSection({ searchQuery }: NodesSectionProps) {
  const filteredNodes = nodesData.filter((node) =>
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 overflow-y-auto h-full pr-4">
      <div>
        <h2 className="text-xl font-black text-slate-100 tracking-tight">Node Registry</h2>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Explore parameters, configurations, inputs, and outputs defined for each visual node type on AetherFlow’s builder canvas.
        </p>
      </div>

      {/* Variables substitution guide */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle size={15} className="text-indigo-400" />
          <h4 className="text-xs font-bold text-slate-200">Variables Resolution & Substitution</h4>
        </div>
        <p className="text-[11px] text-slate-400 leading-normal">
          AetherFlow uses a Jinja-like placeholder evaluation engine. Any node parameter can reference outputs of upstream nodes by typing:
        </p>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/60 font-mono text-xs text-indigo-300 flex items-center justify-between">
          <span>{"{{NodeTitle.variable}}"}  or  {"{{NodeId.variable}}"}</span>
          <ArrowRight size={12} className="text-slate-500" />
          <span className="text-slate-400 text-[10px]">E.g. {"{{LLM_Node_1.text}}"}</span>
        </div>
      </div>

      {filteredNodes.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500">No matching nodes found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNodes.map((node) => (
            <div key={node.type} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Network size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-100">{node.name}</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{node.type}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">{node.description}</p>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800/40 text-[10px]">
                {/* Inputs */}
                <div className="space-y-1.5">
                  <span className="font-extrabold uppercase text-indigo-400 block mb-1">Inputs</span>
                  {node.inputs.map((inp) => (
                    <div key={inp.name} className="flex flex-col">
                      <span className="font-mono font-bold text-slate-300">{inp.name}</span>
                      <span className="text-slate-500 text-[9px]">{inp.description}</span>
                    </div>
                  ))}
                </div>

                {/* Outputs */}
                <div className="space-y-1.5">
                  <span className="font-extrabold uppercase text-emerald-400 block mb-1">Outputs</span>
                  {node.outputs.map((out) => (
                    <div key={out.name} className="flex flex-col">
                      <span className="font-mono font-bold text-slate-300">{out.name}</span>
                      <span className="text-slate-500 text-[9px]">{out.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
