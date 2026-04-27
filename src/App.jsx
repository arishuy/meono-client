import { GameProvider, useGame } from './context/GameContext';
import Lobby from './pages/Lobby';
import Game from './pages/Game';

function AppContent() {
  const { phase } = useGame();

  if (phase === 'playing' || phase === 'finished') {
    return <Game />;
  }

  return <Lobby />;
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
