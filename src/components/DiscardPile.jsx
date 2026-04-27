import Card from './Card';

export default function DiscardPile({ discardPile }) {
  const topCard = discardPile && discardPile.length > 0 ? discardPile[discardPile.length - 1] : null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative rounded-xl"
        style={{
          width: 110,
          height: 154,
          background: 'rgba(45, 45, 68, 0.4)',
          border: '2px dashed rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {topCard ? (
          <div className="animate-card-deal">
            <Card card={topCard} disabled small={false} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 opacity-30">
            <span className="text-2xl">🃏</span>
            <span className="text-xs text-ek-muted">Empty</span>
          </div>
        )}
      </div>

      <span className="text-ek-muted text-xs font-medium tracking-wide uppercase">
        Discard Pile
      </span>
    </div>
  );
}
