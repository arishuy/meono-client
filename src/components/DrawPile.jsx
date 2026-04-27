import { useGame } from '../context/GameContext';

export default function DrawPile() {
  const { drawPileCount, isMyTurn, drawFromPile, pendingAction } = useGame();
  const canDraw = isMyTurn && !pendingAction;

  const handleDraw = async () => {
    if (!canDraw) return;

    try {
      await drawFromPile();
    } catch (err) {
      console.error('Draw error:', err.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={handleDraw}
        className={`draw-pile relative ${canDraw ? 'active cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
        style={{
          width: 110,
          height: 154,
        }}
      >
        {/* Stacked card effect */}
        {[...Array(Math.min(3, drawPileCount))].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-xl"
            style={{
              width: 110,
              height: 154,
              top: -i * 2,
              left: i * 1,
              background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 50%, #1a1a2e 100%)',
              border: '2px solid rgba(231, 76, 60, 0.4)',
              zIndex: 3 - i,
              boxShadow: i === 0 ? '0 8px 25px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {i === 0 && (
              <>
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-1">
                  <span className="text-3xl">🐱</span>
                  <span className="font-card text-xs text-ek-yellow opacity-80 tracking-wider">
                    DRAW
                  </span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: 6,
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 8,
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}
          </div>
        ))}

        {/* Card count badge */}
        <div className="absolute -top-2 -right-2 z-10 bg-ek-navy border-2 border-ek-red rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-sm font-bold text-ek-red">{drawPileCount}</span>
        </div>
      </div>

      <span className="text-ek-muted text-xs font-medium tracking-wide uppercase">
        Draw Pile
      </span>
    </div>
  );
}
