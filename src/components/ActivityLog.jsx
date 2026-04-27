import { useEffect, useRef } from 'react';

export default function ActivityLog({ logs }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-ek-darker/60 backdrop-blur rounded-xl border border-white/5 overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5">
        <h3 className="text-xs font-bold text-ek-muted uppercase tracking-wider">📜 Activity Log</h3>
      </div>

      <div className="activity-log p-2 space-y-1" style={{ maxHeight: 250 }}>
        {logs.length === 0 ? (
          <p className="text-xs text-ek-muted text-center py-4 opacity-50">Waiting for game to start...</p>
        ) : (
          logs.map((log, i) => {
            let bgColor = 'bg-transparent';
            if (log.message.includes('💥') || log.message.includes('💀'))
              bgColor = 'bg-ek-red/10';
            else if (log.message.includes('🛡️') || log.message.includes('🏆'))
              bgColor = 'bg-ek-green/10';
            else if (log.message.includes('⚔️'))
              bgColor = 'bg-ek-orange/10';

            return (
              <div key={i} className={`log-entry ${bgColor}`}>
                <span className="text-white/80">{log.message}</span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
