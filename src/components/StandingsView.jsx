import React, { useState } from 'react';
import { Trophy, ChevronRight, CheckCircle2 } from 'lucide-react';

const STANDINGS_DATA = {
  'A-D': [
    {
      group: 'Group A',
      teams: [
        { pos: 1, id: 'MEX', name: 'Mexico', p: 3, w: 3, d: 0, l: 0, gd: 6, pts: 9, status: 'qualified' },
        { pos: 2, id: 'RSA', name: 'South Africa', p: 3, w: 1, d: 1, l: 1, gd: -1, pts: 4, status: 'qualified' },
        { pos: 3, id: 'KOR', name: 'South Korea', p: 3, w: 1, d: 0, l: 2, gd: -1, pts: 3, status: 'eliminated' },
        { pos: 4, id: 'CZE', name: 'Czechia', p: 3, w: 0, d: 1, l: 2, gd: -4, pts: 1, status: 'eliminated' }
      ]
    },
    {
      group: 'Group B',
      teams: [
        { pos: 1, id: 'SUI', name: 'Switzerland', p: 3, w: 2, d: 1, l: 0, gd: 4, pts: 7, status: 'qualified' },
        { pos: 2, id: 'CAN', name: 'Canada', p: 3, w: 1, d: 1, l: 1, gd: 5, pts: 4, status: 'qualified' },
        { pos: 3, id: 'BIH', name: 'Bosnia', p: 3, w: 1, d: 1, l: 1, gd: -1, pts: 4, status: 'qualified_3rd' },
        { pos: 4, id: 'QAT', name: 'Qatar', p: 3, w: 0, d: 1, l: 2, gd: -8, pts: 1, status: 'eliminated' }
      ]
    },
    {
      group: 'Group C',
      teams: [
        { pos: 1, id: 'BRA', name: 'Brazil', p: 3, w: 2, d: 1, l: 0, gd: 6, pts: 7, status: 'qualified' },
        { pos: 2, id: 'MAR', name: 'Morocco', p: 3, w: 2, d: 1, l: 0, gd: 3, pts: 7, status: 'qualified' },
        { pos: 3, id: 'SCO', name: 'Scotland', p: 3, w: 1, d: 0, l: 2, gd: -3, pts: 3, status: 'eliminated' },
        { pos: 4, id: 'HAI', name: 'Haiti', p: 3, w: 0, d: 0, l: 3, gd: -6, pts: 0, status: 'eliminated' }
      ]
    },
    {
      group: 'Group D',
      teams: [
        { pos: 1, id: 'USA', name: 'United States', p: 3, w: 2, d: 0, l: 1, gd: 4, pts: 6, status: 'qualified' },
        { pos: 2, id: 'AUS', name: 'Australia', p: 3, w: 1, d: 1, l: 1, gd: 0, pts: 4, status: 'qualified' },
        { pos: 3, id: 'PAR', name: 'Paraguay', p: 3, w: 1, d: 1, l: 1, gd: -2, pts: 4, status: 'qualified_3rd' },
        { pos: 4, id: 'TUR', name: 'Turkey', p: 3, w: 1, d: 0, l: 2, gd: -2, pts: 3, status: 'eliminated' }
      ]
    }
  ],
  'E-H': [
    {
      group: 'Group E',
      teams: [
        { pos: 1, id: 'GER', name: 'Germany', p: 3, w: 2, d: 1, l: 0, gd: 4, pts: 7, status: 'qualified' },
        { pos: 2, id: 'CIV', name: 'Ivory Coast', p: 3, w: 2, d: 0, l: 1, gd: 2, pts: 6, status: 'qualified' },
        { pos: 3, id: 'ECU', name: 'Ecuador', p: 3, w: 1, d: 1, l: 1, gd: 0, pts: 4, status: 'qualified_3rd' },
        { pos: 4, id: 'CUW', name: 'Curaçao', p: 3, w: 0, d: 0, l: 3, gd: -6, pts: 0, status: 'eliminated' }
      ]
    },
    {
      group: 'Group F',
      teams: [
        { pos: 1, id: 'NED', name: 'Netherlands', p: 3, w: 2, d: 1, l: 0, gd: 4, pts: 7, status: 'qualified' },
        { pos: 2, id: 'JPN', name: 'Japan', p: 3, w: 2, d: 0, l: 1, gd: 1, pts: 6, status: 'qualified' },
        { pos: 3, id: 'SWE', name: 'Sweden', p: 3, w: 1, d: 1, l: 1, gd: 0, pts: 4, status: 'qualified_3rd' },
        { pos: 4, id: 'TUN', name: 'Tunisia', p: 3, w: 0, d: 0, l: 3, gd: -5, pts: 0, status: 'eliminated' }
      ]
    },
    {
      group: 'Group G',
      teams: [
        { pos: 1, id: 'BEL', name: 'Belgium', p: 3, w: 2, d: 1, l: 0, gd: 4, pts: 7, status: 'qualified' },
        { pos: 2, id: 'EGY', name: 'Egypt', p: 3, w: 2, d: 0, l: 1, gd: 2, pts: 6, status: 'qualified' },
        { pos: 3, id: 'IRN', name: 'Iran', p: 3, w: 1, d: 0, l: 2, gd: -2, pts: 3, status: 'eliminated' },
        { pos: 4, id: 'NZL', name: 'New Zealand', p: 3, w: 0, d: 1, l: 2, gd: -4, pts: 1, status: 'eliminated' }
      ]
    },
    {
      group: 'Group H',
      teams: [
        { pos: 1, id: 'ESP', name: 'Spain', p: 3, w: 2, d: 1, l: 0, gd: 4, pts: 7, status: 'qualified' },
        { pos: 2, id: 'URU', name: 'Uruguay', p: 3, w: 2, d: 0, l: 1, gd: 2, pts: 6, status: 'qualified' },
        { pos: 3, id: 'CPV', name: 'Cape Verde', p: 3, w: 1, d: 1, l: 1, gd: -1, pts: 4, status: 'qualified_3rd' },
        { pos: 4, id: 'KSA', name: 'Saudi Arabia', p: 3, w: 0, d: 0, l: 3, gd: -5, pts: 0, status: 'eliminated' }
      ]
    }
  ],
  'I-L': [
    {
      group: 'Group I',
      teams: [
        { pos: 1, id: 'FRA', name: 'France', p: 3, w: 2, d: 1, l: 0, gd: 4, pts: 7, status: 'qualified' },
        { pos: 2, id: 'NOR', name: 'Norway', p: 3, w: 2, d: 0, l: 1, gd: 3, pts: 6, status: 'qualified' },
        { pos: 3, id: 'SEN', name: 'Senegal', p: 3, w: 1, d: 1, l: 1, gd: 0, pts: 4, status: 'qualified_3rd' },
        { pos: 4, id: 'IRQ', name: 'Iraq', p: 3, w: 0, d: 0, l: 3, gd: -7, pts: 0, status: 'eliminated' }
      ]
    },
    {
      group: 'Group J',
      teams: [
        { pos: 1, id: 'ARG', name: 'Argentina', p: 3, w: 3, d: 0, l: 0, gd: 5, pts: 9, status: 'qualified' },
        { pos: 2, id: 'AUT', name: 'Austria', p: 3, w: 2, d: 0, l: 1, gd: 1, pts: 6, status: 'qualified' },
        { pos: 3, id: 'ALG', name: 'Algeria', p: 3, w: 1, d: 0, l: 2, gd: -2, pts: 3, status: 'qualified_3rd' },
        { pos: 4, id: 'JOR', name: 'Jordan', p: 3, w: 0, d: 0, l: 3, gd: -4, pts: 0, status: 'eliminated' }
      ]
    },
    {
      group: 'Group K',
      teams: [
        { pos: 1, id: 'COL', name: 'Colombia', p: 3, w: 2, d: 1, l: 0, gd: 3, pts: 7, status: 'qualified' },
        { pos: 2, id: 'POR', name: 'Portugal', p: 3, w: 2, d: 0, l: 1, gd: 2, pts: 6, status: 'qualified' },
        { pos: 3, id: 'COD', name: 'DR Congo', p: 3, w: 1, d: 1, l: 1, gd: -1, pts: 4, status: 'qualified_3rd' },
        { pos: 4, id: 'UZB', name: 'Uzbekistan', p: 3, w: 0, d: 0, l: 3, gd: -4, pts: 0, status: 'eliminated' }
      ]
    },
    {
      group: 'Group L',
      teams: [
        { pos: 1, id: 'ENG', name: 'England', p: 3, w: 2, d: 1, l: 0, gd: 4, pts: 7, status: 'qualified' },
        { pos: 2, id: 'CRO', name: 'Croatia', p: 3, w: 2, d: 0, l: 1, gd: 0, pts: 6, status: 'qualified' },
        { pos: 3, id: 'GHA', name: 'Ghana', p: 3, w: 1, d: 1, l: 1, gd: 0, pts: 4, status: 'qualified_3rd' },
        { pos: 4, id: 'PAN', name: 'Panama', p: 3, w: 0, d: 0, l: 3, gd: -4, pts: 0, status: 'eliminated' }
      ]
    }
  ]
};

