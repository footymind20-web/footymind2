import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Play } from 'lucide-react';
import { getCountryIsoCode } from '../utils/worldCupData';

const ROUND_OF_16_FIXTURES = [
  { id: 'r16-1', homeId: 'BRA', awayId: 'NOR', seedHome: 'Winner R32-9', seedAway: 'Winner R32-10', provHome: 'Brazil', provAway: 'Norway', date: 'Sunday, July 5, 2026', time: '02:00 PM', venue: 'NRG Stadium, Houston', status: 'upcoming', kickoffUtc: '2026-07-05T19:00:00Z' },
  { id: 'r16-2', homeId: 'MEX', awayId: 'ENG', seedHome: 'Winner R32-11', seedAway: 'Winner R32-12', provHome: 'Mexico', provAway: 'England', date: 'Sunday, July 5, 2026', time: '06:00 PM', venue: 'Gillette Stadium, Boston', status: 'upcoming', kickoffUtc: '2026-07-05T22:00:00Z' },
  { id: 'r16-3', homeId: 'POR', awayId: 'ESP', seedHome: 'Winner R32-5', seedAway: 'Winner R32-6', provHome: 'Portugal', provAway: 'Spain', date: 'Tuesday, July 7, 2026', time: '12:00 PM', venue: 'AT&T Stadium, Dallas', status: 'upcoming', kickoffUtc: '2026-07-07T17:00:00Z' },
  { id: 'r16-4', homeId: 'USA', awayId: 'BEL', seedHome: 'Winner R32-7', seedAway: 'Winner R32-8', provHome: 'USA', provAway: 'Belgium', date: 'Tuesday, July 7, 2026', time: '03:00 PM', venue: 'MetLife Stadium, East Rutherford', status: 'upcoming', kickoffUtc: '2026-07-07T19:00:00Z' },
  { id: 'r16-5', homeId: 'ARG', awayId: 'EGY', seedHome: 'Winner R32-13', seedAway: 'Winner R32-14', provHome: 'Argentina', provAway: 'Egypt', date: 'Tuesday, July 7, 2026', time: '09:00 PM', venue: 'SoFi Stadium, Los Angeles', status: 'upcoming', kickoffUtc: '2026-07-08T04:00:00Z' },
  { id: 'r16-6', homeId: 'SUI', awayId: 'COL', seedHome: 'Winner R32-15', seedAway: 'Winner R32-16', provHome: 'Switzerland', provAway: 'Colombia', date: 'Tuesday, July 7, 2026', time: '06:00 PM', venue: 'Levi\'s Stadium, Santa Clara', status: 'upcoming', kickoffUtc: '2026-07-08T01:00:00Z' }
];

