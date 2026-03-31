import React from 'react';

/**
 * StudentCard
 * -----------
 * Renders a single student's info in the match group.
 */
export default function StudentCard({ name, branch, year, time, avatar, isUser }) {
  return (
    <div
      className={`fade-in-up flex items-center justify-between gap-3 p-3 rounded-xl border
        ${isUser
          ? 'bg-amber-50 border-amber-300'
          : 'bg-white border-gray-100 shadow-sm hover:shadow-md transition-shadow'
        }`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar circle */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0
            ${isUser ? 'bg-amber-200' : 'bg-gray-100'}`}
        >
          {avatar}
        </div>

        <div>
          <p className={`font-display font-bold text-sm leading-tight ${isUser ? 'text-amber-900' : ''}`}>
            {name}
            {isUser && (
              <span className="ml-2 text-[10px] font-mono font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded uppercase">
                You
              </span>
            )}
          </p>
          {!isUser && (
            <p className="font-mono text-xs text-gray-400">
              {branch}{year ? ` · ${year} yr` : ''}
            </p>
          )}
        </div>
      </div>

      {/* Time badge */}
      <span
        className={`font-mono text-xs px-2 py-1 rounded-md flex-shrink-0
          ${isUser
            ? 'bg-amber-200 text-amber-900'
            : 'bg-gray-100 text-gray-600'
          }`}
      >
        {time}
      </span>
    </div>
  );
}
