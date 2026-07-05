import React from 'react';
import { GitCommit, Trophy, HelpCircle, ArrowLeftRight } from 'lucide-react';

const LEFT_BRACKET = {
  r32: [
    { id: 'l-m1', home: 'GER', away: 'PAR', homeScore: 1, awayScore: 1, winner: 'PAR' },
    { id: 'l-m2', home: 'FRA', away: 'SWE', homeScore: 3, awayScore: 0, winner: 'FRA' },
    { id: 'l-m3', home: 'RSA', away: 'CAN', homeScore: 0, awayScore: 1, winner: 'CAN' },
    { id: 'l-m4', home: 'NED', away: 'MAR', homeScore: 2, awayScore: 2, winner: 'MAR' },
    { id: 'l-m5', home: 'POR', away: 'CRO', homeScore: 2, awayScore: 1, winner: 'POR' },
    { id: 'l-m6', home: 'ESP', away: 'AUT', homeScore: 3, awayScore: 0, winner: 'ESP' },
    { id: 'l-m7', home: 'USA', away: 'BIH', homeScore: 2, awayScore: 0, winner: 'USA' },
    { id: 'l-m8', home: 'BEL', away: 'SEN', homeScore: 3, awayScore: 2, winner: 'BEL' }
  ],
  r16: [
    { id: 'l-r16-1', homePlaceholder: 'Paraguay', awayPlaceholder: 'France', home: 'PAR', away: 'FRA', homeScore: 0, awayScore: 1, winner: 'FRA' },
    { id: 'l-r16-2', homePlaceholder: 'Canada', awayPlaceholder: 'Morocco', home: 'CAN', away: 'MAR', homeScore: 0, awayScore: 3, winner: 'MAR' },
    { id: 'l-r16-3', homePlaceholder: 'Portugal', awayPlaceholder: 'Spain', home: 'POR', away: 'ESP', homeScore: null, awayScore: null, winner: null },
    { id: 'l-r16-4', homePlaceholder: 'USA', awayPlaceholder: 'Belgium', home: 'USA', away: 'BEL', homeScore: null, awayScore: null, winner: null }
  ],
  qf: [
    { id: 'l-qf-1', homePlaceholder: 'France', awayPlaceholder: 'Morocco', mockHome: 'FRA', mockAway: 'MAR' },
    { id: 'l-qf-2', homePlaceholder: 'Winner R16 3', awayPlaceholder: 'Winner R16 4', mockHome: 'ESP', mockAway: 'USA' }
  ],
  sf: [
    { id: 'l-sf-1', homePlaceholder: 'Winner QF 1', awayPlaceholder: 'Winner QF 2', mockHome: 'FRA', mockAway: 'ESP' }
  ]
};

const RIGHT_BRACKET = {
  r32: [
    { id: 'r-m1', home: 'BRA', away: 'JPN', homeScore: 2, awayScore: 1, winner: 'BRA' },
    { id: 'r-m2', home: 'CIV', away: 'NOR', homeScore: 1, awayScore: 2, winner: 'NOR' },
    { id: 'r-m3', home: 'MEX', away: 'ECU', homeScore: 2, awayScore: 0, winner: 'MEX' },
    { id: 'r-m4', home: 'ENG', away: 'COD', homeScore: 2, awayScore: 1, winner: 'ENG' },
    { id: 'r-m5', home: 'ARG', away: 'CPV', homeScore: 3, awayScore: 2, winner: 'ARG' },
    { id: 'r-m6', home: 'AUS', away: 'EGY', homeScore: 1, awayScore: 1, winner: 'EGY' },
    { id: 'r-m7', home: 'SUI', away: 'ALG', homeScore: 2, awayScore: 0, winner: 'SUI' },
    { id: 'r-m8', home: 'COL', away: 'GHA', homeScore: 1, awayScore: 0, winner: 'COL' }
  ],
  r16: [
    { id: 'r-r16-1', homePlaceholder: 'Brazil', awayPlaceholder: 'Norway', home: 'BRA', away: 'NOR', homeScore: null, awayScore: null, winner: null },
    { id: 'r-r16-2', homePlaceholder: 'Mexico', awayPlaceholder: 'England', home: 'MEX', away: 'ENG', homeScore: null, awayScore: null, winner: null },
    { id: 'r-r16-3', homePlaceholder: 'Argentina', awayPlaceholder: 'Egypt', home: 'ARG', away: 'EGY', homeScore: null, awayScore: null, winner: null },
    { id: 'r-r16-4', homePlaceholder: 'Switzerland', awayPlaceholder: 'Colombia', home: 'SUI', away: 'COL', homeScore: null, awayScore: null, winner: null }
  ],
  qf: [
    { id: 'r-qf-1', homePlaceholder: 'Winner R16 5', awayPlaceholder: 'Winner R16 6', mockHome: 'BRA', mockAway: 'ENG' },
    { id: 'r-qf-2', homePlaceholder: 'Winner R16 7', awayPlaceholder: 'Winner R16 8', mockHome: 'ARG', mockAway: 'COL' }
  ],
  sf: [
    { id: 'r-sf-1', homePlaceholder: 'Winner QF 3', awayPlaceholder: 'Winner QF 4', mockHome: 'ENG', mockAway: 'ARG' }
  ]
};

