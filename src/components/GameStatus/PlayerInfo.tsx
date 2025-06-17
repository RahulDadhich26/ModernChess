import React from 'react';
import { motion } from 'framer-motion';
import { User, Crown } from 'lucide-react';
import { PieceColor } from '../../types/chess.types';
import { GlassCard } from '../ui/GlassCard';

interface PlayerInfoProps {
  color: PieceColor;
  isCurrentPlayer: boolean;
  isCurrentTurn: boolean;
  capturedPieces?: string[];
  playerName?: string;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  color,
  isCurrentPlayer,
  isCurrentTurn,
  capturedPieces = [],
  playerName = color === 'white' ? 'White Player' : 'Black Player'
}) => {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center space-x-3">
        <motion.div
          className={`
            w-3 h-3 rounded-full 
            ${color === 'white' ? 'bg-white border-2 border-gray-800' : 'bg-gray-800'}
          `}
          animate={isCurrentTurn ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: isCurrentTurn ? Infinity : 0 }}
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {isCurrentPlayer ? <Crown size={16} className="text-amber-400" /> : <User size={16} />}
            <span className="font-semibold text-sm">
              {isCurrentPlayer ? 'You' : playerName}
            </span>
          </div>
          
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Playing as {color}
          </div>
        </div>
        
        {isCurrentTurn && (
          <motion.div
            className="text-xs px-2 py-1 bg-green-500 text-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Turn
          </motion.div>
        )}
      </div>
      
      {/* Captured pieces */}
      {capturedPieces.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">Captured:</div>
          <div className="flex flex-wrap gap-1">
            {capturedPieces.map((piece, index) => (
              <span key={index} className="text-sm opacity-70">
                {piece}
              </span>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
};