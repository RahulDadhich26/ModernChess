import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { PieceColor } from '../../types/chess.types';
import { GlassCard } from '../ui/GlassCard';

interface GameOverScreenProps {
  winner?: PieceColor;
  playerColor?: PieceColor;
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  winner,
  playerColor,
  onPlayAgain,
  onBackToHome
}) => {
  const isWinner = winner === playerColor;
  const isDraw = !winner;

  const getResultMessage = () => {
    if (isDraw) return 'Draw!';
    return isWinner ? 'Victory!' : 'Defeat!';
  };

  const getResultColor = () => {
    if (isDraw) return 'text-yellow-400';
    return isWinner ? 'text-green-400' : 'text-red-400';
  };

  const getResultIcon = () => {
    if (isDraw) return '🤝';
    return isWinner ? '👑' : '💔';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <GlassCard className="p-8 text-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Result Icon */}
            <motion.div
              className="text-6xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              {getResultIcon()}
            </motion.div>

            {/* Result Message */}
            <div className="space-y-2">
              <motion.h2
                className={`text-3xl font-bold ${getResultColor()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {getResultMessage()}
              </motion.h2>
              
              {!isDraw && (
                <motion.p
                  className="text-gray-400 dark:text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {isWinner 
                    ? 'Congratulations on your victory!' 
                    : 'Better luck next time!'
                  }
                </motion.p>
              )}
              
              {isDraw && (
                <motion.p
                  className="text-gray-400 dark:text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Well played by both sides!
                </motion.p>
              )}
            </div>

            {/* Action Buttons */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={onPlayAgain}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={18} />
                <span>Play Again</span>
              </motion.button>

              <motion.button
                onClick={onBackToHome}
                className="w-full py-3 px-6 border-2 border-gray-400 dark:border-gray-600 hover:border-blue-400 hover:text-blue-400 text-gray-400 dark:text-gray-500 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home size={18} />
                <span>Back to Home</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="pt-4 border-t border-white/10 text-sm text-gray-400 dark:text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Thanks for playing Modern Chess!
            </motion.div>
          </motion.div>
        </GlassCard>
      </div>
    </div>
  );
};