const COMPLETED_FIXTURES = [
  { id: 'r16-comp-1', homeId: 'CAN', awayId: 'MAR', homeScore: 0, awayScore: 3, date: 'July 4, 2026', venue: 'BC Place, Vancouver', group: 'Round of 16' },
  { id: 'r16-comp-2', homeId: 'PAR', awayId: 'FRA', homeScore: 0, awayScore: 1, date: 'July 4, 2026', venue: 'Lumen Field, Seattle', group: 'Round of 16' },
  // Round of 32 results
  { id: 'r32-comp-16', homeId: 'COL', awayId: 'GHA', homeScore: 1, awayScore: 0, date: 'July 3, 2026', venue: 'BC Place, Vancouver', group: 'Round of 32' },
  { id: 'r32-comp-15', homeId: 'SUI', awayId: 'ALG', homeScore: 2, awayScore: 0, date: 'July 2, 2026', venue: 'Levi\'s Stadium, Santa Clara', group: 'Round of 32' },
  { id: 'r32-comp-14', homeId: 'AUS', awayId: 'EGY', homeScore: 1, awayScore: 1, date: 'July 2, 2026', venue: 'Lincoln Financial Field, Philadelphia', group: 'Round of 32' },
  { id: 'r32-comp-13', homeId: 'ARG', awayId: 'CPV', homeScore: 3, awayScore: 2, date: 'July 2, 2026', venue: 'SoFi Stadium, Los Angeles', group: 'Round of 32' },
  { id: 'r32-comp-12', homeId: 'POR', awayId: 'CRO', homeScore: 2, awayScore: 1, date: 'July 2, 2026', venue: 'AT&T Stadium, Dallas', group: 'Round of 32' },
  { id: 'r32-comp-11', homeId: 'ESP', awayId: 'AUT', homeScore: 3, awayScore: 0, date: 'July 1, 2026', venue: 'Hard Rock Stadium, Miami', group: 'Round of 32' },
  { id: 'r32-comp-10', homeId: 'USA', awayId: 'BIH', homeScore: 2, awayScore: 0, date: 'July 1, 2026', venue: 'MetLife Stadium, East Rutherford', group: 'Round of 32' },
  { id: 'r32-comp-9', homeId: 'BEL', awayId: 'SEN', homeScore: 3, awayScore: 2, date: 'July 1, 2026', venue: 'Mercedes-Benz Stadium, Atlanta', group: 'Round of 32' },
  { id: 'r32-comp-8', homeId: 'ENG', awayId: 'COD', homeScore: 2, awayScore: 1, date: 'July 1, 2026', venue: 'Arrowhead Stadium, Kansas City', group: 'Round of 32' },
  { id: 'r32-comp-7', homeId: 'MEX', awayId: 'ECU', homeScore: 2, awayScore: 0, date: 'June 30, 2026', venue: 'Estadio Azteca, Mexico City', group: 'Round of 32' },
  { id: 'r32-comp-6', homeId: 'FRA', awayId: 'SWE', homeScore: 3, awayScore: 0, date: 'June 30, 2026', venue: 'Lumen Field, Seattle', group: 'Round of 32' },
  { id: 'r32-comp-5', homeId: 'CIV', awayId: 'NOR', homeScore: 1, awayScore: 2, date: 'June 30, 2026', venue: 'BC Place, Vancouver', group: 'Round of 32' },
  { id: 'r32-comp-4', homeId: 'NED', awayId: 'MAR', homeScore: 2, awayScore: 2, date: 'June 29, 2026', venue: 'Estadio Monterrey, Monterrey', group: 'Round of 32' },
  { id: 'r32-comp-3', homeId: 'GER', awayId: 'PAR', homeScore: 1, awayScore: 1, date: 'June 29, 2026', venue: 'Gillette Stadium, Boston', group: 'Round of 32' },
  { id: 'r32-comp-2', homeId: 'BRA', awayId: 'JPN', homeScore: 2, awayScore: 1, date: 'June 29, 2026', venue: 'NRG Stadium, Houston', group: 'Round of 32' },
  { id: 'r32-comp-1', homeId: 'RSA', awayId: 'CAN', homeScore: 0, awayScore: 1, date: 'June 28, 2026', venue: 'SoFi Stadium, Los Angeles', group: 'Round of 32' }
];