const GRAND_FINAL = {
  homePlaceholder: 'Winner SF 1',
  awayPlaceholder: 'Winner SF 2',
  mockHome: 'ESP',
  mockAway: 'ARG'
};

const R32_SEEDS = {
  // Left side seadings
  'l-m1': { desc: 'Winner E vs 3rd D' },
  'l-m2': { desc: 'Winner I vs 3rd F' },
  'l-m3': { desc: 'Runner-Up A vs Runner-Up B' },
  'l-m4': { desc: 'Winner F vs Runner-Up C' },
  'l-m5': { desc: 'Runner-Up K vs Runner-Up L' },
  'l-m6': { desc: 'Winner H vs Runner-Up J' },
  'l-m7': { desc: 'Winner D vs 3rd B' },
  'l-m8': { desc: 'Winner G vs 3rd I' },
  // Right side seadings
  'r-m1': { desc: 'Winner C vs Runner-Up F' },
  'r-m2': { desc: 'Runner-Up E vs Runner-Up I' },
  'r-m3': { desc: 'Winner A vs 3rd E' },
  'r-m4': { desc: 'Winner L vs 3rd K' },
  'r-m5': { desc: 'Winner J vs 3rd H' },
  'r-m6': { desc: 'Runner-Up D vs Runner-Up G' },
  'r-m7': { desc: 'Winner B vs 3rd J' },
  'r-m8': { desc: 'Winner K vs 3rd L' }
};

