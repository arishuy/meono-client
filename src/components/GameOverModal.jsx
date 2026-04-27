import { useEffect, useState } from 'react';

export default function GameOverModal({ winner, playerName }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (winner) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: ['#E74C3C', '#F1C40F', '#2ECC71', '#3498DB', '#9B59B6', '#E67E22'][
          Math.floor(Math.random() * 6)
        ],
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        size: 6 + Math.random() * 10,
        rotation: Math.random() * 360,
      }));
      setConfetti(pieces);
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <>
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}

      {/* Modal */}
      <div className="modal-overlay">
        <div className="modal-content text-center">
          <span className="text-6xl block mb-4 animate-bounce-in">🏆</span>
          <h2 className="font-heading text-3xl gradient-text mb-3">Game Over!</h2>
          <p className="text-xl font-bold text-white mb-2">{playerName}</p>
          <p className="text-ek-yellow text-lg mb-6">is the last cat standing! 🐱</p>

          <div className="bg-ek-card/50 rounded-xl p-4 mb-6">
            <p className="text-ek-muted text-sm">
              They survived all the Exploding Kittens!
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="btn-yellow w-full text-lg"
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    </>
  );
}
