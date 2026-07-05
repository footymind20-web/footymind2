import React, { useState } from 'react';
import { Award, Calendar, HelpCircle, Trophy, CheckCircle, XCircle, RotateCcw, Shield } from 'lucide-react';
import { HISTORY_WINNERS, WORLD_CUP_RECORDS } from '../utils/worldCupData';

const CURRENT_2026_SCORERS = [
  { rank: 1, name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷', value: 6, sub: '3 matches played' },
  { rank: 1, name: 'Kylian Mbappé', country: 'France', flag: '🇫🇷', value: 6, sub: '4 matches played' },
  { rank: 3, name: 'Erling Haaland', country: 'Norway', flag: '🇳🇴', value: 5, sub: '3 matches played' },
  { rank: 3, name: 'Harry Kane', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', value: 5, sub: '3 matches played' },
  { rank: 5, name: 'Ousmane Dembélé', country: 'France', flag: '🇫🇷', value: 4, sub: '4 matches played' },
  { rank: 5, name: 'Vinícius Júnior', country: 'Brazil', flag: '🇧🇷', value: 4, sub: '3 matches played' }
];

const CURRENT_2026_ASSISTS = [
  { rank: 1, name: 'Michael Olise', country: 'France', flag: '🇫🇷', value: 4, sub: '4 matches played' },
  { rank: 2, name: 'Alexander Isak', country: 'Sweden', flag: '🇸🇪', value: 3, sub: '3 matches played' },
  { rank: 2, name: 'Bruno Guimarães', country: 'Brazil', flag: '🇧🇷', value: 3, sub: '3 matches played' },
  { rank: 4, name: 'Brahim Díaz', country: 'Morocco', flag: '🇲🇦', value: 2, sub: '4 matches played' },
  { rank: 4, name: 'Breel Embolo', country: 'Switzerland', flag: '🇨🇭', value: 2, sub: '3 matches played' }
];

const CURRENT_2026_CLEANSHEETS = [
  { rank: 1, name: 'Luis Malagón', country: 'Mexico', flag: '🇲🇽', value: 3, sub: '3 matches played' },
  { rank: 1, name: 'Mike Maignan', country: 'France', flag: '🇫🇷', value: 3, sub: '4 matches played' },
  { rank: 1, name: 'Unai Simón', country: 'Spain', flag: '🇪🇸', value: 3, sub: '3 matches played' },
  { rank: 4, name: 'Vozinha', country: 'Cape Verde', flag: '🇨🇻', value: 2, sub: '4 matches played' },
  { rank: 4, name: 'Jordan Pickford', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', value: 2, sub: '3 matches played' }
];

const ALL_TIME_SCORERS = [
  { rank: 1, name: 'Miroslav Klose', country: 'Germany', flag: '🇩🇪', value: 16, sub: '2002–2014' },
  { rank: 2, name: 'Ronaldo Nazário', country: 'Brazil', flag: '🇧🇷', value: 15, sub: '1998–2006' },
  { rank: 3, name: 'Gerd Müller', country: 'Germany', flag: '🇩🇪', value: 14, sub: '1970–1974' },
  { rank: 4, name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷', value: 13, sub: '2006–2022' },
  { rank: 5, name: 'Just Fontaine', country: 'France', flag: '🇫🇷', value: 13, sub: '1958' }
];

const TIMELINE_EVENTS = [
  { year: 2022, host: 'Qatar', winner: 'Argentina', runnerUp: 'France', score: '3-3 (4-2 pens)', highlight: 'Lionel Messi led Argentina to victory in one of the most dramatic finals in history, scoring twice and winning the Golden Ball.' },
  { year: 2018, host: 'Russia', winner: 'France', runnerUp: 'Croatia', score: '4-2', highlight: 'Kylian Mbappé burst onto the global stage as a teenager, scoring in the final to secure France\'s second star.' },
  { year: 2014, host: 'Brazil', winner: 'Germany', runnerUp: 'Argentina', score: '1-0 (aet)', highlight: 'Mario Götze scored a brilliant extra-time volley as Germany became the first European team to win in South America.' },
  { year: 2010, host: 'South Africa', winner: 'Spain', runnerUp: 'Netherlands', score: '1-0 (aet)', highlight: 'Andrés Iniesta scored the 116th-minute winner to secure Spain\'s first-ever World Cup title, capping their Tiki-Taka era.' },
  { year: 2006, host: 'Germany', winner: 'Italy', runnerUp: 'France', score: '1-1 (5-3 pens)', highlight: 'A defensive masterclass led by Fabio Cannavaro secured Italy\'s 4th title, in a final famous for Zidane\'s headbutt.' },
  { year: 2002, host: 'South Korea & Japan', winner: 'Brazil', runnerUp: 'Germany', score: '2-0', highlight: 'Ronaldo Nazário completed his redemption story, scoring twice in the final to win Brazil\'s record 5th title.' }
];

const QUIZ_QUESTIONS = [
  {
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Italy", "Brazil", "Argentina"],
    answer: "Brazil",
    explanation: "Brazil has won a record 5 World Cup titles (1958, 1962, 1970, 1994, 2002)."
  },
  {
    question: "Who is the all-time top goalscorer in FIFA World Cup history?",
    options: ["Pelé", "Miroslav Klose", "Ronaldo Nazário", "Lionel Messi"],
    answer: "Miroslav Klose",
    explanation: "Germany's Miroslav Klose scored 16 goals across four World Cup tournaments (2002–2014)."
  },
  {
    question: "Who holds the record for the most goals scored in a single World Cup tournament?",
    options: ["Kylian Mbappé", "Gerd Müller", "Just Fontaine", "Pelé"],
    answer: "Just Fontaine",
    explanation: "France's Just Fontaine scored an incredible 13 goals in the 1958 World Cup in Sweden."
  }
];

export default function StatsView({ countries }) {
  const [subTab, setSubTab] = useState('leaders-2026');
  const [selectedTimelineIdx, setSelectedTimelineIdx] = useState(0);

  // Quiz States
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeTimeline = TIMELINE_EVENTS[selectedTimelineIdx];

  const handleQuizAnswer = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
    if (option === QUIZ_QUESTIONS[quizIdx].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    if (quizIdx < QUIZ_QUESTIONS.length - 1) {
      setQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizIdx(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="flex-column gap-6">
      {/* Sub Tabs Navigation - Segmented Control Bar */}
      <div style={{
        display: 'inline-flex',
        alignSelf: 'flex-start',
        background: '#0f1217',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '12px',
        padding: '4px',
        gap: '4px',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)'
      }}>
        <button
          onClick={() => setSubTab('leaders-2026')}
          className="px-4 py-2 rounded-lg text-xs font-bold transition-all"
          style={{
            background: subTab === 'leaders-2026' ? '#e8ff00' : 'transparent',
            color: subTab === 'leaders-2026' ? '#08090c' : '#94a3b8',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            fontWeight: subTab === 'leaders-2026' ? '900' : 'bold',
            boxShadow: subTab === 'leaders-2026' ? '0 2px 8px rgba(232, 255, 0, 0.15)' : 'none'
          }}
        >
          2026 Tournament Leaders
        </button>
        <button
          onClick={() => setSubTab('all-time')}
          className="px-4 py-2 rounded-lg text-xs font-bold transition-all"
          style={{
            background: subTab === 'all-time' ? '#e8ff00' : 'transparent',
            color: subTab === 'all-time' ? '#08090c' : '#94a3b8',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            fontWeight: subTab === 'all-time' ? '900' : 'bold',
            boxShadow: subTab === 'all-time' ? '0 2px 8px rgba(232, 255, 0, 0.15)' : 'none'
          }}
        >
          All-Time Records & History
        </button>
        <button
          onClick={() => setSubTab('quiz')}
          className="px-4 py-2 rounded-lg text-xs font-bold transition-all"
          style={{
            background: subTab === 'quiz' ? '#e8ff00' : 'transparent',
            color: subTab === 'quiz' ? '#08090c' : '#94a3b8',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            fontWeight: subTab === 'quiz' ? '900' : 'bold',
            boxShadow: subTab === 'quiz' ? '0 2px 8px rgba(232, 255, 0, 0.15)' : 'none'
          }}
        >
          World Cup Quiz
        </button>
      </div>

      {/* Tab Content Panels */}
      {subTab === 'leaders-2026' && (
        <div className="flex-column gap-6">
          <div className="grid-3-col gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {/* Top Goals */}
            <div className="glass-panel flex-column gap-4">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={14} className="text-[#e8ff00]" /> Top Scorers (2026 World Cup)
              </span>
              <div className="flex-column gap-3">
                {CURRENT_2026_SCORERS.map((p) => (
                  <div key={p.name} className="flex-row-between" style={{ background: '#0f1217', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="text-[10px] text-[#64748b] font-mono font-bold" style={{ width: '15px' }}>{p.rank}</span>
                      <span className="text-lg">{p.flag}</span>
                      <div className="flex-column">
                        <span className="text-xs font-bold text-white leading-none">{p.name}</span>
                        <span className="text-[9px] text-[#64748b] font-semibold mt-1 leading-none">{p.sub}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#e8ff00]">{p.value} Goals</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Assists */}
            <div className="glass-panel flex-column gap-4">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={14} className="text-[#e8ff00]" /> Top Assists (2026 World Cup)
              </span>
              <div className="flex-column gap-3">
                {CURRENT_2026_ASSISTS.map((p) => (
                  <div key={p.name} className="flex-row-between" style={{ background: '#0f1217', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="text-[10px] text-[#64748b] font-mono font-bold" style={{ width: '15px' }}>{p.rank}</span>
                      <span className="text-lg">{p.flag}</span>
                      <div className="flex-column">
                        <span className="text-xs font-bold text-white leading-none">{p.name}</span>
                        <span className="text-[9px] text-[#64748b] font-semibold mt-1 leading-none">{p.sub}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#e8ff00]">{p.value} Assists</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cleansheets */}
            <div className="glass-panel flex-column gap-4">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={14} className="text-[#e8ff00]" /> Cleansheet Leaders (Goalkeepers)
              </span>
              <div className="flex-column gap-3">
                {CURRENT_2026_CLEANSHEETS.map((p) => (
                  <div key={p.name} className="flex-row-between" style={{ background: '#0f1217', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="text-[10px] text-[#64748b] font-mono font-bold" style={{ width: '15px' }}>{p.rank}</span>
                      <span className="text-lg">{p.flag}</span>
                      <div className="flex-column">
                        <span className="text-xs font-bold text-white leading-none">{p.name}</span>
                        <span className="text-[9px] text-[#64748b] font-semibold mt-1 leading-none">{p.sub}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#e8ff00]">{p.value} Clean Sheets</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'all-time' && (
        <div className="grid-2-col gap-6" style={{ alignItems: 'start' }}>
          {/* Timeline & Past Champions */}
          <div className="flex-column gap-6">
            <div className="glass-panel flex-column gap-4">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block">Interactive Tournament Timeline</span>
              <div className="flex gap-2" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {TIMELINE_EVENTS.map((item, idx) => (
                  <button
                    key={item.year}
                    onClick={() => setSelectedTimelineIdx(idx)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition ${selectedTimelineIdx === idx ? 'bg-[#e8ff00] text-[#08090c] shadow-sm' : 'bg-white/5 text-[#94a3b8] hover:bg-white/8'}`}
                  >
                    {item.year}
                  </button>
                ))}
              </div>

              {/* Selected event details card */}
              <div className="p-4 rounded-xl flex-column gap-3 mt-1" style={{ backgroundColor: '#0f1217', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex-row-between">
                  <span className="text-sm font-black text-white">{activeTimeline.year} World Cup — {activeTimeline.host}</span>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full" style={{ color: '#e8ff00', backgroundColor: 'rgba(232, 255, 0, 0.08)' }}>Final: {activeTimeline.score}</span>
                </div>
                <div className="text-xs text-[#94a3b8]">
                  🏆 Champion: <strong style={{ color: '#e8ff00' }}>{activeTimeline.winner}</strong> | Runner-up: <strong style={{ color: '#ffffff' }}>{activeTimeline.runnerUp}</strong>
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed italic border-l-2 border-[#d4af37] pl-3 mt-1">
                  "{activeTimeline.highlight}"
                </p>
              </div>
            </div>

            {/* Past Champions list */}
            <div className="glass-panel flex-column gap-4">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block">Past Champions Table</span>
              <div className="overflow-x-auto">
                <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', color: '#64748b' }}>Year</th>
                      <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', color: '#64748b' }}>Host</th>
                      <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', color: '#64748b' }}>Champion</th>
                      <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', color: '#64748b' }}>Runner-Up</th>
                      <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: '#64748b' }}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HISTORY_WINNERS.map((h, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '0.75rem 0.5rem', fontWeight: 'bold', color: '#e8ff00' }}>{h.year}</td>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#94a3b8' }}>{h.host}</td>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#ffffff', fontWeight: '700' }}>{h.winner}</td>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#94a3b8' }}>{h.runnerUp}</td>
                        <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'monospace', color: '#ffffff', fontWeight: '700' }}>{h.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: All-Time Records */}
          <div className="flex-column gap-6">
            {/* All-Time Goalscorers */}
            <div className="glass-panel flex-column gap-4">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={14} className="text-[#e8ff00]" /> All-Time Top Goalscorers
              </span>
              <div className="flex-column gap-3">
                {ALL_TIME_SCORERS.map((p) => (
                  <div key={p.name} className="flex-row-between" style={{ background: '#0f1217', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="text-[10px] text-[#64748b] font-mono font-bold" style={{ width: '15px' }}>{p.rank}</span>
                      <span className="text-lg">{p.flag}</span>
                      <div className="flex-column">
                        <span className="text-xs font-bold text-white leading-none">{p.name}</span>
                        <span className="text-[9px] text-[#64748b] font-semibold mt-1 leading-none">{p.sub}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#e8ff00]">{p.value} Goals</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other historic records */}
            <div className="glass-panel flex-column gap-4">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block">World Cup Historic Records</span>
              <div className="flex-column gap-3">
                {Object.entries(WORLD_CUP_RECORDS).map(([key, r]) => (
                  <div key={key} className="p-3.5 rounded-xl flex flex-col gap-1" style={{ backgroundColor: '#0f1217', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '0.85rem' }}>
                    <span className="text-[10px] text-[#64748b] font-bold uppercase">{r.title}</span>
                    <span className="text-sm font-bold text-[#e8ff00] mt-0.5">{r.value}</span>
                    <span className="text-xs text-[#94a3b8]">{r.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'quiz' && (
        <div className="glass-panel flex-column gap-6" style={{ maxWidth: '600px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.85rem' }}>
            <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center' }}>
              <HelpCircle className="text-[#e8ff00]" size={20} />
              <span className="text-sm font-bold text-white">World Cup Trivia Challenge</span>
            </div>
            <span className="text-xs text-[#e8ff00] font-bold font-mono">Score: {score} / {QUIZ_QUESTIONS.length}</span>
          </div>

          {!quizFinished ? (
            <div className="flex-column gap-4">
              <div className="flex-column gap-1">
                <div className="flex-row-between text-[10px] text-[#94a3b8] font-bold uppercase">
                  <span>Question {quizIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round(((quizIdx) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
                </div>
                <div style={{ height: '6px', width: '100%', backgroundColor: '#14181f', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
                  <div style={{ height: '100%', width: `${((quizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`, backgroundColor: '#e8ff00', transition: 'width 0.3s ease' }} />
                </div>
              </div>

              <h3 className="text-base font-black text-white mt-2 leading-relaxed">
                {QUIZ_QUESTIONS[quizIdx].question}
              </h3>

              <div className="flex-column gap-2 mt-2">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt) => {
                  let btnBg = '#0f1217';
                  let btnBorder = 'rgba(255, 255, 255, 0.06)';
                  let btnTextColor = '#cbd5e1';

                  if (showFeedback) {
                    if (opt === QUIZ_QUESTIONS[quizIdx].answer) {
                      btnBg = 'rgba(25, 135, 84, 0.15)';
                      btnBorder = 'rgba(25, 135, 84, 0.35)';
                      btnTextColor = '#5ddc94';
                    } else if (opt === selectedOption) {
                      btnBg = 'rgba(220, 53, 69, 0.15)';
                      btnBorder = 'rgba(220, 53, 69, 0.35)';
                      btnTextColor = '#ff8787';
                    } else {
                      btnTextColor = '#475569';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleQuizAnswer(opt)}
                      disabled={showFeedback}
                      className="px-4 py-3.5 rounded-xl text-left text-xs font-bold transition flex items-center justify-between"
                      style={{
                        backgroundColor: btnBg,
                        border: `1px solid ${btnBorder}`,
                        color: btnTextColor,
                        cursor: showFeedback ? 'default' : 'pointer'
                      }}
                    >
                      <span>{opt}</span>
                      {showFeedback && opt === QUIZ_QUESTIONS[quizIdx].answer && (
                        <CheckCircle size={16} className="text-[#5ddc94] shrink-0" />
                      )}
                      {showFeedback && opt === selectedOption && opt !== QUIZ_QUESTIONS[quizIdx].answer && (
                        <XCircle size={16} className="text-[#ff8787] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className="p-4 rounded-xl flex-column gap-2 mt-3 animate-fade-in" style={{ backgroundColor: '#14181f', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-[10px] text-[#e8ff00] font-bold uppercase tracking-wider block">Explanation Details</span>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    {QUIZ_QUESTIONS[quizIdx].explanation}
                  </p>
                  <button
                    onClick={handleNextQuiz}
                    className="btn-predict py-2.5 mt-2 text-xs"
                    style={{ width: 'auto', alignSelf: 'flex-end', padding: '0.65rem 1.25rem' }}
                  >
                    {quizIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-column items-center text-center py-6 gap-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(232, 255, 0, 0.08)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                <Trophy className="text-[#e8ff00]" size={32} />
              </div>
              <div className="flex-column gap-1">
                <h3 className="text-lg font-black text-white">Quiz Challenge Completed!</h3>
                <span className="text-xs text-[#94a3b8]">Thank you for testing your World Cup knowledge.</span>
              </div>
              <div className="p-4 rounded-2xl text-[#e8ff00] font-black text-2xl mt-2" style={{ padding: '1rem 2rem', borderRadius: '16px', backgroundColor: 'rgba(232, 255, 0, 0.08)', border: '1px solid rgba(232, 255, 0, 0.15)' }}>
                Final Score: {score} / {QUIZ_QUESTIONS.length}
              </div>
              <p className="text-xs text-[#cbd5e1] max-w-sm mt-1">
                {score === QUIZ_QUESTIONS.length ? "🥇 Perfect Score! You are a World Cup mastermind!" : score >= 2 ? "🥈 Well done! You know your tournament history!" : "🥉 Nice attempt! Challenge yourself again to get a perfect score!"}
              </p>
              <button
                onClick={restartQuiz}
                className="btn-predict text-xs gap-2 py-3 mt-4"
                style={{ width: 'auto', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center' }}
              >
                <RotateCcw size={14} /> Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
