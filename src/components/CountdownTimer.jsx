import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ turnEndTime }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!turnEndTime) {
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((turnEndTime - now) / 1000));
      setTimeLeft(remaining);
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [turnEndTime]);

  if (!turnEndTime) return null;

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 font-mono text-sm font-bold shadow-inner w-[90px] absolute top-16 left-2 ${
      timeLeft <= 10 ? 'bg-ek-red/20 text-ek-red animate-pulse' : 'bg-black/30 text-white/80'
    }`}>
      <span className="text-xs">⏱️</span>
      <span>00:{timeLeft.toString().padStart(2, '0')}</span>
    </div>
  );
}
