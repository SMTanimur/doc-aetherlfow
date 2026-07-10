import React from 'react';

/**
 * Skeleton pulse animation blocks for document loading state.
 * Mirrors the exact layout of the documentation content pane.
 */
export function DocSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Title block */}
      <div className="border-b border-zinc-100 pb-6 space-y-3">
        <div className="h-8 bg-zinc-100 rounded-lg w-2/3" />
        <div className="h-4 bg-zinc-100 rounded w-1/2" />
      </div>

      {/* Paragraph 1 */}
      <div className="space-y-2.5">
        <div className="h-3 bg-zinc-100 rounded w-full" />
        <div className="h-3 bg-zinc-100 rounded w-[95%]" />
        <div className="h-3 bg-zinc-100 rounded w-4/5" />
      </div>

      {/* Heading */}
      <div className="h-5 bg-zinc-100 rounded w-1/3 mt-6" />

      {/* List items */}
      <div className="space-y-2.5 pl-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 mt-1.5 flex-shrink-0" />
            <div className={`h-3 bg-zinc-100 rounded ${i === 1 ? 'w-4/5' : i === 2 ? 'w-3/4' : 'w-2/3'}`} />
          </div>
        ))}
      </div>

      {/* Callout box */}
      <div className="h-14 bg-zinc-50 border border-zinc-100 rounded-xl" />

      {/* Heading 2 */}
      <div className="h-5 bg-zinc-100 rounded w-2/5 mt-2" />

      {/* Paragraph 2 */}
      <div className="space-y-2.5">
        <div className="h-3 bg-zinc-100 rounded w-full" />
        <div className="h-3 bg-zinc-100 rounded w-[88%]" />
      </div>

      {/* Table skeleton */}
      <div className="border border-zinc-100 rounded-xl overflow-hidden space-y-px">
        <div className="h-9 bg-zinc-100 w-full" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 bg-zinc-50 border-t border-zinc-100 w-full" />
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for the right-hand API playground panel.
 */
export function PlaygroundSkeleton() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      {/* Request block */}
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <div className="h-7 bg-zinc-900 border-b border-zinc-800 px-3 flex items-center justify-between">
          <div className="h-2.5 bg-zinc-700 rounded w-28" />
          <div className="h-2.5 bg-zinc-700 rounded w-8" />
        </div>
        <div className="p-3.5 space-y-2 bg-zinc-950">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`h-2.5 bg-zinc-800 rounded ${i % 2 === 0 ? 'w-3/4' : 'w-full'}`} />
          ))}
        </div>
      </div>
      {/* Response block */}
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <div className="h-7 bg-zinc-900 border-b border-zinc-800" />
        <div className="p-3.5 space-y-2 bg-zinc-950">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-2.5 bg-zinc-800 rounded ${i === 2 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
