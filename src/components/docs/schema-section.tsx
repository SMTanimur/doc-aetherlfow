'use client';

import React from 'react';
import { schemasData, type SchemaDef } from '../../lib/docs-data';
import { Database, AlertCircle } from 'lucide-react';

interface SchemaSectionProps {
  searchQuery: string;
}

export function SchemaSection({ searchQuery }: SchemaSectionProps) {
  const filteredSchemas = schemasData.filter((sch) =>
    sch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sch.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 overflow-y-auto h-full pr-4">
      <div>
        <h2 className="text-xl font-black text-slate-100 tracking-tight">Database Schemas</h2>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          AetherFlow uses MongoDB/Mongoose. Review model parameters, data types, and index rules mapping directly to Mongoose collections.
        </p>
      </div>

      {filteredSchemas.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500">No matching schemas found.</div>
      ) : (
        <div className="space-y-6">
          {filteredSchemas.map((sch) => (
            <div key={sch.name} className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Database size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-100">{sch.name} Schema</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{sch.name.toLowerCase()}s</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">{sch.description}</p>

              {/* Fields Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-900 text-slate-500 text-left border-b border-slate-800">
                      <th className="px-3 py-2 font-bold">Field Path</th>
                      <th className="px-3 py-2 font-bold">Type</th>
                      <th className="px-3 py-2 font-bold">Required</th>
                      <th className="px-3 py-2 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sch.fields.map((f) => (
                      <tr key={f.name} className="border-b border-slate-800/60 hover:bg-slate-900/30">
                        <td className="px-3 py-2 font-mono text-indigo-400">{f.name}</td>
                        <td className="px-3 py-2 font-mono text-slate-500">{f.type}</td>
                        <td className="px-3 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                            f.required ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {f.required ? 'YES' : 'NO'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-slate-300">{f.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Indexes */}
              {sch.indexes && sch.indexes.length > 0 && (
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-start gap-2.5">
                  <AlertCircle size={14} className="text-amber-500 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[9px] font-extrabold uppercase text-slate-500 block">Configured Collection Indexes</span>
                    <div className="flex flex-wrap gap-2">
                      {sch.indexes.map((idx) => (
                        <code key={idx} className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80 font-mono text-[9px] text-amber-400">
                          {idx}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
