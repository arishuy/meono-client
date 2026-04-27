import { CARD_META } from '../data/cardMeta';

export default function Card({ card, onClick, disabled, small, faceDown, className = '' }) {
  const meta = CARD_META[card?.type] || {};

  if (faceDown) {
    return (
      <div
        className={`card ${className}`}
        style={{
          width: small ? 60 : 100,
          height: small ? 84 : 140,
          background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 50%, #1a1a2e 100%)',
          border: '2px solid rgba(231, 76, 60, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
        }}
      >
        <span className="text-2xl">🐱</span>
        <div
          style={{
            position: 'absolute',
            inset: 6,
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 8,
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`card ${disabled ? 'card-disabled' : ''} ${className}`}
      onClick={!disabled ? onClick : undefined}
      style={{
        width: small ? 60 : 100,
        height: small ? 84 : 140,
        background: `linear-gradient(160deg, ${meta.bgColor || '#2d2d44'} 0%, #1a1a2e 100%)`,
        border: `2px solid ${meta.borderColor || '#444'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: small ? 2 : 6,
        padding: small ? 4 : 8,
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shine effect */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: -20,
          width: 60,
          height: 60,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <span style={{ fontSize: small ? 20 : 32, lineHeight: 1 }}>{meta.emoji || '?'}</span>

      <span
        className="font-card text-center leading-tight"
        style={{
          fontSize: small ? 7 : 11,
          color: meta.color || '#fff',
          textShadow: `0 0 10px ${meta.color}44`,
        }}
      >
        {meta.name || card?.type}
      </span>

      {!small && (
        <span
          className="text-center leading-tight opacity-60"
          style={{
            fontSize: 7,
            color: '#ccc',
            padding: '0 4px',
          }}
        >
          {meta.description}
        </span>
      )}

      {/* Inner border */}
      <div
        style={{
          position: 'absolute',
          inset: 4,
          border: `1px solid ${meta.color || '#fff'}22`,
          borderRadius: 8,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
