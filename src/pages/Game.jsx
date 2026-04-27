import { useGame } from '../context/GameContext';
import CardHand from '../components/CardHand';
import DrawPile from '../components/DrawPile';
import DiscardPile from '../components/DiscardPile';
import OpponentBar from '../components/OpponentBar';
import ActivityLog from '../components/ActivityLog';
import DefuseModal from '../components/DefuseModal';
import FavorModal from '../components/FavorModal';
import FutureModal from '../components/FutureModal';
import StealModal from '../components/StealModal';
import GameOverModal from '../components/GameOverModal';
import CountdownTimer from '../components/CountdownTimer';

export default function Game() {
  const {
    players,
    playerId,
    currentPlayerId,
    isMyTurn,
    turnsRemaining,
    drawPileCount,
    discardPile,
    activityLog,
    showExplosion,
    winner,
    notification,
    pendingAction,
    toasts,
    explodingKittenCount,
    turnEndTime,
  } = useGame();

  const me = players.find((p) => p.id === playerId);
  const opponents = players.filter((p) => p.id !== playerId);
  const currentPlayer = players.find((p) => p.id === currentPlayerId);
  const winnerPlayer = players.find((p) => p.id === winner);

  const riskPct = drawPileCount > 0 ? Math.round((explodingKittenCount / drawPileCount) * 100) : 0;

  return (
    <div className={`game-board min-h-screen flex flex-col relative ${showExplosion ? 'screen-shake' : ''}`}>
      {/* Toast Container */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 w-full max-w-sm px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded-xl text-sm font-medium shadow-xl animate-dropdown whitespace-nowrap ${
              t.type === 'danger'
                ? 'bg-ek-red text-white'
                : t.type === 'success'
                ? 'bg-ek-green text-ek-darker'
                : t.type === 'your_turn'
                ? 'bg-ek-yellow text-ek-darker border-2 border-white'
                : 'bg-ek-card text-white border border-white/10'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>

      {/* Explosion Flash */}
      {showExplosion && <div className="explosion-flash" />}

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-ek-darker/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg">🐱💣</span>
          <span className="font-heading text-sm text-ek-muted">Exploding Kittens</span>
        </div>

        <div className="flex items-center gap-3">
          {isMyTurn ? (
            <div className="flex items-center gap-2 bg-ek-yellow/20 px-3 py-1.5 rounded-full animate-pulse-glow">
              <div className="w-2 h-2 bg-ek-yellow rounded-full" />
              <span className="text-ek-yellow text-sm font-bold">YOUR TURN</span>
              {turnsRemaining > 1 && (
                <span className="text-xs text-ek-orange">({turnsRemaining} turns)</span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ek-card/50">
              <span className="text-sm text-ek-muted">
                {currentPlayer?.name}'s turn
              </span>
            </div>
          )}

          {/* <CountdownTimer turnEndTime={turnEndTime} /> */}
        </div>

        {me && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{me.name}</span>
            {!me.alive && <span className="text-ek-red text-xs">(💀 Eliminated)</span>}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Game Area */}
        <div className="flex-1 flex flex-col">
          <CountdownTimer turnEndTime={turnEndTime} />

          {/* Opponents Row */}
          <div className="px-4 py-3">
            <div className="flex gap-2 flex-wrap justify-center max-w-3xl mx-auto">
              {opponents.map((p) => (
                <div key={p.id} className="flex-shrink-0 w-56">
                  <OpponentBar player={p} isCurrentTurn={p.id === currentPlayerId} />
                </div>
              ))}
            </div>
          </div>

          {/* Center — Draw & Discard */}
          <div className="flex-1 flex items-center justify-center gap-12 px-4">
            <DrawPile />

            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl animate-float">🐱</div>
              <div className="text-xs text-ek-muted text-center flex flex-col gap-1">
                <span>{drawPileCount} cards remaining</span>
                {explodingKittenCount > 0 && drawPileCount > 0 && (
                  <span className="text-ek-red font-bold">
                    💣 {riskPct}% danger
                  </span>
                )}
              </div>
            </div>

            <DiscardPile discardPile={discardPile} />
          </div>

          {/* Notification Banner */}
          {notification && notification.type !== 'defuse' && notification.type !== 'game_over' && (
            <div className="px-4 pb-2">
              <div
                className={`max-w-lg mx-auto text-center py-2 px-4 rounded-xl text-sm font-medium animate-slide-up ${
                  notification.type === 'elimination'
                    ? 'bg-ek-red/20 text-ek-red border border-ek-red/30'
                    : notification.type === 'defuse_success'
                    ? 'bg-ek-green/20 text-ek-green border border-ek-green/30'
                    : 'bg-ek-yellow/20 text-ek-yellow border border-ek-yellow/30'
                }`}
              >
                {notification.message}
              </div>
            </div>
          )}

          {/* Player's Hand */}
          <div className="border-t border-white/5 bg-ek-darker/30 backdrop-blur-sm py-3">
            {me?.alive ? (
              <CardHand />
            ) : (
              <div className="text-center py-8 text-ek-muted">
                <span className="text-3xl block mb-2">💀</span>
                <p className="font-medium">You've been eliminated. Spectating...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar — Activity Log */}
        <div className="w-72 border-l border-white/5 bg-ek-darker/30 p-3 hidden lg:block">
          <ActivityLog logs={activityLog} />

          {/* Game info */}
          <div className="mt-4 bg-ek-card/30 rounded-xl p-3">
            <h4 className="text-xs font-bold text-ek-muted uppercase tracking-wider mb-2">ℹ️ Info</h4>
            <div className="space-y-1.5 text-xs text-ek-muted">
              <div className="flex justify-between">
                <span>Draw Pile</span>
                <span className="text-white font-medium">{drawPileCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Players Alive</span>
                <span className="text-ek-green font-medium">
                  {players.filter((p) => p.alive).length}/{players.length}
                </span>
              </div>
              {turnsRemaining > 1 && (
                <div className="flex justify-between">
                  <span>Turns Left</span>
                  <span className="text-ek-orange font-medium">{turnsRemaining}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DefuseModal />
      <FavorModal />
      <FutureModal />
      <StealModal />
      <GameOverModal winner={winner} playerName={winnerPlayer?.name} />
    </div>
  );
}