export const RectangularFlag = ({ countryId, width = '90px', height = '56px' }) => {
  const iso = getCountryIsoCode(countryId);
  return (
    <div style={{
      width,
      height,
      background: '#141820',
      border: '1.5px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '6px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.45)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <img
        src={`https://flagcdn.com/w160/${iso.toLowerCase()}.png`}
        alt={countryId}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

export const SmallRectangularFlag = ({ countryId }) => {
  const iso = getCountryIsoCode(countryId);
  return (
    <div style={{
      width: '28px',
      height: '18px',
      background: '#0f1217',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '3px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0
    }}>
      <img
        src={`https://flagcdn.com/w80/${iso.toLowerCase()}.png`}
        alt={countryId}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default function FixturesView({ countries, onSelectMatchup, navigateToPredictor }) {
  const [countdownText, setCountdownText] = useState('00:00:00:00');
  const nextMatch = ROUND_OF_16_FIXTURES[0];
  const nextHome = countries.find(c => c.id === nextMatch.homeId) || {};
  const nextAway = countries.find(c => c.id === nextMatch.awayId) || {};

  // Tick countdown timer to the next kickoff
  useEffect(() => {
    const targetDate = new Date(nextMatch.kickoffUtc).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdownText('MATCH STARTED');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const dStr = days > 0 ? `${days}d ` : '';
      const hStr = String(hours).padStart(2, '0');
      const mStr = String(minutes).padStart(2, '0');
      const sStr = String(seconds).padStart(2, '0');

      setCountdownText(`${dStr}${hStr}:${mStr}:${sStr}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nextMatch.kickoffUtc]);

  const handlePredictShortcut = (homeId, awayId) => {
    onSelectMatchup(homeId, awayId);
    navigateToPredictor();
  };

  return (
    <div className="flex-column gap-6" style={{ width: '100%' }}>
      {/* Mega Countdown Banner with clean tech gradient */}
      <div 
        className="glass-panel" 
        style={{ 
          background: 'linear-gradient(135deg, #10141b 0%, #08090c 100%)',
          border: '1px solid rgba(232, 255, 0, 0.15)', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)', 
          overflow: 'hidden', 
          position: 'relative',
          borderRadius: '16px',
          padding: '1.5rem'
        }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(232,255,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div className="flex-column gap-4" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex-row-between">
            <span className="text-[10px] text-[#e8ff00] font-black uppercase tracking-widest block" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff00] animate-ping" style={{ width: '6px', height: '6px', backgroundColor: '#e8ff00', borderRadius: '50%' }} />
              Next Scheduled Kickoff (Round of 16)
            </span>
            <span className="text-[10px] text-[#64748b] font-mono font-bold" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              🏟️ {nextMatch.venue}
            </span>
          </div>

          {/* Left-to-Right Horizontal Row Layout - Forced side-by-side */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: '100%',
              margin: '0.75rem 0',
              gap: '1rem'
            }}
          >
            {/* Home Team */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <RectangularFlag countryId={nextMatch.homeId} />
              <span className="text-[10px] text-[#64748b] leading-none uppercase tracking-widest block mt-2 font-bold">{nextMatch.seedHome}</span>
              <span className="text-sm font-black text-white block mt-1 leading-none text-center">{nextMatch.provHome}</span>
              <span className="text-[9px] text-[#64748b] font-semibold mt-1.5 uppercase tracking-wide block text-center">Rank: {nextHome.ranking || '—'} | ELO: {nextHome.elo || '—'}</span>
            </div>

            {/* Countdown / VS Center */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '160px' }}>
              <span className="text-[9px] font-bold text-[#64748b] font-mono tracking-widest bg-black/35 px-2.5 py-0.5 rounded-full border border-white/5">KICKOFF COUNTDOWN</span>
              <div className="font-mono text-2xl md:text-3xl font-black text-[#e8ff00]" style={{ letterSpacing: '2px', textShadow: '0 0 12px rgba(232,255,0,0.4)', lineHeight: '1.2' }}>
                {countdownText}
              </div>
              <span className="text-[9px] text-[#08090c] font-black tracking-widest uppercase bg-[#e8ff00] px-3 py-0.5 rounded-full shadow-lg">Round of 16</span>
            </div>

            {/* Away Team */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <RectangularFlag countryId={nextMatch.awayId} />
              <span className="text-[10px] text-[#64748b] leading-none uppercase tracking-widest block mt-2 font-bold">{nextMatch.seedAway}</span>
              <span className="text-sm font-black text-white block mt-1 leading-none text-center">{nextMatch.provAway}</span>
              <span className="text-[9px] text-[#64748b] font-semibold mt-1.5 uppercase tracking-wide block text-center">Rank: {nextAway.ranking || '—'} | ELO: {nextAway.elo || '—'}</span>
            </div>
          </div>

          <div className="flex-row-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.85rem' }}>
            <div className="flex gap-4 text-xs text-[#cbd5e1]" style={{ display: 'flex', gap: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} className="text-[#64748b]" /> {nextMatch.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} className="text-[#64748b]" /> {nextMatch.time} Local</span>
            </div>

            <button
              onClick={() => handlePredictShortcut(nextMatch.homeId, nextMatch.awayId)}
              className="btn-predict"
              style={{ padding: '0.45rem 1.25rem', fontSize: '11px', width: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Play size={10} /> Predict Matchup
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming and Completed Fixtures */}
      <div className="grid-2-col gap-6" style={{ alignItems: 'start' }}>
        {/* Upcoming Knockouts */}
        <div className="glass-panel flex-column gap-4">
          <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block">Round of 16 Schedule</span>
          
          <div className="flex-column gap-3" style={{ maxHeight: '580px', overflowY: 'auto', paddingRight: '4px' }}>
            {ROUND_OF_16_FIXTURES.map((fixture) => {
              return (
                <div
                  key={fixture.id}
                  className="flex-column"
                  style={{
                    background: '#0f1217',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.04)'
                  }}
                >
                  <div className="flex-row-between">
                    <span className="text-[9px] text-[#64748b] font-mono font-bold">{fixture.date}</span>
                    <span className="text-[9px] text-[#e8ff00] font-black uppercase">Round of 16</span>
                  </div>

                  <div className="grid-3-col" style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', margin: '0.35rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <SmallRectangularFlag countryId={fixture.homeId} />
                      <span className="text-xs font-bold text-white">{fixture.provHome}</span>
                    </div>

                    <span className="text-[10px] text-[#64748b] font-mono font-bold px-2 text-center">VS</span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                      <span className="text-xs font-bold text-white">{fixture.provAway}</span>
                      <SmallRectangularFlag countryId={fixture.awayId} />
                    </div>
                  </div>

                  <div className="flex-row-between mt-1" style={{ borderTop: '1px dotted rgba(255,255,255,0.06)', paddingTop: '0.45rem', fontSize: '9px', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={9} /> {fixture.venue}</span>
                    <button
                      onClick={() => handlePredictShortcut(fixture.homeId, fixture.awayId)}
                      className="hover-neon"
                      style={{ background: 'transparent', border: 'none', color: '#e8ff00', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 'bold' }}
                    >
                      Predict <ArrowRight size={8} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completed Group & Knockout Results */}
        <div className="flex-column gap-6">
          <div className="glass-panel flex-column gap-4">
            <div className="flex-row-between">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block">Completed Matches</span>
              <span className="text-[9px] text-[#e8ff00] font-bold uppercase">R16 Underway</span>
            </div>
            <div className="flex-column gap-3" style={{ maxHeight: '580px', overflowY: 'auto', paddingRight: '4px' }}>
              {COMPLETED_FIXTURES.map((fixture) => {
                const home = countries.find(c => c.id === fixture.homeId) || {};
                const away = countries.find(c => c.id === fixture.awayId) || {};

                return (
                  <div
                    key={fixture.id}
                    className="flex-column"
                    style={{
                      background: '#0a0c10',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.02)'
                    }}
                  >
                    <div className="flex-row-between">
                      <span className="text-[9px] text-[#64748b] font-mono">{fixture.date}</span>
                      <span className="text-[9px] text-[#cbd5e1] font-bold tracking-wider uppercase bg-[#1e293b]/50 px-1.5 py-0.25 rounded">{fixture.group}</span>
                    </div>

                    <div className="grid-3-col" style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', margin: '0.35rem 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SmallRectangularFlag countryId={fixture.homeId} />
                        <span className="text-xs font-bold text-white">{home.name || fixture.provHome}</span>
                      </div>

                      <div className="flex items-center justify-center" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.03)', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', width: '45px', margin: '0 auto' }}>
                        <span className="text-xs font-extrabold" style={{ color: fixture.homeScore > fixture.awayScore ? '#e8ff00' : '#ffffff' }}>{fixture.homeScore}</span>
                        <span className="text-[9px] text-[#64748b] font-bold font-mono">-</span>
                        <span className="text-xs font-extrabold" style={{ color: fixture.awayScore > fixture.homeScore ? '#e8ff00' : '#ffffff' }}>{fixture.awayScore}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                        <span className="text-xs font-bold text-white">{away.name || fixture.provAway}</span>
                        <SmallRectangularFlag countryId={fixture.awayId} />
                      </div>
                    </div>

                    <div style={{ fontSize: '9px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '0.15rem' }}>
                      <MapPin size={9} /> {fixture.venue}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
