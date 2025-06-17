import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { GameMove } from '../../types/chess.types';
import { GlassCard } from '../ui/GlassCard';
import { formatMove } from '../../utils/chess.utils';

interface MoveHistoryProps {
  moves: GameMove[];
  className?: string;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ moves, className = '' }) => {
  return (
    <GlassCard className={`p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Clock size={16} />
        <h3 className="font-semibold text-sm">Move History</h3>
      </div>
      
      <div className="max-h-48 overflow-y-auto space-y-1">
        {moves.length === 0 ? (
          <div className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
            No moves yet
          </div>
        ) : (
          moves.map((move, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-white/5 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="font-mono">
                {formatMove(move, Math.floor(index / 2) + 1)}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(move.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </motion.div>
          ))
        )}
      </div>
    </GlassCard>
  );
};