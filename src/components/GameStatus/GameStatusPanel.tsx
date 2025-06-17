import React from 'react';
import { motion } from 'framer-motion';
import { PlayerInfo } from './PlayerInfo';
import { MoveHistory } from './MoveHistory';
import { ConnectionStatus } from './ConnectionStatus';
import { GameTimer } from './GameTimer';
import { GameStatus, GameMove, PieceColor } from '../../types/chess.types';

interface GameStatusPanelProps {
  gameStatus: GameStatus;
  moveHistory: GameMove[];
  onTimeUp?: () => void;
}

export const GameStatusPanel: React.FC<GameStatusPanelProps> = ({
  gameStatus,
  moveHistory,
  onTimeUp
}) => {
  const isGameActive = gameStatus.state === 'playing';

  return (
    <motion.div
      className="space-y-4 w-full max-w-sm"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Connection Status */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Game Status</h2>
        <ConnectionStatus status={gameStatus.connectionStatus} />
      </div>

      {/* Player Information */}
      {gameStatus.playerColor && (
        <div className="space-y-3">
          <PlayerInfo
            color={gameStatus.playerColor}
            isCurrentPlayer={true}
            isCurrentTurn={gameStatus.currentTurn === gameStatus.playerColor}
          />
          <PlayerInfo
            color={gameStatus.playerColor === 'white' ? 'black' : 'white'}
            isCurrentPlayer={false}
            isCurrentTurn={gameStatus.currentTurn !== gameStatus.playerColor}
          />
        </div>
      )}

      {/* Game Timer */}
      {isGameActive && (
        <GameTimer
          isActive={gameStatus.currentTurn === gameStatus.playerColor}
          onTimeUp={onTimeUp}
        />
      )}

      {/* Move History */}
      <MoveHistory moves={moveHistory} />

      {/* Game State Messages */}
      {gameStatus.isCheck && (
        <motion.div
          className="p-3 bg-red-400/20 border border-red-400/30 rounded-lg text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-red-400 font-semibold">Check!</div>
        </motion.div>
      )}

      {gameStatus.isCheckmate && (
        <motion.div
          className="p-3 bg-yellow-400/20 border border-yellow-400/30 rounded-lg text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-yellow-400 font-semibold">Checkmate!</div>
          {gameStatus.winner && (
            <div className="text-sm mt-1">
              {gameStatus.winner === gameStatus.playerColor ? 'You win!' : 'You lose!'}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};