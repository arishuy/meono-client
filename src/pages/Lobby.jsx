import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

const EMOJIS = ['🐱', '💣', '🛡️', '⚔️', '🔮', '🌮', '🍉', '🥔', '🌈', '🙏', '🚫', '🔀'];

function FloatingEmoji({ emoji, delay, left, duration }) {
  return (
    <div
      className="floating-emoji"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        fontSize: `${1 + Math.random() * 1.5}rem`,
      }}
    >
      {emoji}
    </div>
  );
}

export default function Lobby() {
  const { connected, createRoom, joinRoom, startGame, roomCode, playerList, playerId } = useGame();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState(null); // null | 'create' | 'join'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Background emojis
  const [emojis] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      delay: Math.random() * 10,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 12,
    }))
  );

  const isHost = playerList.some((p) => p.id === playerId && p.isHost);

  const handleCreate = async () => {
    if (!name.trim()) return setError('Enter your name!');
    setError('');
    setLoading(true);
    try {
      await createRoom(name.trim());
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleJoin = async () => {
    if (!name.trim()) return setError('Enter your name!');
    if (!code.trim()) return setError('Enter room code!');
    setError('');
    setLoading(true);
    try {
      await joinRoom(code.trim(), name.trim());
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      await startGame();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // In a room — show waiting room
  if (roomCode) {
    return (
      <div className="lobby-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        {emojis.map((e) => (
          <FloatingEmoji key={e.id} {...e} />
        ))}

        <div className="relative z-10 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <span className="text-5xl block mb-3">🐱💣</span>
            <h1 className="font-heading text-3xl gradient-text mb-1">Waiting Room</h1>
          </div>

          {/* Room Code */}
          <div className="bg-ek-navy/80 backdrop-blur rounded-2xl border border-white/10 p-6 mb-6 shadow-2xl">
            <p className="text-xs text-ek-muted uppercase tracking-wider mb-2 text-center">Room Code</p>
            <div
              onClick={copyCode}
              className="flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span className="font-heading text-4xl tracking-[0.3em] text-ek-yellow group-hover:text-white transition-colors">
                {roomCode}
              </span>
              <span className="text-ek-muted group-hover:text-ek-yellow transition-colors">
                {copied ? '✅' : '📋'}
              </span>
            </div>
            <p className="text-xs text-ek-muted text-center mt-2">
              {copied ? 'Copied!' : 'Click to copy'}
            </p>
          </div>

          {/* Player List */}
          <div className="bg-ek-navy/80 backdrop-blur rounded-2xl border border-white/10 p-6 mb-6 shadow-2xl">
            <h3 className="text-sm font-bold text-ek-muted uppercase tracking-wider mb-4">
              Players ({playerList.length}/5)
            </h3>
            <div className="space-y-2">
              {playerList.map((p, i) => {
                const colors = ['#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22'];
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-ek-card/50 animate-slide-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: colors[i % colors.length] }}
                    >
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium flex-1">{p.name}</span>
                    {p.isHost && (
                      <span className="text-xs bg-ek-yellow/20 text-ek-yellow px-2 py-1 rounded-full">
                        👑 Host
                      </span>
                    )}
                    {p.id === playerId && (
                      <span className="text-xs text-ek-muted">(You)</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="bg-ek-red/20 border border-ek-red/30 rounded-xl px-4 py-3 mb-4 text-center">
              <p className="text-ek-red text-sm">{error}</p>
            </div>
          )}

          {/* Start Button (host only) */}
          {isHost ? (
            <button
              onClick={handleStart}
              disabled={playerList.length < 2 || loading}
              className="btn-yellow w-full text-lg"
            >
              {loading ? '⏳ Starting...' : `🎮 Start Game (${playerList.length} players)`}
            </button>
          ) : (
            <div className="text-center">
              <p className="text-ek-muted text-sm animate-pulse">
                ⏳ Waiting for host to start the game...
              </p>
            </div>
          )}

          {playerList.length < 2 && isHost && (
            <p className="text-xs text-ek-muted text-center mt-3">
              Need at least 2 players to start
            </p>
          )}
        </div>
      </div>
    );
  }

  // Not in a room — show create/join UI
  return (
    <div className="lobby-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {emojis.map((e) => (
        <FloatingEmoji key={e.id} {...e} />
      ))}

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-6xl block mb-4 animate-float">🐱💣</span>
          <h1 className="font-heading text-5xl gradient-text mb-2">EXPLODING</h1>
          <h1 className="font-heading text-5xl gradient-text mb-4">KITTENS</h1>
          <p className="text-ek-muted text-sm">The card game of feline destruction!</p>

          {!connected && (
            <div className="mt-4 bg-ek-red/20 border border-ek-red/30 rounded-xl px-4 py-2">
              <p className="text-ek-red text-xs animate-pulse">⚠️ Connecting to server...</p>
            </div>
          )}
        </div>

        {!mode ? (
          /* Mode Selection */
          <div className="space-y-4">
            <button
              onClick={() => setMode('create')}
              disabled={!connected}
              className="btn-primary w-full text-lg py-4"
            >
              🏠 Create Room
            </button>
            <button
              onClick={() => setMode('join')}
              disabled={!connected}
              className="btn-secondary w-full text-lg py-4"
            >
              🚪 Join Room
            </button>
          </div>
        ) : (
          /* Name + Room Entry */
          <div className="bg-ek-navy/80 backdrop-blur rounded-2xl border border-white/10 p-6 shadow-2xl animate-slide-up">
            <h2 className="font-heading text-xl text-center mb-6 text-ek-yellow">
              {mode === 'create' ? '🏠 Create a Room' : '🚪 Join a Room'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-ek-muted uppercase tracking-wider block mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (mode === 'create' ? handleCreate() : handleJoin())}
                  placeholder="Enter your name..."
                  maxLength={15}
                  className="input-ek"
                  autoFocus
                />
              </div>

              {mode === 'join' && (
                <div>
                  <label className="text-xs text-ek-muted uppercase tracking-wider block mb-1.5">
                    Room Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                    placeholder="E.g. ABC123"
                    maxLength={6}
                    className="input-ek font-mono text-center text-xl tracking-[0.3em]"
                  />
                </div>
              )}

              {error && (
                <div className="bg-ek-red/20 border border-ek-red/30 rounded-xl px-4 py-2">
                  <p className="text-ek-red text-sm text-center">{error}</p>
                </div>
              )}

              <button
                onClick={mode === 'create' ? handleCreate : handleJoin}
                disabled={loading || !connected}
                className="btn-yellow w-full text-lg"
              >
                {loading ? '⏳ Loading...' : mode === 'create' ? '🎮 Create Room' : '🚪 Join Room'}
              </button>

              <button
                onClick={() => { setMode(null); setError(''); }}
                className="w-full text-ek-muted hover:text-white text-sm transition-colors py-2"
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
