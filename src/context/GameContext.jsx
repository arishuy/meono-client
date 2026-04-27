import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import socket from '../socket';

const GameContext = createContext(null);

const initialState = {
  // Connection
  connected: false,
  // Player
  playerName: '',
  playerId: null,
  // Room
  roomCode: null,
  playerList: [],
  // Game
  phase: 'lobby', // lobby | playing | finished
  gameState: null,
  myHand: [],
  isMyTurn: false,
  currentPlayerId: null,
  drawPileCount: 0,
  discardPile: [],
  players: [],
  turnsRemaining: 0,
  pendingAction: null,
  winner: null,
  activityLog: [],
  // UI state
  showFutureCards: null,
  showExplosion: false,
  notification: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONNECTED':
      return { ...state, connected: action.payload };
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    case 'SET_PLAYER_ID':
      return { ...state, playerId: action.payload };
    case 'SET_ROOM':
      return { ...state, roomCode: action.payload };
    case 'SET_PLAYER_LIST':
      return { ...state, playerList: action.payload };
    case 'GAME_STARTED':
    case 'UPDATE_GAME_STATE': {
      const gs = action.payload;
      return {
        ...state,
        phase: gs.phase,
        gameState: gs,
        myHand: gs.myHand || [],
        isMyTurn: gs.isMyTurn,
        currentPlayerId: gs.currentPlayerId,
        drawPileCount: gs.drawPileCount,
        discardPile: gs.discardPile || [],
        players: gs.players || [],
        turnsRemaining: gs.turnsRemaining,
        pendingAction: gs.pendingAction,
        winner: gs.winner,
        activityLog: gs.activityLog || [],
      };
    }
    case 'SET_FUTURE_CARDS':
      return { ...state, showFutureCards: action.payload };
    case 'SHOW_EXPLOSION':
      return { ...state, showExplosion: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'RESET':
      return { ...initialState, connected: state.connected, playerName: state.playerName };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    socket.on('connect', () => {
      dispatch({ type: 'SET_CONNECTED', payload: true });
      dispatch({ type: 'SET_PLAYER_ID', payload: socket.id });
    });

    socket.on('disconnect', () => {
      dispatch({ type: 'SET_CONNECTED', payload: false });
    });

    socket.on('player-list-updated', (players) => {
      dispatch({ type: 'SET_PLAYER_LIST', payload: players });
    });

    socket.on('game-started', (gameState) => {
      dispatch({ type: 'GAME_STARTED', payload: gameState });
    });

    socket.on('game-state-updated', (gameState) => {
      dispatch({ type: 'UPDATE_GAME_STATE', payload: gameState });
    });

    socket.on('see-the-future', ({ cards }) => {
      dispatch({ type: 'SET_FUTURE_CARDS', payload: cards });
      setTimeout(() => {
        dispatch({ type: 'SET_FUTURE_CARDS', payload: null });
      }, 4000);
    });

    socket.on('must-defuse', ({ deckSize }) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: 'defuse', message: '💣 You drew an Exploding Kitten! Use your Defuse!', deckSize },
      });
    });

    socket.on('player-drew-ek', ({ playerId, hasDefuse }) => {
      dispatch({ type: 'SHOW_EXPLOSION', payload: true });
      setTimeout(() => dispatch({ type: 'SHOW_EXPLOSION', payload: false }), 800);
    });

    socket.on('player-eliminated', ({ playerId, playerName }) => {
      dispatch({ type: 'SHOW_EXPLOSION', payload: true });
      setTimeout(() => dispatch({ type: 'SHOW_EXPLOSION', payload: false }), 800);
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: 'elimination', message: `💀 ${playerName} has been eliminated!` },
      });
      setTimeout(() => dispatch({ type: 'SET_NOTIFICATION', payload: null }), 3000);
    });

    socket.on('player-defused', ({ playerId, playerName }) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: 'defuse_success', message: `🛡️ ${playerName} defused the Exploding Kitten!` },
      });
      setTimeout(() => dispatch({ type: 'SET_NOTIFICATION', payload: null }), 3000);
    });

    socket.on('game-over', ({ winnerId, winnerName }) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: 'game_over', message: `🏆 ${winnerName} wins!`, winnerId },
      });
    });

    if (socket.connected) {
      dispatch({ type: 'SET_CONNECTED', payload: true });
      dispatch({ type: 'SET_PLAYER_ID', payload: socket.id });
    }

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('player-list-updated');
      socket.off('game-started');
      socket.off('game-state-updated');
      socket.off('see-the-future');
      socket.off('must-defuse');
      socket.off('player-drew-ek');
      socket.off('player-eliminated');
      socket.off('player-defused');
      socket.off('game-over');
    };
  }, []);

  // ======= Actions =======

  const createRoom = useCallback((name) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: 'SET_PLAYER_NAME', payload: name });
      socket.emit('create-room', { playerName: name }, (res) => {
        if (res.success) {
          dispatch({ type: 'SET_ROOM', payload: res.roomCode });
          resolve(res.roomCode);
        } else {
          reject(new Error(res.error));
        }
      });
    });
  }, []);

  const joinRoom = useCallback((code, name) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: 'SET_PLAYER_NAME', payload: name });
      socket.emit('join-room', { roomCode: code, playerName: name }, (res) => {
        if (res.success) {
          dispatch({ type: 'SET_ROOM', payload: res.roomCode });
          resolve(res.roomCode);
        } else {
          reject(new Error(res.error));
        }
      });
    });
  }, []);

  const startGame = useCallback(() => {
    return new Promise((resolve, reject) => {
      socket.emit('start-game', { roomCode: state.roomCode }, (res) => {
        if (res.success) resolve();
        else reject(new Error(res.error));
      });
    });
  }, [state.roomCode]);

  const playCard = useCallback((cardId, targetData = {}) => {
    return new Promise((resolve, reject) => {
      socket.emit('play-card', { roomCode: state.roomCode, cardId, targetData }, (res) => {
        if (res.success) resolve(res.result);
        else reject(new Error(res.error));
      });
    });
  }, [state.roomCode]);

  const drawFromPile = useCallback(() => {
    return new Promise((resolve, reject) => {
      socket.emit('draw-card', { roomCode: state.roomCode }, (res) => {
        if (res.success) resolve(res.type);
        else reject(new Error(res.error));
      });
    });
  }, [state.roomCode]);

  const defuseResponse = useCallback((insertPosition) => {
    return new Promise((resolve, reject) => {
      socket.emit('defuse-response', { roomCode: state.roomCode, insertPosition }, (res) => {
        if (res.success) {
          dispatch({ type: 'SET_NOTIFICATION', payload: null });
          resolve();
        } else reject(new Error(res.error));
      });
    });
  }, [state.roomCode]);

  const favorResponse = useCallback((cardId) => {
    return new Promise((resolve, reject) => {
      socket.emit('favor-response', { roomCode: state.roomCode, cardId }, (res) => {
        if (res.success) resolve();
        else reject(new Error(res.error));
      });
    });
  }, [state.roomCode]);

  const stealTarget = useCallback((targetId) => {
    return new Promise((resolve, reject) => {
      socket.emit('steal-target', { roomCode: state.roomCode, targetId }, (res) => {
        if (res.success) resolve();
        else reject(new Error(res.error));
      });
    });
  }, [state.roomCode]);

  const value = {
    ...state,
    createRoom,
    joinRoom,
    startGame,
    playCard,
    drawFromPile,
    defuseResponse,
    favorResponse,
    stealTarget,
    dispatch,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
