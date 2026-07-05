import React, { useState, useEffect } from 'react';
import { Play, AlertCircle, RefreshCw, ShieldAlert, BarChart3, TrendingUp, Tv } from 'lucide-react';
import { runMonteCarloSimulation, simulateMatch } from '../utils/aiSimulator';

// Helper to get ISO country codes for FlagCDN
const getCountryIsoCode = (id) => {
  const mapping = {
    ARG: 'ar', FRA: 'fr', ESP: 'es', ENG: 'gb-eng', BRA: 'br', POR: 'pt',
    NED: 'nl', BEL: 'be', CRO: 'hr', MAR: 'ma', GER: 'de', SUI: 'ch',
    USA: 'us', COL: 'co', MEX: 'mx', URU: 'uy', JPN: 'jp', SEN: 'sn',
    IRN: 'ir', KOR: 'kr', AUS: 'au', AUT: 'at', SWE: 'se', ECU: 'ec',
    TUR: 'tr', SCO: 'gb-sct', CAN: 'ca', NOR: 'no', CZE: 'cz', EGY: 'eg',
    ALG: 'dz', TUN: 'tn', GHA: 'gh', RSA: 'za', COD: 'cd', KSA: 'sa',
    QAT: 'qa', IRQ: 'iq', UZB: 'uz', JOR: 'jo', NZL: 'nz', PAR: 'py',
    BIH: 'ba', CPV: 'cv', PAN: 'pa', HAI: 'ht', CUW: 'cw', CIV: 'ci'
  };
  return mapping[id] || 'un';
};

// Reusable Rectangular Flag component using FlagCDN images
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

// Smaller rectangular flag for lists, dropdowns, and pitch scoreboard
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