export default function StandingsView({ countries }) {
  const [activeGroupRange, setActiveGroupRange] = useState('A-D');

  const getTeamFlag = (teamId) => {
    const match = countries.find(c => c.id === teamId);
    return match ? match.flag : '🏳️';
  };

  return (
    <div className="flex-column gap-6" style={{ width: '100%' }}>
      {/* Sub tabs to select group ranges */}
      <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
        <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center' }}>
          <Trophy size={16} className="text-[#e8ff00]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Group Stage Standings</span>
        </div>

        <div className="horizontal-tabs" style={{ background: 'rgba(255,255,255,0.02)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
          {['A-D', 'E-H', 'I-L'].map((range) => (
            <button
              key={range}
              onClick={() => setActiveGroupRange(range)}
              className={`tab-pill ${activeGroupRange === range ? 'active' : ''}`}
              style={{ padding: '0.35rem 1rem', fontSize: '10px' }}
            >
              Groups {range}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of group tables */}
      <div className="grid-2-col gap-6">
        {STANDINGS_DATA[activeGroupRange].map((grp) => (
          <div key={grp.group} className="glass-panel flex-column gap-3">
            <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.45rem' }}>
              <span className="text-xs font-black text-white">{grp.group}</span>
              <span className="text-[9px] text-[#64748b] font-mono uppercase">Group Phase Concluded</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#64748b', fontSize: '10px' }}>
                  <th style={{ padding: '0.4rem 0.25rem', textAlign: 'left', width: '25px' }}>#</th>
                  <th style={{ padding: '0.4rem 0.25rem', textAlign: 'left' }}>Team</th>
                  <th style={{ padding: '0.4rem 0.25rem', textAlign: 'center', width: '30px' }}>P</th>
                  <th style={{ padding: '0.4rem 0.25rem', textAlign: 'center', width: '30px' }}>GD</th>
                  <th style={{ padding: '0.4rem 0.25rem', textAlign: 'right', width: '30px' }}>Pts</th>
                </tr>
              </thead>
              <tbody>
                {grp.teams.map((team) => {
                  const isQualified = team.status === 'qualified' || team.status === 'qualified_3rd';
                  return (
                    <tr
                      key={team.id}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.02)',
                        background: isQualified ? 'rgba(232, 255, 0, 0.01)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '0.55rem 0.25rem', fontWeight: 'bold', color: isQualified ? '#e8ff00' : '#64748b' }}>
                        {team.pos}
                      </td>
                      <td style={{ padding: '0.55rem 0.25rem', fontWeight: isQualified ? 'bold' : 'normal', color: '#ffffff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{getTeamFlag(team.id)}</span>
                          <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '120px' }}>{team.name}</span>
                          {team.status === 'qualified' && (
                            <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 rounded font-black uppercase">Q</span>
                          )}
                          {team.status === 'qualified_3rd' && (
                            <span className="text-[8px] bg-[#e8ff00]/10 text-[#e8ff00] border border-[#e8ff00]/20 px-1 rounded font-black uppercase">Q3</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '0.55rem 0.25rem', textAlign: 'center', color: '#cbd5e1' }}>{team.p}</td>
                      <td style={{ padding: '0.55rem 0.25rem', textAlign: 'center', fontWeight: 'bold', color: team.gd > 0 ? '#10b981' : team.gd < 0 ? '#ef4444' : '#64748b' }}>
                        {team.gd > 0 ? `+${team.gd}` : team.gd}
                      </td>
                      <td style={{ padding: '0.55rem 0.25rem', textAlign: 'right', fontWeight: '900', color: isQualified ? '#e8ff00' : '#cbd5e1' }}>
                        {team.pts}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Rules Legend Ribbon */}
      <div className="p-3.5 rounded-xl text-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={12} className="text-[#e8ff00]" />
          Format Qualification Rules:
        </span>
        <div className="flex gap-4" style={{ display: 'flex', gap: '16px', fontSize: '10px' }}>
          <span style={{ color: '#ffffff' }}><strong style={{ color: '#10b981' }}>Q (1st & 2nd)</strong>: Top 2 teams from each of the 12 groups qualify automatically.</span>
          <span style={{ color: '#ffffff' }}><strong style={{ color: '#e8ff00' }}>Q3 (Best 3rd)</strong>: The 8 best-performing third-place teams across all groups advance.</span>
        </div>
      </div>
    </div>
  );
}
