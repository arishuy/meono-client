import { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function DefuseModal() {
  const { defuseResponse, drawPileCount, notification } = useGame();
  const [position, setPosition] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  if (!notification || notification.type !== 'defuse') return null;

  const deckSize = notification.deckSize || drawPileCount;

  const handleDefuse = async () => {
    setSubmitting(true);
    try {
      await defuseResponse(position);
    } catch (err) {
      console.error('Defuse error:', err.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="text-center mb-6">
          <span className="text-5xl block mb-3 animate-bounce-in">💣</span>
          <h2 className="font-heading text-2xl text-ek-red mb-2">Exploding Kitten!</h2>
          <p className="text-ek-muted text-sm">You have a Defuse card! Choose where to re-insert the bomb.</p>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-ek-muted mb-2 block">
            Insert position (0 = top, {deckSize} = bottom):
          </label>
          <input
            type="range"
            min={0}
            max={deckSize}
            value={position}
            onChange={(e) => setPosition(parseInt(e.target.value))}
            className="w-full accent-ek-green"
          />
          <div className="flex justify-between mt-1 text-xs text-ek-muted">
            <span>🔝 Top</span>
            <span className="text-ek-yellow font-bold">Position: {position}</span>
            <span>🔻 Bottom</span>
          </div>

          {/* Visual hint */}
          <div className="mt-3 flex items-center justify-center gap-1">
            {[...Array(Math.min(deckSize + 1, 10))].map((_, i) => {
              const isInsertPos = Math.round((position / Math.max(deckSize, 1)) * Math.min(deckSize, 9)) === i;
              return (
                <div
                  key={i}
                  className={`h-8 rounded transition-all duration-200 ${
                    isInsertPos ? 'w-4 bg-ek-red border border-ek-red shadow-lg shadow-ek-red/30' : 'w-2 bg-ek-card'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <button
          onClick={handleDefuse}
          disabled={submitting}
          className="btn-primary w-full text-lg"
        >
          {submitting ? '⏳ Defusing...' : '🛡️ Defuse!'}
        </button>
      </div>
    </div>
  );
}
