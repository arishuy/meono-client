import { useGame } from '../context/GameContext';
import Card from './Card';

export default function FavorModal() {
  const { pendingAction, playerId, myHand, favorResponse, players } = useGame();

  if (!pendingAction || pendingAction.type !== 'favor_give' || pendingAction.targetId !== playerId) {
    return null;
  }

  const requester = players.find((p) => p.id === pendingAction.requesterId);

  const handleGiveCard = async (cardId) => {
    try {
      await favorResponse(cardId);
    } catch (err) {
      console.error('Favor response error:', err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-lg">
        <div className="text-center mb-6">
          <span className="text-5xl block mb-3 animate-bounce-in">🙏</span>
          <h2 className="font-heading text-2xl text-ek-orange mb-2">Favor Requested!</h2>
          <p className="text-ek-muted text-sm">
            <span className="text-white font-bold">{requester?.name || 'Someone'}</span> is asking for a card. Choose one to give:
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4 max-h-60 overflow-y-auto p-2">
          {myHand.map((card) => (
            <div key={card.id} className="cursor-pointer" onClick={() => handleGiveCard(card.id)}>
              <Card card={card} small />
            </div>
          ))}
        </div>

        <p className="text-xs text-ek-muted text-center">Click a card to give it away</p>
      </div>
    </div>
  );
}