export default function BracketView({ countries }) {
  const getTeamInfo = (id) => {
    return countries.find(c => c.id === id) || { flag: '❓', name: id, elo: 1700 };
  };

  const renderMatch = (match, round = 'r32') => {
    let homeTeam, awayTeam;
    let homeLabel = '';
    let awayLabel = '';
    let homeSub = '';
    let awaySub = '';

    if (round === 'r32') {
      homeTeam = getTeamInfo(match.home);
      awayTeam = getTeamInfo(match.away);
      homeLabel = homeTeam.name;
      awayLabel = awayTeam.name;
      const seedInfo = R32_SEEDS[match.id];
      if (seedInfo) {
        homeSub = seedInfo.desc;
      }
    } else if (round === 'r16') {
      homeTeam = getTeamInfo(match.home);
      awayTeam = getTeamInfo(match.away);
      homeLabel = homeTeam.name || match.homePlaceholder;
      awayLabel = awayTeam.name || match.awayPlaceholder;
      homeSub = 'Round of 16';
    } else {
      homeTeam = getTeamInfo(match.mockHome);
      awayTeam = getTeamInfo(match.mockAway);
      homeLabel = match.homePlaceholder;
      awayLabel = match.awayPlaceholder;
      homeSub = `Proj: ${homeTeam.name}`;
      awaySub = `Proj: ${awayTeam.name}`;
    }

    const isHomeWinner = match.winner === match.home || (round === 'r32' && match.winner === match.home);
    const isAwayWinner = match.winner === match.away || (round === 'r32' && match.winner === match.away);

    return (
      <div
        key={match.id}
        className="bracket-match-box"
        style={{
          background: '#0c0f14',
          border: match.winner ? '1px solid rgba(232, 255, 0, 0.25)' : '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '0.45rem 0.65rem',
          width: '180px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          fontSize: '10px',
          flexShrink: 0
        }}
      >
        {/* Home Row */}
        <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '3px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, overflow: 'hidden' }}>
              <span style={{ fontSize: '12px' }}>{homeTeam.flag || '🏳️'}</span>
              <span style={{ 
                fontWeight: isHomeWinner ? 'bold' : 'normal', 
                color: isHomeWinner ? '#e8ff00' : match.winner ? '#64748b' : '#ffffff', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden' 
              }}>
                {homeLabel}
              </span>
            </div>
            {match.homeScore !== null ? (
              <span style={{ fontSize: '9px', fontWeight: 'black', color: isHomeWinner ? '#e8ff00' : '#64748b', background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: '3px', marginLeft: '6px' }}>
                {match.homeScore}
              </span>
            ) : (
              <span style={{ fontSize: '8px', color: '#64748b', textAlign: 'right', marginLeft: '4px' }}>{homeTeam.elo || '—'}</span>
            )}
          </div>
          {homeSub && (
            <span style={{ fontSize: '8px', color: '#64748b', marginLeft: '16px', fontStyle: 'italic', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{homeSub}</span>
          )}
        </div>

        {/* Away Row */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '1px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, overflow: 'hidden' }}>
              <span style={{ fontSize: '12px' }}>{awayTeam.flag || '🏳️'}</span>
              <span style={{ 
                fontWeight: isAwayWinner ? 'bold' : 'normal', 
                color: isAwayWinner ? '#e8ff00' : match.winner ? '#64748b' : '#ffffff', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden' 
              }}>
                {awayLabel}
              </span>
            </div>
            {match.awayScore !== null ? (
              <span style={{ fontSize: '9px', fontWeight: 'black', color: isAwayWinner ? '#e8ff00' : '#64748b', background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: '3px', marginLeft: '6px' }}>
                {match.awayScore}
              </span>
            ) : (
              <span style={{ fontSize: '8px', color: '#64748b', textAlign: 'right', marginLeft: '4px' }}>{awayTeam.elo || '—'}</span>
            )}
          </div>
          {awaySub && (
            <span style={{ fontSize: '8px', color: '#64748b', marginLeft: '16px', fontStyle: 'italic', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{awaySub}</span>
          )}
        </div>
      </div>
    );
  };

  const finalHome = getTeamInfo(GRAND_FINAL.mockHome);
  const finalAway = getTeamInfo(GRAND_FINAL.mockAway);

  return (
    <div className="flex-column gap-6" style={{ width: '100%' }}>
      {/* Title & Scroll Instruction Banner */}
      <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
        <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center' }}>
          <GitCommit size={16} className="text-[#e8ff00]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Tournament Knockout Bracket</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-[#64748b] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
          <ArrowLeftRight size={10} className="text-[#e8ff00]" />
          <span>Scroll horizontally to view left and right bracket paths</span>
        </div>
      </div>

      {/* Main Single Side-By-Side Bracket Tree Container */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          overflowX: 'auto', 
          padding: '1.5rem 1rem',
          gap: '0.25rem',
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: '16px',
          boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.4)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* ==================== LEFT BRACKET HALF ==================== */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {/* Columns: R32 -> R16 -> QF -> SF */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* QF 1 Tree (Left) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* R16 1 Tree */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {renderMatch(LEFT_BRACKET.r32[0], 'r32')}
                    {renderMatch(LEFT_BRACKET.r32[1], 'r32')}
                  </div>
                  <svg width="24" height="66" viewBox="0 0 24 66">
                    <path d="M 0 15 L 12 15 L 12 51 L 0 51 M 12 33 L 24 33" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
                  </svg>
                  {renderMatch(LEFT_BRACKET.r16[0], 'r16')}
                </div>

                {/* R16 2 Tree */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {renderMatch(LEFT_BRACKET.r32[2], 'r32')}
                    {renderMatch(LEFT_BRACKET.r32[3], 'r32')}
                  </div>
                  <svg width="24" height="66" viewBox="0 0 24 66">
                    <path d="M 0 15 L 12 15 L 12 51 L 0 51 M 12 33 L 24 33" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
                  </svg>
                  {renderMatch(LEFT_BRACKET.r16[1], 'r16')}
                </div>
              </div>
              
              <svg width="24" height="132" viewBox="0 0 24 132">
                <path d="M 0 33 L 12 33 L 12 99 L 0 99 M 12 66 L 24 66" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
              </svg>
              {renderMatch(LEFT_BRACKET.qf[0], 'qf')}
            </div>

            {/* QF 2 Tree (Left) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* R16 3 Tree */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {renderMatch(LEFT_BRACKET.r32[4], 'r32')}
                    {renderMatch(LEFT_BRACKET.r32[5], 'r32')}
                  </div>
                  <svg width="24" height="66" viewBox="0 0 24 66">
                    <path d="M 0 15 L 12 15 L 12 51 L 0 51 M 12 33 L 24 33" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
                  </svg>
                  {renderMatch(LEFT_BRACKET.r16[2], 'r16')}
                </div>

                {/* R16 4 Tree */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {renderMatch(LEFT_BRACKET.r32[6], 'r32')}
                    {renderMatch(LEFT_BRACKET.r32[7], 'r32')}
                  </div>
                  <svg width="24" height="66" viewBox="0 0 24 66">
                    <path d="M 0 15 L 12 15 L 12 51 L 0 51 M 12 33 L 24 33" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
                  </svg>
                  {renderMatch(LEFT_BRACKET.r16[3], 'r16')}
                </div>
              </div>
              
              <svg width="24" height="132" viewBox="0 0 24 132">
                <path d="M 0 33 L 12 33 L 12 99 L 0 99 M 12 66 L 24 66" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
              </svg>
              {renderMatch(LEFT_BRACKET.qf[1], 'qf')}
            </div>
          </div>

          <svg width="24" height="264" viewBox="0 0 24 264">
            <path d="M 0 66 L 12 66 L 12 198 L 0 198 M 12 132 L 24 132" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
          </svg>
          {renderMatch(LEFT_BRACKET.sf[0], 'sf')}
        </div>

        {/* ==================== CENTER GRAND FINAL COLUMN ==================== */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          <svg width="30" height="30" viewBox="0 0 30 30">
            <path d="M 0 15 L 30 15" fill="none" stroke="rgba(232, 255, 0, 0.35)" strokeWidth="2" />
          </svg>

          <div className="flex-column" style={{ alignItems: 'center', gap: '8px', zIndex: 10 }}>
            {/* Center Trophy Visual Element */}
            <div style={{
              background: 'radial-gradient(circle, rgba(232,255,0,0.15) 0%, transparent 70%)',
              padding: '10px',
              borderRadius: '50%'
            }}>
              <Trophy size={48} className="text-[#ffd700]" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.5))' }} />
            </div>

            <span className="text-[9px] text-[#e8ff00] font-black uppercase tracking-widest block text-center">Grand Final</span>
            
            <div
              className="bracket-match-box"
              style={{
                background: 'linear-gradient(135deg, #161c26 0%, #0c0f14 100%)',
                border: '2px solid #e8ff00',
                borderRadius: '12px',
                padding: '0.65rem 0.85rem',
                width: '190px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 16px rgba(232,255,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '11px',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, overflow: 'hidden' }}>
                  <span style={{ fontSize: '14px' }}>{finalHome.flag}</span>
                  <span style={{ fontWeight: 'bold', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{GRAND_FINAL.homePlaceholder}</span>
                </div>
                <span style={{ fontSize: '9px', color: '#94a3b8', fontStyle: 'italic', marginLeft: '4px' }}>Proj: {finalHome.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4px', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, overflow: 'hidden' }}>
                  <span style={{ fontSize: '14px' }}>{finalAway.flag}</span>
                  <span style={{ fontWeight: 'bold', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{GRAND_FINAL.awayPlaceholder}</span>
                </div>
                <span style={{ fontSize: '9px', color: '#94a3b8', fontStyle: 'italic', marginLeft: '4px' }}>Proj: {finalAway.name}</span>
              </div>
            </div>
          </div>

          <svg width="30" height="30" viewBox="0 0 30 30">
            <path d="M 0 15 L 30 15" fill="none" stroke="rgba(232, 255, 0, 0.35)" strokeWidth="2" />
          </svg>
        </div>

        {/* ==================== RIGHT BRACKET HALF ==================== */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {renderMatch(RIGHT_BRACKET.sf[0], 'sf')}
          <svg width="24" height="264" viewBox="0 0 24 264">
            <path d="M 24 66 L 12 66 L 12 198 L 24 198 M 12 132 L 0 132" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
          </svg>

          {/* Columns: SF -> QF -> R16 -> R32 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* QF 3 Tree (Right) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {renderMatch(RIGHT_BRACKET.qf[0], 'qf')}
              <svg width="24" height="132" viewBox="0 0 24 132">
                <path d="M 24 33 L 12 33 L 12 99 L 24 99 M 12 66 L 0 66" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
              </svg>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* R16 5 Tree */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  {renderMatch(RIGHT_BRACKET.r16[0], 'r16')}
                  <svg width="24" height="66" viewBox="0 0 24 66">
                    <path d="M 24 15 L 12 15 L 12 51 L 24 51 M 12 33 L 0 33" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {renderMatch(RIGHT_BRACKET.r32[0], 'r32')}
                    {renderMatch(RIGHT_BRACKET.r32[1], 'r32')}
                  </div>
                </div>

                {/* R16 6 Tree */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  {renderMatch(RIGHT_BRACKET.r16[1], 'r16')}
                  <svg width="24" height="66" viewBox="0 0 24 66">
                    <path d="M 24 15 L 12 15 L 12 51 L 24 51 M 12 33 L 0 33" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {renderMatch(RIGHT_BRACKET.r32[2], 'r32')}
                    {renderMatch(RIGHT_BRACKET.r32[3], 'r32')}
                  </div>
                </div>
              </div>
            </div>

            {/* QF 4 Tree (Right) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {renderMatch(RIGHT_BRACKET.qf[1], 'qf')}
              <svg width="24" height="132" viewBox="0 0 24 132">
                <path d="M 24 33 L 12 33 L 12 99 L 24 99 M 12 66 L 0 66" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
              </svg>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* R16 7 Tree */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  {renderMatch(RIGHT_BRACKET.r16[2], 'r16')}
                  <svg width="24" height="66" viewBox="0 0 24 66">
                    <path d="M 24 15 L 12 15 L 12 51 L 24 51 M 12 33 L 0 33" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {renderMatch(RIGHT_BRACKET.r32[4], 'r32')}
                    {renderMatch(RIGHT_BRACKET.r32[5], 'r32')}
                  </div>
                </div>

                {/* R16 8 Tree */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  {renderMatch(RIGHT_BRACKET.r16[3], 'r16')}
                  <svg width="24" height="66" viewBox="0 0 24 66">
                    <path d="M 24 15 L 12 15 L 12 51 L 24 51 M 12 33 L 0 33" fill="none" stroke="rgba(232, 255, 0, 0.25)" strokeWidth="1.5" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {renderMatch(RIGHT_BRACKET.r32[6], 'r32')}
                    {renderMatch(RIGHT_BRACKET.r32[7], 'r32')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Info Legend Card */}
      <div className="p-3.5 rounded-xl text-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
        <HelpCircle size={14} className="text-[#e8ff00] flex-shrink-0" />
        <span>
          <strong>Audited Bracket Path</strong>: The Round of 32 and completed Round of 16 matchups are fully locked in based on official tournament results. Future rounds represent model simulated projected qualifiers.
        </span>
      </div>
    </div>
  );
}
