import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { GlassCard } from '../ui/GlassCard';

interface WaitingScreenProps {
  onCancel: () => void;
}

export const WaitingScreen: React.FC<WaitingScreenProps> = ({ onCancel }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <GlassCard className="p-8 text-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Chess Pieces */}
            <div className="flex justify-center space-x-4">
              {['♔', '♕', '♖', '♗', '♘', '♙'].map((piece, index) => (
                <motion.div
                  key={piece}
                  className="text-3xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut'
                  }}
                >
                  {piece}
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Finding Opponent</h2>
              <p className="text-gray-400 dark:text-gray-500">
                Searching for a worthy challenger...
              </p>
            </div>

            {/* Loading Spinner */}
            <LoadingSpinner size="lg" className="mx-auto text-blue-400" />

            {/* Cancel Button */}
            <motion.button
              onClick={onCancel}
              className="w-full py-3 px-6 border-2 border-gray-400 dark:border-gray-600 hover:border-red-400 hover:text-red-400 text-gray-400 dark:text-gray-500 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <X size={18} />
              <span>Cancel</span>
            </motion.button>

            {/* Tips */}
            <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
              <div>💡 Tip: Drag pieces to move them</div>
              <div>⚡ Games are played in real-time</div>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </div>
  );
};