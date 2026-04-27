import { useGame } from '../context/GameContext';

export default function StealModal() {
  const { pendingAction, playerId, players, stealTarget } = useGame();

  // Show only if this player needs to choose a steal target
  if (!pendingAction || pendingAction.type !== 'steal_choose' || pendingAction.playerId !== playerId) {
    return null;
  }

  const alivePlayers = players.filter((p) => p.alive && p.id !== playerId && p.cardCount > 0);

  const handleSteal = async (targetId) => {
    try {
      await stealTarget(targetId);
    } catch (err) {
      console.error('Steal error:', err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="text-center mb-6">
          <span className="text-5xl block mb-3 animate-bounce-in">🐱</span>
          <h2 className="font-heading text-2xl text-ek-yellow mb-2">Steal a Card!</h2>
          <p className="text-ek-muted text-sm">Choose a player to steal a random card from:</p>
        </div>

        <div className="space-y-2">
          {alivePlayers.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSteal(p.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-ek-card hover:bg-ek-card-hover border border-white/10 hover:border-ek-yellow/40 transition-all"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                style={{
                  background: 'linear-gradient(135deg, #F1C40F, #D4A90A)',
                  color: '#1a1a2e',
                }}
              >
                {p.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium flex-1 text-left">{p.name}</span>
              <span className="text-xs text-ek-muted">🃏 {p.cardCount} cards</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
