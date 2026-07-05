import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Play, RefreshCw } from 'lucide-react';
import { answerTrivia, simulateMatch, runMonteCarloSimulation } from '../utils/aiSimulator';
import { HISTORY_WINNERS } from '../utils/worldCupData';

export default function ChatbotView({ countries, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hi! I am **FootyMind AI**, your World Cup assistant. Ask me anything about previous winners, all-time scorers, or type something like **'Predict Spain vs Germany'** to simulate matchups!",
      type: 'text'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  
  // States for mini-simulators running inside chat bubbles
  const [simulatingId, setSimulatingId] = useState(null);
  const [simResults, setSimResults] = useState({});

  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, simulatingId]);

  const handleSend = (textToSend) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    // 1. Add User Message
    const userMsg = { sender: 'user', text: trimmed, type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // 2. Generate AI Answer
    setTimeout(() => {
      const response = answerTrivia(trimmed, countries, HISTORY_WINNERS);
      
      if (response.type === 'prediction_request') {
        // Add prediction proposal message
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: response.answer,
          type: 'prediction_widget',
          teamA: response.teamA,
          teamB: response.teamB,
          widgetId: Date.now() // unique key
        }]);
      } else {
        // Standard text reply
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: response.answer,
          type: 'text'
        }]);
      }
    }, 600);
  };

  // Run the mini-simulation inside the chatbot card
  const runMiniSimulation = (widgetId, teamA, teamB) => {
    setSimulatingId(widgetId);
    
    setTimeout(() => {
      // Run Monte Carlo in the background to get the most likely scoreline
      const mc = runMonteCarloSimulation(teamA, teamB);
      const topScore = mc.sortedScorelines[0].score.split('-').map(Number);

      const result = simulateMatch(teamA, teamB, topScore[0], topScore[1]);
      setSimResults(prev => ({
        ...prev,
        [widgetId]: result
      }));
      setSimulatingId(null);
      
      // Append final match report message
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: `🏁 **Match Finished!**\n\n${teamA.flag} **${teamA.name} ${result.goalsA} - ${result.goalsB} ${teamB.name}** ${teamB.flag}\n\n*Possession:* ${result.possessionA}% - ${result.possessionB}%\n*Shots:* ${result.shotsA} - ${result.shotsB}\n\n*Key Event:* ${result.events[Math.floor(Math.random() * result.events.length)]?.commentary || 'A tightly contested game!' }`,
        type: 'text'
      }]);
    }, 1800);
  };

  const SUGGESTIONS = [
    "Predict Brazil vs France",
    "Who won the 2022 World Cup?",
    "All-time top scorer",
    "Who won the most titles?"
  ];

  return (
    <div className="glass-panel flex-column gap-4" style={{ height: '100%', justifyContent: 'space-between', border: 'none', background: 'transparent' }}>
      <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.85rem' }}>
        <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center' }}>
          <Bot className="text-[#e8ff00]" size={20} />
          <div>
            <span className="font-bold text-white block text-sm">FootyMind Assistant</span>
            <span className="text-[10px] text-[#64748b] font-medium block">Powered by Football AI Model</span>
          </div>
        </div>
        {onClose ? (
          <button
            onClick={onClose}
            className="hover-neon"
            style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', padding: '4px 8px', display: 'flex', alignItems: 'center' }}
          >
            ✕ Close
          </button>
        ) : (
          <span className="text-xs text-[#64748b] font-mono">Agent ID: FM-90</span>
        )}
      </div>

      {/* Chat Messages display */}
      <div className="chat-window" style={{ flexGrow: 1, border: 'none', background: 'transparent' }}>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
              {msg.type === 'text' ? (
                <div style={{ whiteSpace: 'pre-line' }}>
                  {msg.text}
                </div>
              ) : (
                // Prediction Widget Bubble
                <div className="flex-column gap-3" style={{ padding: '0.5rem 0.25rem', width: '260px' }}>
                  <div className="text-xs text-[#64748b] font-bold uppercase tracking-wider">Predictor proposal</div>
                  <div className="flex-row-between" style={{ background: '#141820', padding: '0.65rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', width: '100%', boxSizing: 'border-box' }}>
                    <div className="flex-column" style={{ alignItems: 'center' }}>
                      <span className="text-2xl">{msg.teamA.flag}</span>
                      <span className="text-xs font-bold text-white mt-1">{msg.teamA.id}</span>
                    </div>
                    <span className="text-xs font-bold text-[#64748b] font-mono">VS</span>
                    <div className="flex-column" style={{ alignItems: 'center' }}>
                      <span className="text-2xl">{msg.teamB.flag}</span>
                      <span className="text-xs font-bold text-white mt-1">{msg.teamB.id}</span>
                    </div>
                  </div>

                  {simResults[msg.widgetId] ? (
                    // Display Mini Result
                    <div className="text-center font-bold text-[#e8ff00]" style={{ padding: '0.5rem 0' }}>
                      Final: {simResults[msg.widgetId].goalsA} - {simResults[msg.widgetId].goalsB}
                    </div>
                  ) : (
                    // Launch button
                    <button
                      onClick={() => runMiniSimulation(msg.widgetId, msg.teamA, msg.teamB)}
                      className="btn-predict py-2 text-xs"
                      disabled={simulatingId === msg.widgetId}
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      {simulatingId === msg.widgetId ? (
                        <>
                          <RefreshCw className="animate-spin" size={12} style={{ animation: 'spin 1.5s linear infinite' }} />
                          Simulating...
                        </>
                      ) : (
                        <>
                          <Play size={12} />
                          Simulate Score
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestion tags */}
      {messages.length === 1 && (
        <div className="flex-column gap-2" style={{ padding: '0 0.5rem' }}>
          <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider">Try asking:</span>
          <div className="flex" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="text-xs px-3.5 py-2 rounded-xl text-[#94a3b8] hover:text-[#e8ff00] hover:border-[#e8ff00]/30 transition"
                style={{ backgroundColor: '#0f1217', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input container */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputVal);
        }}
        className="chat-input-container"
        style={{ borderRadius: '14px', background: '#0b0d12', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask about World Cup history or predict a match (e.g. Predict Argentina vs Spain)..."
          className="chat-input"
        />
        <button
          type="submit"
          className="btn-predict shrink-0"
          style={{ width: '44px', height: '44px', padding: 0, borderRadius: '12px' }}
          disabled={!inputVal.trim()}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
