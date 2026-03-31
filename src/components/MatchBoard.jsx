import React from 'react';
import { DESTINATIONS, FARE_TABLE } from '../data/mockData';
import FareCard from './FareCard';
import StudentCard from './StudentCard';

/**
 * MatchBoard
 * ----------
 * Displays the matched group, fare breakdown, and a WhatsApp-style
 * "share" nudge. Shown after the user submits the form.
 */
export default function MatchBoard({ result, onReset }) {
  const { user, matches, fare, vehicle } = result;

  const destObj     = DESTINATIONS.find(d => d.id === user.destination);
  const groupSize   = matches.length + 1;          // matches + the user themselves
  const hasMatches  = matches.length > 0;
  const fareData    = fare[vehicle];
  const altVehicle  = vehicle === 'auto' ? 'cab' : 'auto';
  const altFareData = fare[altVehicle];

  return (
    <div className="fade-in-up">

      {/* ── Board Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="font-mono text-xs text-amber-700 uppercase tracking-widest">Ride Board</p>
          <h2 className="font-display font-extrabold text-2xl leading-tight mt-0.5">
            {destObj?.label ?? user.destination}
          </h2>
          <p className="font-mono text-sm text-gray-500 mt-1">
            Departing around <strong className="text-ink">{user.time}</strong>
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-mono text-gray-400 hover:text-gray-700 underline mt-1 transition-colors"
        >
          ← New search
        </button>
      </div>

      {/* ── Match Status Banner ── */}
      {hasMatches ? (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-display font-bold text-green-800 text-sm">
              {matches.length} match{matches.length > 1 ? 'es' : ''} found!
            </p>
            <p className="font-mono text-xs text-green-600">
              Group of {groupSize} ready to roll from Kothri Kalan
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
          <span className="text-2xl">🕐</span>
          <div>
            <p className="font-display font-bold text-amber-800 text-sm">
              No matches yet
            </p>
            <p className="font-mono text-xs text-amber-600">
              You're the first one! Others can still join your pool.
            </p>
          </div>
        </div>
      )}

      {/* ── Group Cards ── */}
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">
          Ride Group ({groupSize}/{vehicle === 'auto' ? 3 : 4} seats)
        </p>
        <div className="space-y-2 stagger">
          {/* The user's own card */}
          <StudentCard
            name={user.name}
            branch="You"
            year=""
            time={user.time}
            avatar="🙋"
            isUser
          />
          {/* Matched students */}
          {matches.map(s => (
            <StudentCard
              key={s.id}
              name={s.name}
              branch={s.branch}
              year={s.year}
              time={s.time}
              avatar={s.avatar}
            />
          ))}
          {/* Empty seat slots */}
          {Array.from({ length: (vehicle === 'auto' ? 3 : 4) - groupSize }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="fade-in-up flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-gray-200"
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg opacity-40">
                👤
              </div>
              <span className="font-mono text-sm text-gray-300">Open seat…</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fare Cards ── */}
      <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">
        Fare Split
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <FareCard
          vehicle={vehicle}
          fareData={fareData}
          groupSize={groupSize}
          highlighted
        />
        <FareCard
          vehicle={altVehicle}
          fareData={altFareData}
          groupSize={groupSize}
          highlighted={false}
        />
      </div>

      {/* ── WhatsApp Nudge ── */}
      <div className="rounded-xl bg-gray-900 text-white p-4 flex items-center gap-3">
        <span className="text-2xl">💬</span>
        <div>
          <p className="font-display font-bold text-sm">Coordinate with your group</p>
          <p className="font-mono text-xs text-gray-400 mt-0.5">
            Share this: <em className="text-amber-400 not-italic">
              "Ride pool to {destObj?.shortLabel} at {user.time} — split fare ₹{fareData.perPerson}/person. Join?"
            </em>
          </p>
        </div>
      </div>

    </div>
  );
}
