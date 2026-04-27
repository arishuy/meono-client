import { useState } from 'react';
import Card from './Card';
import { useGame } from '../context/GameContext';
import { CAT_TYPES } from '../data/cardMeta';

export default function CardHand() {
  const { myHand, isMyTurn, playCard, pendingAction, players, playerId } = useGame();
  const [selectedFavorTarget, setSelectedFavorTarget] = useState(null);
  const [showTargetSelect, setShowTargetSelect] = useState(null);

  const handleCardClick = async (card) => {
    if (!isMyTurn && card.type !== 'NOPE') return;

    // Favor needs a target selection
    if (card.type === 'FAVOR') {
      setShowTargetSelect({ cardId: card.id, type: 'FAVOR' });
      return;
    }

    // Cat pair needs a target to steal from
    if (CAT_TYPES.includes(card.type)) {
      const hasPair = myHand.filter((c) => c.type === card.type).length >= 2;
      if (!hasPair) return; // Can't play a single cat card
      setShowTargetSelect({ cardId: card.id, type: 'CAT_PAIR' });
      return;
    }

    try {
      await playCard(card.id);
    } catch (err) {
      console.error('Play card error:', err.message);
    }
  };

  const handleTargetSelect = async (targetId) => {
    if (!showTargetSelect) return;

    try {
      await playCard(showTargetSelect.cardId, { targetPlayerId: targetId });
      setShowTargetSelect(null);
    } catch (err) {
      console.error('Play card with target error:', err.message);
    }
  };

  // Sort hand: Defuse first, then action cards, then cat cards
  const sortOrder = {
    DEFUSE: 0,
    NOPE: 1,
    ATTACK: 2,
    SKIP: 3,
    SEE_THE_FUTURE: 4,
    SHUFFLE: 5,
    FAVOR: 6,
    TACO_CAT: 10,
    HAIRY_POTATO_CAT: 11,
    RAINBOW_RALPHING_CAT: 12,
    BEARD_CAT: 13,
    CATTERMELON: 14,
  };

  const sortedHand = [...myHand].sort(
    (a, b) => (sortOrder[a.type] ?? 99) - (sortOrder[b.type] ?? 99)
  );

  // Count duplicates for cat cards
  const catCounts = {};
  myHand.forEach((c) => {
    if (CAT_TYPES.includes(c.type)) {
      catCounts[c.type] = (catCounts[c.type] || 0) + 1;
    }
  });

  const alivePlayers = players.filter(
    (p) => p.alive && p.id !== playerId
  );

  return (
    <div className="relative">
      {/* Target Selection Overlay */}
      {showTargetSelect && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-30">
          <div className="bg-ek-navy/95 backdrop-blur-lg border border-ek-yellow/30 rounded-xl p-4 shadow-2xl animate-slide-up">
            <p className="text-ek-yellow font-bold text-sm mb-3 text-center">
              {showTargetSelect.type === 'FAVOR' ? '🙏 Choose a player to ask:' : '🐱 Choose a player to steal from:'}
            </p>
            <div className="flex gap-2">
              {alivePlayers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleTargetSelect(p.id)}
                  className="px-4 py-2 rounded-lg bg-ek-card hover:bg-ek-card-hover border border-white/10 hover:border-ek-yellow/50 transition-all text-sm font-medium"
                >
                  {p.name}
                </button>
              ))}
              <button
                onClick={() => setShowTargetSelect(null)}
                className="px-3 py-2 rounded-lg bg-ek-red/20 hover:bg-ek-red/40 text-ek-red text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="flex justify-center items-end flex-wrap gap-1 px-4 pb-2 pt-1 group">
        {sortedHand.map((card, index) => {
          const isPair = CAT_TYPES.includes(card.type) && catCounts[card.type] >= 2;
          const canPlay =
            isMyTurn ||
            card.type === 'NOPE' ||
            (pendingAction?.type === 'favor_give' && pendingAction?.targetId === playerId);

          return (
            <div
              key={card.id}
              className="animate-card-deal"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative">
                <Card
                  card={card}
                  onClick={() => handleCardClick(card)}
                  disabled={!canPlay}
                />
                {isPair && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-ek-yellow rounded-full flex items-center justify-center text-ek-dark text-xs font-bold shadow-lg">
                    2
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
