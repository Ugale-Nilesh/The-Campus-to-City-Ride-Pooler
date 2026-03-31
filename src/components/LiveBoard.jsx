import React from 'react';
import { STUDENT_POOL, DESTINATIONS } from '../data/mockData';

/**
 * LiveBoard
 * ---------
 * Scrolling "bulletin board" that shows the latest 8 pool postings,
 * mimicking what a real-time backend might look like.
 * This gives the app a lively, populated feel.
 */
export default function LiveBoard() {
  const recent = [...STUDENT_POOL].slice(0, 8);

  const getDestShort = (id) => DESTINATIONS.find(d => d.id === id)?.shortLabel ?? id;

  return (
    <div className="scanline-container rounded-xl bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-400">
          Live Pool Board
        </p>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
          <span className="font-mono text-xs text-green-400">{STUDENT_POOL.length} active</span>
        </span>
      </div>

      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
        {recent.map((s, i) => (
          <div
            key={s.id}
            className="flex items-center justify-between py-1.5 px-2 rounded-md bg-gray-800 hover:bg-gray-750 transition-colors"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base flex-shrink-0">{s.avatar}</span>
              <span className="font-mono text-xs text-gray-300 truncate">{s.name}</span>
              <span className="font-mono text-[10px] text-gray-500 flex-shrink-0">{s.branch}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <span className="font-mono text-[10px] bg-gray-700 text-amber-300 px-1.5 py-0.5 rounded">
                {getDestShort(s.destination)}
              </span>
              <span className="font-mono text-[10px] text-gray-400">{s.time}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[10px] text-gray-600 mt-3 text-center">
        Simulated data — represents students in pool
      </p>
    </div>
  );
}
