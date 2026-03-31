import React from 'react';

const VEHICLE_META = {
  auto: { icon: '🛺', label: 'Auto Rickshaw', color: 'amber' },
  cab:  { icon: '🚕', label: 'Cab / Taxi',    color: 'sky'   },
};

/**
 * FareCard
 * --------
 * Displays fare total and per-person split for one vehicle type.
 */
export default function FareCard({ vehicle, fareData, groupSize, highlighted }) {
  const meta = VEHICLE_META[vehicle] || VEHICLE_META.auto;
  const { total, perPerson, capacity } = fareData;

  const seatsUsed   = Math.min(groupSize, capacity);
  const savings     = total - perPerson; // vs going alone

  return (
    <div
      className={`rounded-xl p-4 border-2 transition-all
        ${highlighted
          ? 'border-amber-400 bg-amber-50 shadow-md'
          : 'border-gray-200 bg-white'
        }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{meta.icon}</span>
        <div>
          <p className="font-display font-bold text-sm leading-none">{meta.label}</p>
          <p className="font-mono text-xs text-gray-400">
            {seatsUsed}/{capacity} seats
          </p>
        </div>
        {highlighted && (
          <span className="ml-auto text-[10px] font-mono font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded uppercase">
            Selected
          </span>
        )}
      </div>

      {/* Per-person price — big */}
      <p className="font-display font-extrabold text-3xl text-ink leading-none">
        ₹{perPerson}
        <span className="text-sm font-normal text-gray-400 ml-1">/person</span>
      </p>

      {/* Breakdown */}
      <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
        <div className="flex justify-between font-mono text-xs text-gray-500">
          <span>Total fare</span>
          <span>₹{total}</span>
        </div>
        <div className="flex justify-between font-mono text-xs text-gray-500">
          <span>Sharing with</span>
          <span>{seatsUsed - 1} others</span>
        </div>
        {seatsUsed > 1 && (
          <div className="flex justify-between font-mono text-xs text-green-600 font-bold">
            <span>You save vs solo</span>
            <span>₹{savings}</span>
          </div>
        )}
      </div>
    </div>
  );
}
