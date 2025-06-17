import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Trophy } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface LandingScreenProps {
  onStartGame: () => void;
  theme: 'dark' | 'light';
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStartGame, theme }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ♔
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Modern Chess
          </h1>
          <p className="text-lg text-gray-400 dark:text-gray-500 mt-2">
            Play chess with players around the world
          </p>
        </motion.div>

        {/* Main Card */}
        <GlassCard className="p-8 text-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Users className="w-8 h-8 mx-auto text-blue-400" />
                <div className="text-sm text-gray-400">Multiplayer</div>
              </div>
              <div className="space-y-2">
                <Trophy className="w-8 h-8 mx-auto text-amber-400" />
                <div className="text-sm text-gray-400">Competitive</div>
              </div>
              <div className="space-y-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡
                </motion.div>
                <div className="text-sm text-gray-400">Real-time</div>
              </div>
            </div>

            {/* Start Game Button */}
            <motion.button
              onClick={onStartGame}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={20} />
              <span>Find Game</span>
            </motion.button>

            <div className="text-xs text-gray-400 dark:text-gray-500">
              Click to search for an opponent
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </div>
  );
};