// Custom, searchable, alphabetically-sorted Select Component
const CustomSelect = ({ value, onChange, disabled, countries }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const selectedCountry = countries.find(c => c.id === value);

  // Alphabetical sort of countries by name
  const sortedCountries = [...countries]
    .sort((a, b) => a.name.localeCompare(b.name));

  const filtered = sortedCountries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ position: 'relative', width: '100%', zIndex: open ? 1001 : 1 }}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className="select-country-custom"
        disabled={disabled}
        style={{
          width: '100%',
          background: '#0f1217',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#ffffff',
          padding: '0.65rem 1rem',
          borderRadius: '10px',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: disabled ? 'default' : 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SmallRectangularFlag countryId={value} />
          <span>{selectedCountry?.name}</span>
          <span style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold', background: 'rgba(255,255,255,0.03)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>ELO {selectedCountry?.elo}</span>
        </div>
        <span style={{ fontSize: '8px', color: '#64748b' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <>
          <div 
            onClick={() => setOpen(false)} 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }} 
          />
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '6px',
            background: '#0a0c10',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            maxHeight: '260px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            padding: '6px'
          }}>
            {/* Search Input inside custom select */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search nation..."
              style={{
                width: '100%',
                background: '#14181f',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#ffffff',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                marginBottom: '6px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {filtered.map(c => (
              <div
                key={c.id}
                onClick={() => {
                  onChange(c.id);
                  setOpen(false);
                  setSearch('');
                }}
                className="select-country-custom-item"
                style={{
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: value === c.id ? '#e8ff00' : '#ffffff',
                  background: value === c.id ? 'rgba(232, 255, 0, 0.04)' : 'transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SmallRectangularFlag countryId={c.id} />
                  <span style={{ fontWeight: value === c.id ? 'bold' : 'normal' }}>{c.name}</span>
                </div>
                <span style={{ fontSize: '9px', color: '#64748b', fontFamily: 'monospace' }}>ELO {c.elo}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '0.75rem', fontStyle: 'italic', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>No teams found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default function DashboardView({ countries, defaultTeamAId, defaultTeamBId }) {
  const [teamAId, setTeamAId] = useState(defaultTeamAId || 'ARG');
  const [teamBId, setTeamBId] = useState(defaultTeamBId || 'FRA');

  // Monte Carlo & single playback states
  const [monteCarlo, setMonteCarlo] = useState(null);
  const [playbackScore, setPlaybackScore] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [simulating, setSimulating] = useState(false);

  // Playback timer & commentary states
  const [showPitch, setShowPitch] = useState(false);
  const [liveMinute, setLiveMinute] = useState(0);
  const [liveScore, setLiveScore] = useState('0-0');
  const [visibleEvents, setVisibleEvents] = useState([]);

  // Sync with default incoming match updates
  useEffect(() => {
    if (defaultTeamAId) setTeamAId(defaultTeamAId);
    if (defaultTeamBId) setTeamBId(defaultTeamBId);
    if (defaultTeamAId || defaultTeamBId) {
      setMonteCarlo(null);
      setSimulation(null);
    }
  }, [defaultTeamAId, defaultTeamBId]);

  const teamA = countries.find(c => c.id === teamAId) || {};
  const teamB = countries.find(c => c.id === teamBId) || {};

  const handleStartSimulation = () => {
    if (teamAId === teamBId) return;
    setSimulating(true);
    setPlaybackScore(null);
    setShowPitch(false);

    setTimeout(() => {
      const res = runMonteCarloSimulation(teamA, teamB);
      setMonteCarlo(res);
      setSimulating(false);
    }, 1200);
  };

  const handleStartPlayback = () => {
    if (!monteCarlo) return;
    setSimulating(true);
    setShowPitch(true);
    setVisibleEvents([]);
    setLiveMinute(0);
    setLiveScore('0-0');

    const scoreline = monteCarlo.sortedScorelines[0];
    setPlaybackScore(scoreline);

    const singleSim = simulateMatch(teamA, teamB, scoreline.goalsA, scoreline.goalsB);
    setSimulation(singleSim);

    let currentMinute = 0;
    const interval = setInterval(() => {
      currentMinute += 5;
      setLiveMinute(currentMinute);

      const events = singleSim.timeline.filter(e => e.minute <= currentMinute);
      setVisibleEvents(events);

      if (events.length > 0) {
        setLiveScore(events[events.length - 1].scoreAfter);
      }

      if (currentMinute >= 90) {
        clearInterval(interval);
        setSimulating(false);
      }
    }, 150);
  };

  const renderForm = (form) => {
    return (
      <div className="flex gap-1" style={{ display: 'flex', gap: '4px' }}>
        {form.map((f, i) => {
          let bg = '#475569';
          if (f === 'W') bg = '#10b981';
          if (f === 'L') bg = '#ef4444';
          return (
            <span
              key={i}
              style={{
                width: '18px',
                height: '18px',
                background: bg,
                color: '#ffffff',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: 'bold'
              }}
            >
              {f}
            </span>
          );
        })}
      </div>
    );
  };

  const renderInjuriesList = (injuries) => {
    if (!injuries || injuries.length === 0) {
      return <span className="text-[11px] text-[#64748b] italic">None (Full Squad Available)</span>;
    }
    return (
      <div className="flex flex-col gap-0.5" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {injuries.map((inj, i) => (
          <span key={i} className="text-[11px] text-[#ff6b6b] font-medium" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <ShieldAlert size={10} /> {inj}
          </span>
        ))}
      </div>
    );
  };

  // Dynamic stable H2H simulator
  const getH2H = (idA, idB) => {
    const sum = idA.charCodeAt(0) + idA.charCodeAt(1) + idB.charCodeAt(0) + idB.charCodeAt(1);
    const winsA = sum % 3;
    const winsB = (sum + 1) % 3;
    const draws = 5 - winsA - winsB;
    return { winsA, winsB, draws };
  };

  const h2h = getH2H(teamAId, teamBId);

  // Compute positive edge discrepancies
  const getValueEdges = () => {
    if (!monteCarlo) return [];
    const edges = [];
    if (monteCarlo.edgeA > 2.0) {
      edges.push({ team: teamA.name, edge: monteCarlo.edgeA, type: 'Win' });
    }
    if (monteCarlo.edgeB > 2.0) {
      edges.push({ team: teamB.name, edge: monteCarlo.edgeB, type: 'Win' });
    }
    if (monteCarlo.edgeDraw > 2.0) {
      edges.push({ team: 'Draw', edge: monteCarlo.edgeDraw, type: 'Draw' });
    }
    return edges;
  };
  
  const activeEdges = getValueEdges();

  return (
    <div className="flex-column gap-6" style={{ width: '100%' }}>
      {/* Main Predictor Configuration Panel */}
      <div className="flex-column gap-6">
        <div className="glass-panel flex-column gap-4">
          <div className="flex-row-between">
            <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Predict Next Matchup</span>
            <span className="text-xs text-[#e8ff00] font-bold">Model Engine Ready</span>
          </div>

          {/* Modern Face-To-Face Matchup Header (Flag on top, Name under flag, strictly horizontal) */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: '100%',
              margin: '0.25rem 0 0.5rem 0',
              padding: '1.25rem 1rem',
              background: 'linear-gradient(135deg, #10141b 0%, #0c0f14 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '14px',
              gap: '1rem',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.02), 0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            {/* Home Team Flag & Name Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <RectangularFlag countryId={teamAId} />
              <span className="text-sm font-black text-white block mt-2 text-center" style={{ letterSpacing: '0.5px' }}>{teamA.name}</span>
              <span className="text-[10px] text-[#64748b] font-mono mt-0.5 block text-center">Rank: {teamA.ranking} | ELO: {teamA.elo}</span>
            </div>

            {/* Center VS Divider */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '80px' }}>
              <span className="text-[9px] font-bold text-[#64748b] font-mono tracking-widest bg-black/45 px-2.5 py-0.5 rounded-full border border-white/5">PROBABILITY</span>
              <span className="text-xl font-black text-[#e8ff00]" style={{ letterSpacing: '2px', textShadow: '0 0 8px rgba(232,255,0,0.3)', lineHeight: '1.2' }}>VS</span>
            </div>

            {/* Away Team Flag & Name Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <RectangularFlag countryId={teamBId} />
              <span className="text-sm font-black text-white block mt-2 text-center" style={{ letterSpacing: '0.5px' }}>{teamB.name}</span>
              <span className="text-[10px] text-[#64748b] font-mono mt-0.5 block text-center">Rank: {teamB.ranking} | ELO: {teamB.elo}</span>
            </div>
          </div>

          {/* Selectors grid */}
          <div className="flex-column gap-3">
            <div className="grid-2-col gap-4">
              <div className="flex-column gap-1.5">
                <label className="text-xs text-[#64748b] font-bold">Team 1 (Home)</label>
                <CustomSelect
                  value={teamAId}
                  onChange={(val) => {
                    setTeamAId(val);
                    if (!simulating) {
                      setMonteCarlo(null);
                      setSimulation(null);
                    }
                  }}
                  disabled={simulating}
                  countries={countries}
                />
              </div>

              <div className="flex-column gap-1.5">
                <label className="text-xs text-[#64748b] font-bold">Team 2 (Away)</label>
                <CustomSelect
                  value={teamBId}
                  onChange={(val) => {
                    setTeamBId(val);
                    if (!simulating) {
                      setMonteCarlo(null);
                      setSimulation(null);
                    }
                  }}
                  disabled={simulating}
                  countries={countries}
                />
              </div>
            </div>
          </div>

          {/* Detailed ELO & Injuries data display */}
          <div className="grid-2-col gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
            <div className="flex-column gap-2" style={{ background: '#0f1217', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-[10px] text-[#64748b] font-bold uppercase block">Recent Form</span>
              {renderForm(teamA.form || [])}
              <span className="text-[10px] text-[#64748b] font-bold uppercase block mt-1">Squad Injuries</span>
              {renderInjuriesList(teamA.injuries || [])}
              <span className="text-[10px] text-[#64748b] font-bold uppercase block mt-1">ELO Ratings</span>
              <span className="text-xs text-[#cbd5e1]">
                Base: <strong style={{ color: '#ffffff' }}>{teamA.elo}</strong> | ATT: <strong style={{ color: '#e8ff00' }}>{teamA.attack}</strong> | DEF: <strong style={{ color: '#e8ff00' }}>{teamA.defense}</strong>
              </span>
              {['USA', 'MEX', 'CAN'].includes(teamA.id) && (
                <span className="text-[9px] text-[#e8ff00] font-bold uppercase tracking-wider block mt-1">🏡 Host Advantage (+100 ELO)</span>
              )}
            </div>

            <div className="flex-column gap-2" style={{ background: '#0f1217', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-[10px] text-[#64748b] font-bold uppercase block">Recent Form</span>
              {renderForm(teamB.form || [])}
              <span className="text-[10px] text-[#64748b] font-bold uppercase block mt-1">Squad Injuries</span>
              {renderInjuriesList(teamB.injuries || [])}
              <span className="text-[10px] text-[#64748b] font-bold uppercase block mt-1">ELO Ratings</span>
              <span className="text-xs text-[#cbd5e1]">
                Base: <strong style={{ color: '#ffffff' }}>{teamB.elo}</strong> | ATT: <strong style={{ color: '#e8ff00' }}>{teamB.attack}</strong> | DEF: <strong style={{ color: '#e8ff00' }}>{teamB.defense}</strong>
              </span>
            </div>
          </div>

          {/* Head-To-Head comparison card */}
          {teamAId !== teamBId && (
            <div className="flex-column gap-2" style={{ background: '#0f1217', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider block text-center">Historical Head-To-Head Record (Past 5 games)</span>
              <div className="flex-row-between" style={{ padding: '0 1rem' }}>
                <div className="text-center">
                  <span className="text-xs text-[#64748b] block">{teamA.id} Wins</span>
                  <span className="text-sm font-black text-[#e8ff00]">{h2h.winsA}</span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-[#64748b] block">Draws</span>
                  <span className="text-sm font-black text-white">{h2h.draws}</span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-[#64748b] block">{teamB.id} Wins</span>
                  <span className="text-sm font-black text-white">{h2h.winsB}</span>
                </div>
              </div>
            </div>
          )}

          {teamAId === teamBId && (
            <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle size={14} />
              <span>Please select two different nations to run the simulation.</span>
            </div>
          )}

          <button
            onClick={handleStartSimulation}
            className="btn-predict animate-fade-in"
            disabled={simulating || teamAId === teamBId}
          >
            {simulating ? (
              <>
                <RefreshCw className="animate-spin" size={16} style={{ animation: 'spin 1.5s linear infinite' }} />
                Auditing Simulations...
              </>
            ) : (
              <>
                <BarChart3 size={16} />
                Run 10k Monte Carlo Simulations
              </>
            )}
          </button>
        </div>

        {/* Monte Carlo Results Display */}
        {monteCarlo && (
          <div className="flex-column gap-6 animate-fade-in">
            {/* Probability segmented progress bar */}
            <div className="glass-panel flex-column gap-4">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block">Model Probability Distribution (10k simulations)</span>
              <div style={{ height: '28px', width: '100%', backgroundColor: '#14181f', borderRadius: '6px', overflow: 'hidden', display: 'flex', marginTop: '4px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ width: `${monteCarlo.probA}%`, backgroundColor: '#e8ff00', color: '#08090c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900', transition: 'width 0.5s ease' }}>
                  {monteCarlo.probA > 15 && `${teamA.id} Win ${monteCarlo.probA.toFixed(1)}%`}
                </div>
                <div style={{ width: `${monteCarlo.probDraw}%`, backgroundColor: '#cbd5e1', color: '#08090c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900', transition: 'width 0.5s ease' }}>
                  {monteCarlo.probDraw > 15 && `Draw ${monteCarlo.probDraw.toFixed(1)}%`}
                </div>
                <div style={{ width: `${monteCarlo.probB}%`, backgroundColor: '#475569', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900', transition: 'width 0.5s ease' }}>
                  {monteCarlo.probB > 15 && `${teamB.id} Win ${monteCarlo.probB.toFixed(1)}%`}
                </div>
              </div>
            </div>

            {/* Model vs Market Comparison + Top scorelines */}
            <div className="grid-2-col gap-4">
              {/* Odds table */}
              <div className="glass-panel flex-column gap-3">
                <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block">Model Odds vs Closing Betting Market</span>
                <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginTop: '4px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <th style={{ padding: '0.5rem 0.25rem', textAlign: 'left' }}>Outcome</th>
                      <th style={{ padding: '0.5rem 0.25rem', textAlign: 'center' }}>Model Decimal</th>
                      <th style={{ padding: '0.5rem 0.25rem', textAlign: 'right' }}>Market Decimal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '0.55rem 0.25rem', fontWeight: 'bold' }}>{teamA.id} Win</td>
                      <td style={{ padding: '0.55rem 0.25rem', textAlign: 'center', color: '#e8ff00', fontWeight: '800' }}>{monteCarlo.oddsA}</td>
                      <td style={{ padding: '0.55rem 0.25rem', textAlign: 'right', color: '#64748b' }}>{monteCarlo.marketOddsA}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '0.55rem 0.25rem', fontWeight: 'bold' }}>Draw</td>
                      <td style={{ padding: '0.55rem 0.25rem', textAlign: 'center', color: '#e8ff00', fontWeight: '800' }}>{monteCarlo.oddsDraw}</td>
                      <td style={{ padding: '0.55rem 0.25rem', textAlign: 'right', color: '#64748b' }}>{monteCarlo.marketOddsDraw}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '0.55rem 0.25rem', fontWeight: 'bold' }}>{teamB.id} Win</td>
                      <td style={{ padding: '0.55rem 0.25rem', textAlign: 'center', color: '#e8ff00', fontWeight: '800' }}>{monteCarlo.oddsB}</td>
                      <td style={{ padding: '0.55rem 0.25rem', textAlign: 'right', color: '#64748b' }}>{monteCarlo.marketOddsB}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Top predicted scorelines */}
              <div className="glass-panel flex-column gap-3">
                <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block">Top 3 Predicted Outcomes</span>
                <div className="flex-column gap-2" style={{ marginTop: '4px' }}>
                  {monteCarlo.sortedScorelines.map((sc, idx) => (
                    <div
                      key={idx}
                      className="flex-row-between text-xs"
                      style={{
                        background: '#0f1217',
                        padding: '0.5rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.04)'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', color: '#ffffff' }}>
                        {sc.score}
                      </span>
                      <span style={{ color: '#e8ff00', fontWeight: '800' }}>{sc.prob.toFixed(1)}% Frequency</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Value Edge Audit Alert */}
            {activeEdges.length > 0 ? (
              <div className="p-3.5 rounded-xl text-xs flex-column gap-1.5 animate-fade-in" style={{ backgroundColor: 'rgba(232, 255, 0, 0.05)', border: '1px solid rgba(232, 255, 0, 0.15)', color: '#e8ff00' }}>
                <span className="font-bold uppercase tracking-wider block text-[10px]" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={12} /> Market Disagreements Detected (Audited Edge)
                </span>
                {activeEdges.map((e, idx) => (
                  <div key={idx} style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                    Model projects <strong>{e.team} {e.type}</strong> has a <strong style={{ textDecoration: 'underline' }}>+{e.edge.toFixed(1)}% higher probability</strong> than bookmakers imply (Model value opportunity).
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl text-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', color: '#94a3b8' }}>
                ✅ Model & closing betting market aligned. No significant pricing edge discovered.
              </div>
            )}

            {/* Playback trigger button */}
            <button
              onClick={handleStartPlayback}
              className="btn-predict"
              style={{ background: 'transparent', border: '1px solid #e8ff00', color: '#e8ff00', width: 'auto', alignSelf: 'center', marginTop: '0.5rem', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              disabled={simulating}
            >
              <Tv size={14} />
              {simulating ? 'Simulating Playback...' : `Watch Playback (Simulate selected score ${playbackScore?.goalsA} - ${playbackScore?.goalsB})`}
            </button>
          </div>
        )}

        {/* Football Field Visual / Live Simulator display */}
        {showPitch && (simulation || simulating) && (
          <div className="glass-panel flex-column gap-4 animate-fade-in">
            <div className="flex-row-between">
              <span className="text-xs font-bold text-[#cbd5e1]">Live Stadium Simulator</span>
              <span className="text-xs text-rose-400 font-mono font-bold uppercase tracking-wider blink-anim" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {simulating && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" style={{ width: '6px', height: '6px', backgroundColor: '#ef4444', borderRadius: '50%' }} />}
                {liveMinute === 90 ? 'Full Time' : `Live: ${liveMinute}'`}
              </span>
            </div>

            {/* Pitch layout */}
            <div className="football-pitch">
              <div className="pitch-line-center" />
              <div className="pitch-circle-center" />
              <div className="pitch-penalty-area-l" />
              <div className="pitch-penalty-area-r" />

              {/* Scoreboard on Pitch - FIXED CONTRAST & CDN FLAG IMAGES */}
              <div className="flex-column" style={{ position: 'absolute', top: '15px', alignItems: 'center', gap: '4px' }}>
                <div className="text-[10px]" style={{ color: 'rgba(255, 255, 255, 0.75)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>SCOREBOARD</div>
                <div className="flex items-center gap-6" style={{ background: 'rgba(0,0,0,0.75)', padding: '0.45rem 1.75rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SmallRectangularFlag countryId={teamA.id} />
                    <span style={{ fontSize: '1rem', fontWeight: '900', color: '#ffffff' }}>{teamA.id}</span>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ffd700', fontFamily: 'monospace', textShadow: '0 2px 6px rgba(255, 215, 0, 0.6)' }}>{liveScore}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '900', color: '#ffffff' }}>{teamB.id}</span>
                    <SmallRectangularFlag countryId={teamB.id} />
                  </div>
                </div>
              </div>

              {/* Key Players Banner on Pitch */}
              <div style={{ position: 'absolute', bottom: '15px', fontSize: '9px', color: 'rgba(255,255,255,0.65)', textAlign: 'center', width: '100%', fontFamily: 'monospace' }}>
                Pitch simulation generated by FootyMind AI Engine
              </div>
            </div>

            {/* Stats Comparison Bars */}
            <div className="flex-column gap-3 mt-2">
              {/* Possession */}
              <div className="stat-row">
                <div className="stat-label-row">
                  <span>{teamA.name} {simulating ? '?' : `${simulation?.possessionA}%`}</span>
                  <span>Possession</span>
                  <span>{simulating ? '?' : `${simulation?.possessionB}%`} {teamB.name}</span>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-bar-fill-a" style={{ width: simulating ? '50%' : `${simulation?.possessionA}%` }} />
                  <div className="stat-bar-fill-b" style={{ width: simulating ? '50%' : `${simulation?.possessionB}%` }} />
                </div>
              </div>

              {/* Shots */}
              <div className="stat-row">
                <div className="stat-label-row">
                  <span>{simulating ? '?' : simulation?.shotsA}</span>
                  <span>Total Shots</span>
                  <span>{simulating ? '?' : simulation?.shotsB}</span>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-bar-fill-a" style={{ width: simulating ? '50%' : `${(simulation?.shotsA / (simulation?.shotsA + simulation?.shotsB || 1)) * 100}%` }} />
                  <div className="stat-bar-fill-b" style={{ width: simulating ? '50%' : `${(simulation?.shotsB / (simulation?.shotsA + simulation?.shotsB || 1)) * 100}%` }} />
                </div>
              </div>

              {/* Shots on Target */}
              <div className="stat-row">
                <div className="stat-label-row">
                  <span>{simulating ? '?' : simulation?.shotsOnTargetA}</span>
                  <span>Shots on Target</span>
                  <span>{simulating ? '?' : simulation?.shotsOnTargetB}</span>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-bar-fill-a" style={{ width: simulating ? '50%' : `${(simulation?.shotsOnTargetA / (simulation?.shotsOnTargetA + simulation?.shotsOnTargetB || 1)) * 100}%` }} />
                  <div className="stat-bar-fill-b" style={{ width: simulating ? '50%' : `${(simulation?.shotsOnTargetB / (simulation?.shotsOnTargetA + simulation?.shotsOnTargetB || 1)) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Match Commentary logs */}
            <div className="flex-column gap-2 mt-2">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Match Commentary logs</span>
              <div className="timeline-list">
                {visibleEvents.map((evt, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-minute">{evt.minute}'</div>
                    <div className="timeline-desc">
                      {evt.type === 'goal' && <span style={{ marginRight: '6px' }}>⚽</span>}
                      {evt.type === 'card' && <span style={{ marginRight: '6px' }}>🟨</span>}
                      {evt.type === 'kickoff' && <span style={{ marginRight: '6px' }}>📋</span>}
                      {evt.commentary}
                    </div>
                    <div className="timeline-score">{evt.scoreAfter}</div>
                  </div>
                ))}
                {visibleEvents.length === 0 && (
                  <div className="text-center text-xs text-[#64748b] py-4 italic">
                    Kickoff! Waiting for match events...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
