'use client';

import React, { useState } from 'react';
import { apiEndpoints, type ApiEndpoint } from '../../lib/docs-data';
import { PlaygroundPanel } from './playground-panel';
import { Key, ShieldAlert } from 'lucide-react';

interface ApiSectionProps {
  searchQuery: string;
}

export function ApiSection({ searchQuery }: ApiSectionProps) {
  const filteredEndpoints = apiEndpoints.filter((ep) =>
    ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ep.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [activeEndpointIndex, setActiveEndpointIndex] = useState(0);
  const activeEndpoint = filteredEndpoints[activeEndpointIndex] || filteredEndpoints[0];

  const methodColors = {
    GET: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    POST: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    PATCH: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    DELETE: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <div className="flex gap-8 h-full min-h-0">
      {/* List & Details Column */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-4">
        <div>
          <h2 className="text-xl font-black text-slate-100 tracking-tight">API Integration details</h2>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Integrate your external services, sync canvas states, and check workspace quota balances using AetherFlow’s unified REST APIs.
          </p>
        </div>

        {/* Auth notice banner */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 flex items-start gap-3">
          <ShieldAlert size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-400 leading-normal">
            <strong className="text-slate-200">Authentication Guard:</strong> All restricted API calls require a bearer token in the headers block: 
            <code className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 ml-1 text-indigo-300">Authorization: Bearer &lt;jwt-token&gt;</code>.
          </div>
        </div>

        {filteredEndpoints.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">No matching endpoints found.</div>
        ) : (
          <div className="space-y-4">
            {filteredEndpoints.map((ep, idx) => {
              const isSelected = activeEndpointIndex === idx;
              return (
                <div
                  key={ep.path + ep.method}
                  onClick={() => setActiveEndpointIndex(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${methodColors[ep.method]}`}>
                      {ep.method}
                    </span>
                    <code className="text-xs font-bold text-slate-200">{ep.path}</code>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{ep.description}</p>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-4">
                      {ep.body && (
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-500 block mb-2">Request Body Fields</span>
                          <table className="w-full text-[10px] text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-slate-950 text-slate-500 text-left border-b border-slate-800">
                                <th className="px-3 py-1.5 font-bold">Field</th>
                                <th className="px-3 py-1.5 font-bold">Type</th>
                                <th className="px-3 py-1.5 font-bold">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(ep.body).map(([key, val]) => (
                                <tr key={key} className="border-b border-slate-800/60 hover:bg-slate-900/30">
                                  <td className="px-3 py-1.5 font-mono text-indigo-400">{key}</td>
                                  <td className="px-3 py-1.5 font-mono text-slate-500">String</td>
                                  <td className="px-3 py-1.5 text-slate-300">{val}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Terminal Playground Column */}
      {activeEndpoint && (
        <div className="w-96 flex flex-col flex-shrink-0 h-full">
          <PlaygroundPanel
            method={activeEndpoint.method}
            path={activeEndpoint.path}
            headers={activeEndpoint.headers}
            body={activeEndpoint.body}
            response={activeEndpoint.response}
          />
        </div>
      )}
    </div>
  );
}
