import React, { useState, useCallback } from 'react';
import RideForm from './components/RideForm';
import MatchBoard from './components/MatchBoard';
import LiveBoard from './components/LiveBoard';
import { findMatches, calculateFare } from './data/mockData';

/**
 * App.jsx
 * -------
 * Root component. Manages three states:
 *   'idle'     → show search form + live board
 *   'loading'  → fake 1.5s async match scan
 *   'results'  → show MatchBoard with grouped students + fare
 */
export default function App() {
  const [phase,   setPhase]   = useState('idle');    // 'idle' | 'loading' | 'results'
  const [result,  setResult]  = useState(null);

  const handleSearch = useCallback((formData) => {
    setPhase('loading');

    // Simulate a network round-trip (1.5s)
    setTimeout(() => {
      const matches = findMatches(formData.destination, formData.time);
      const fare    = calculateFare(formData.destination, matches.length + 1);

      setResult({
        user: {
          name:        formData.name,
          destination: formData.destination,
          time:        formData.time,
        },
        matches,
        fare,
        vehicle: formData.vehicle,
      });
      setPhase('results');
    }, 1500);
  }, []);

  const handleReset = useCallback(() => {
    setPhase('idle');
    setResult(null);
  }, []);

  return (
    <div className="grain min-h-screen bg-[var(--paper)] py-8 px-4">

      {/* ── Page Header ── */}
      <header className="max-w-2xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 rounded-full px-4 py-1.5 mb-4">
          <span className="text-lg">🛺</span>
          <span className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest">
            VIT Bhopal · Kothri Kalan
          </span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-none text-ink">
          Campus<span className="text-amber-500">-to-</span>City
          <br />
          Ride Pooler
        </h1>
        <p className="font-mono text-sm text-gray-500 mt-3 max-w-xs mx-auto leading-relaxed">
          Stop spamming WhatsApp groups.
          <br />
          Find ride buddies heading the same way.
        </p>
      </header>

      {/* ── Main Layout ── */}
      <main className="max-w-2xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* Left column: Form or Results */}
        <section className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

            {phase === 'idle' && (
              <div className="fade-in-up">
                <p className="font-mono text-xs text-amber-700 uppercase tracking-widest mb-1">
                  New Ride Request
                </p>
                <h2 className="font-display font-extrabold text-xl mb-5">
                  Where are you headed?
                </h2>
                <RideForm onSearch={handleSearch} isLoading={false} />
              </div>
            )}

            {phase === 'loading' && (
              <div className="fade-in-up flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin" />
                <p className="font-display font-bold text-lg text-ink">Scanning the pool…</p>
                <p className="font-mono text-xs text-gray-400">
                  Matching students within ±45 min window
                </p>
              </div>
            )}

            {phase === 'results' && result && (
              <MatchBoard result={result} onReset={handleReset} />
            )}

          </div>
        </section>

        {/* Right column: Live board (always visible) */}
        <aside className="lg:col-span-2 space-y-4">
          <LiveBoard />

          {/* Info card */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm space-y-3">
            <p className="font-display font-bold text-sm">How it works</p>
            <ol className="font-mono text-xs text-gray-500 space-y-2 list-decimal list-inside">
              <li>Enter your name, destination & time</li>
              <li>The app finds students leaving around the same time</li>
              <li>See the split fare for an auto or cab</li>
              <li>Share the pool message on WhatsApp!</li>
            </ol>
            <div className="pt-2 border-t border-gray-100">
              <p className="font-mono text-[10px] text-gray-400">
                📍 Campus → City distance: ~30 km<br/>
                ⏱ Travel time: ~45–60 min<br/>
                💡 Fares are estimated averages
              </p>
            </div>
          </div>
        </aside>

      </main>

      {/* ── Footer ── */}
      <footer className="max-w-2xl mx-auto mt-10 text-center">
        <p className="font-mono text-xs text-gray-400">
          Built by <strong className="text-gray-600">Nilesh</strong> (25BCE10316) · VIT Bhopal · BYOP Capstone
        </p>
        <p className="font-mono text-[10px] text-gray-300 mt-1">
          Frontend-only prototype · Mock data · No real backend
        </p>
      </footer>

    </div>
  );
}
