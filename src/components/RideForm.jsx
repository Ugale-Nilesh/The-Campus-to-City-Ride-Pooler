import React, { useState } from 'react';
import { DESTINATIONS } from '../data/mockData';

/**
 * RideForm
 * --------
 * Collects user's name, destination, and desired departure time.
 * Calls onSearch(formData) when submitted.
 */
export default function RideForm({ onSearch, isLoading }) {
  const [name, setName]       = useState('');
  const [dest, setDest]       = useState('');
  const [time, setTime]       = useState('');
  const [vehicle, setVehicle] = useState('auto');
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim())  e.name = 'Please enter your name';
    if (!dest)         e.dest = 'Select a destination';
    if (!time)         e.time = 'Pick a departure time';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSearch({ name: name.trim(), destination: dest, time, vehicle });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-1.5">
            Your Name
          </label>
          <input
            type="text"
            className="ride-input"
            placeholder="e.g. Nilesh"
            value={name}
            onChange={e => { setName(e.target.value); setErrors(p => ({...p, name: ''})); }}
          />
          {errors.name && <p className="text-red-500 text-xs font-mono mt-1">{errors.name}</p>}
        </div>

        {/* Destination */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-1.5">
            Where to?
          </label>
          <select
            className="ride-input"
            value={dest}
            onChange={e => { setDest(e.target.value); setErrors(p => ({...p, dest: ''})); }}
          >
            <option value="">— Select destination —</option>
            {DESTINATIONS.map(d => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
          {errors.dest && <p className="text-red-500 text-xs font-mono mt-1">{errors.dest}</p>}
        </div>

        {/* Time */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-1.5">
            Departure Time
          </label>
          <input
            type="time"
            className="ride-input"
            value={time}
            onChange={e => { setTime(e.target.value); setErrors(p => ({...p, time: ''})); }}
          />
          {errors.time && <p className="text-red-500 text-xs font-mono mt-1">{errors.time}</p>}
          <p className="text-xs font-mono text-gray-400 mt-1">
            ± 45 min window used for matching
          </p>
        </div>

        {/* Vehicle preference */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-2">
            Preferred Vehicle
          </label>
          <div className="flex gap-3">
            {[
              { val: 'auto', label: '🛺  Auto', sub: 'up to 3' },
              { val: 'cab',  label: '🚕  Cab',  sub: 'up to 4' },
            ].map(opt => (
              <button
                key={opt.val}
                type="button"
                onClick={() => setVehicle(opt.val)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 text-left transition-all duration-150
                  ${vehicle === opt.val
                    ? 'border-amber-500 bg-amber-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-amber-300'
                  }`}
              >
                <span className="block font-display font-bold text-sm">{opt.label}</span>
                <span className="block font-mono text-xs text-gray-400">{opt.sub} riders</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700
                     text-white font-display font-bold text-base tracking-wide
                     rounded-lg transition-all duration-150
                     disabled:opacity-60 disabled:cursor-not-allowed
                     pulse-glow"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/>
              </svg>
              Scanning pool…
            </span>
          ) : (
            '🔍  Find Ride Buddies'
          )}
        </button>

      </div>
    </form>
  );
}
