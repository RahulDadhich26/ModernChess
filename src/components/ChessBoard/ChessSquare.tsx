import React from 'react';
import { motion } from 'framer-motion';
import { ChessPiece, Position } from '../../types/chess.types';
import { getPieceUnicode, isLightSquare } from '../../utils/chess.utils';

interface ChessSquareProps {
  position: Position;
  piece: ChessPiece | null;
  isSelected: boolean;
  isValidMove: boolean;
  isLastMove: boolean;
  isCheck: boolean;
  onClick: () => void;
  onPieceMouseDown: (e: React.MouseEvent) => void;
  theme: 'dark' | 'light';
}

export const ChessSquare: React.FC<ChessSquareProps> = ({
  position,
  piece,
  isSelected,
  isValidMove,
  isLastMove,
  isCheck,
  onClick,
  onPieceMouseDown,
  theme
}) => {
  const isLight = isLightSquare(position.row, position.col);
  
  const getSquareColor = () => {
    if (isCheck) return 'bg-red-400 dark:bg-red-600';
    if (isSelected) return 'bg-blue-400 dark:bg-blue-600';
    if (isLastMove) return 'bg-blue-300 dark:bg-blue-700';
    
    if (theme === 'dark') {
      return isLight ? 'bg-amber-100 dark:bg-amber-200' : 'bg-amber-800 dark:bg-amber-900';
    } else {
      return isLight ? 'bg-stone-100' : 'bg-stone-600';
    }
  };

  return (
    <motion.div
      className={`
        relative w-full h-full cursor-pointer select-none
        ${getSquareColor()}
        hover:brightness-110 transition-all duration-200
      `}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Valid move indicator */}
      {isValidMove && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div className="w-4 h-4 bg-green-400 dark:bg-green-500 rounded-full opacity-70" />
        </motion.div>
      )}
      
      {/* Chess piece */}
      {piece && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-4xl cursor-grab active:cursor-grabbing"
          onMouseDown={onPieceMouseDown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <span className="drop-shadow-lg">
            {getPieceUnicode(piece)}
          </span>
        </motion.div>
      )}
      
      {/* Coordinate labels */}
      {position.row === 7 && (
        <div className="absolute bottom-1 right-1 text-xs font-semibold opacity-60">
          {String.fromCharCode('a'.charCodeAt(0) + position.col)}
        </div>
      )}
      {position.col === 0 && (
        <div className="absolute top-1 left-1 text-xs font-semibold opacity-60">
          {8 - position.row}
        </div>
      )}
    </motion.div>
  );
};