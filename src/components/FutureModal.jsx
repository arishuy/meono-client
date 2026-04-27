import { useGame } from '../context/GameContext';
import Card from './Card';

export default function FutureModal() {
  const { showFutureCards, dispatch } = useGame();

  if (!showFutureCards) return null;

  return (
    <div className="modal-overlay" onClick={() => dispatch({ type: 'SET_FUTURE_CARDS', payload: null })}>
      <div className="modal-content max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <span className="text-5xl block mb-3 animate-bounce-in">🔮</span>
          <h2 className="font-heading text-2xl text-ek-purple mb-2">The Future...</h2>
          <p className="text-ek-muted text-sm">Top 3 cards of the draw pile:</p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {showFutureCards.map((card, i) => (
            <div key={i} className="text-center">
              <Card card={card} small={false} disabled />
              <span className="text-xs text-ek-muted mt-2 block">
                {i === 0 ? '1st (Top)' : i === 1 ? '2nd' : '3rd'}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => dispatch({ type: 'SET_FUTURE_CARDS', payload: null })}
          className="btn-secondary w-full"
        >
          Got it! 👀
        </button>

        <div className="mt-3 flex items-center justify-center gap-1">
          <div className="h-1 rounded bg-ek-purple/30 flex-1">
            <div
              className="h-1 rounded bg-ek-purple transition-all duration-100"
              style={{ width: '100%', animation: 'shrink 4s linear forwards' }}
            />
          </div>
        </div>
        <style>{`@keyframes shrink { from { width: 100%; } to { width: 0%; } }`}</style>
      </div>
    </div>
  );
}
