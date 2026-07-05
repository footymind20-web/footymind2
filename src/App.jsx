import React, { useState } from 'react';
import { COUNTRIES } from './utils/worldCupData';
import DashboardView from './components/DashboardView';
import ChatbotView from './components/ChatbotView';
import StatsView from './components/StatsView';
import FixturesView from './components/FixturesView';
import StandingsView from './components/StandingsView';
import BracketView from './components/BracketView';
import { Bot } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedHomeId, setSelectedHomeId] = useState('ARG');
  const [selectedAwayId, setSelectedAwayId] = useState('FRA');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const onSelectMatchup = (homeId, awayId) => {
    setSelectedHomeId(homeId);
    setSelectedAwayId(awayId);
  };

  return (
    <div className="app-container">
      {/* Top Header Bar */}
      <header className="header-bar" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
        <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', justifySelf: 'start' }}>
          {/* Geometric Monogram [ F // M ] */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: '900',
            background: '#10141b',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6), 0 0 8px rgba(232, 255, 0, 0.05)',
            letterSpacing: '-0.75px',
            flexShrink: 0
          }}>
            <span style={{ color: '#ffffff' }}>F</span>
            <span style={{ color: '#e8ff00', margin: '0 0.5px', fontWeight: '900', opacity: 0.95 }}>//</span>
            <span style={{ color: '#ffffff' }}>M</span>
          </div>
          <div className="flex-column">
            <span className="font-extrabold text-base tracking-tight text-white leading-none">
              Footy<span style={{ color: '#e8ff00' }}>Mind</span>
            </span>
            <span className="text-[9px] text-[#64748b] font-bold mt-0.5 tracking-wider uppercase leading-none">AI Analytics & Explorer</span>
          </div>
        </div>

        {/* AI Assistant Centered */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="btn-predict"
          style={{
            justifySelf: 'center',
            padding: '0.4rem 0.85rem',
            fontSize: '11px',
            width: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(232, 255, 0, 0.08)',
            border: '1px solid rgba(232, 255, 0, 0.25)',
            color: '#e8ff00',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'all 0.2s',
            fontWeight: 'bold',
            boxShadow: '0 0 12px rgba(232, 255, 0, 0.1)'
          }}
        >
          <Bot size={13} /> AI Assistant
        </button>
        
        {/* System metadata aligned to the right */}
        <div className="flex items-center gap-4 text-xs text-[#64748b]" style={{ display: 'flex', gap: '16px', alignItems: 'center', justifySelf: 'end' }}>
          <span>System Active</span>
          <span style={{ color: '#e8ff00', fontWeight: 'bold' }}>FIFA World Cup 2026</span>
        </div>
      </header>

      {/* Main Dashboard Stack */}
      <main className="main-content">
        {/* Massive Geometric Title & Description */}
        <div className="flex-column gap-2" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '950', color: '#ffffff', letterSpacing: '-0.03em', lineHeight: '1.05', margin: 0, textTransform: 'uppercase' }}>
            THE PROBABILITY ENGINE,<br />
            <span style={{ color: '#e8ff00' }}>AUDITED</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6', margin: '0.75rem 0 0 0', maxWidth: '750px' }}>
            An Elo led hybrid, venue and host aware, run across 100k tournament simulations and benchmarked against the closing betting market. Every score here survived a leak-free backtest. <strong style={{ color: '#ffffff' }}>Disagreement with the pundits is the content, not a bug.</strong>
          </p>
        </div>

        {/* Horizontal Navigation Tab Bar */}
        <div className="horizontal-tabs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`tab-pill ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            Match Predictor
          </button>
          <button
            onClick={() => setActiveTab('fixtures')}
            className={`tab-pill ${activeTab === 'fixtures' ? 'active' : ''}`}
          >
            Fixtures
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`tab-pill ${activeTab === 'standings' ? 'active' : ''}`}
          >
            Standings
          </button>
          <button
            onClick={() => setActiveTab('bracket')}
            className={`tab-pill ${activeTab === 'bracket' ? 'active' : ''}`}
          >
            Knockout Bracket
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`tab-pill ${activeTab === 'stats' ? 'active' : ''}`}
          >
            Stats Hub
          </button>
        </div>

        {/* Technical Metrics Ribbon */}
        <div className="metric-ribbon" style={{ marginTop: '0.25rem', marginBottom: '0.25rem' }}>
          <div className="metric-card">
            <span className="metric-label">Backtest Accuracy</span>
            <span className="metric-value" style={{ color: '#e8ff00' }}>59.20%</span>
            <span className="metric-sub">audited on 904 historical matches</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Skill Score (RPS)</span>
            <span className="metric-value" style={{ color: '#e8ff00' }}>0.1642</span>
            <span className="metric-sub">optimized lower (range 0.15-0.18)</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Model Champion</span>
            <span className="metric-value">🇪🇸 Spain</span>
            <span className="metric-sub">21.28% of 100k simulations</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Simulations Depth</span>
            <span className="metric-value">100,000</span>
            <span className="metric-sub">runs per selected matchup</span>
          </div>
        </div>

        {/* Active Tab Component */}
        <div style={{ marginTop: '0.5rem' }}>
          {activeTab === 'dashboard' ? (
            <DashboardView countries={COUNTRIES} defaultTeamAId={selectedHomeId} defaultTeamBId={selectedAwayId} />
          ) : activeTab === 'fixtures' ? (
            <FixturesView countries={COUNTRIES} onSelectMatchup={onSelectMatchup} navigateToPredictor={() => setActiveTab('dashboard')} />
          ) : activeTab === 'standings' ? (
            <StandingsView countries={COUNTRIES} />
          ) : activeTab === 'bracket' ? (
            <BracketView countries={COUNTRIES} />
          ) : (
            <StatsView countries={COUNTRIES} />
          )}
        </div>
      </main>

      {/* Slide-out AI Assistant Drawer */}
      {isChatOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setIsChatOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              animation: 'fadeIn 0.2s ease-in-out'
            }}
          />
          {/* Right side drawer panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '420px',
              maxWidth: '90vw',
              height: '100vh',
              background: 'linear-gradient(135deg, #0e121a 0%, #07090d 100%)',
              borderLeft: '1px solid rgba(232, 255, 0, 0.15)',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.6)',
              zIndex: 10000,
              padding: '1.25rem',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <ChatbotView countries={COUNTRIES} onClose={() => setIsChatOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}
