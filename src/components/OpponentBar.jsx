export default function OpponentBar({ player, isCurrentTurn }) {
  const initial = player.name ? player.name.charAt(0).toUpperCase() : '?';

  // Avatar colors based on name hash
  const colors = ['#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22', '#1ABC9C', '#F1C40F'];
  const colorIndex = player.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        isCurrentTurn ? 'turn-active bg-ek-navy/80' : 'bg-ek-card/50'
      } ${!player.alive ? 'opacity-40' : ''}`}
    >
      {/* Avatar */}
      <div
        className="relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0"
        style={{
          background: player.alive ? `linear-gradient(135deg, ${avatarColor}, ${avatarColor}88)` : '#555',
          boxShadow: isCurrentTurn ? `0 0 15px ${avatarColor}66` : 'none',
        }}
      >
        {player.alive ? initial : '💀'}
        {!player.connected && player.alive && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border border-ek-dark" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-sm truncate ${!player.alive ? 'line-through' : ''}`}>
            {player.name}
          </span>
          {player.isHost && (
            <span className="text-xs bg-ek-yellow/20 text-ek-yellow px-1.5 py-0.5 rounded font-medium">
              👑
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          {player.alive ? (
            <>
              <span className="text-xs text-ek-muted">🃏</span>
              <span className="text-xs font-medium text-ek-muted">{player.cardCount} cards</span>
            </>
          ) : (
            <span className="text-xs text-ek-red">Eliminated</span>
          )}
        </div>
      </div>

      {/* Turn indicator */}
      {isCurrentTurn && player.alive && (
        <div className="flex-shrink-0">
          <div className="w-3 h-3 bg-ek-yellow rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
}
