import React from 'react';
import { motion } from 'framer-motion';
import { ChessSquare } from './ChessSquare';
import { ChessPiece, Position, Move, Theme } from '../../types/chess.types';
import { notationToPosition } from '../../utils/chess.utils';

interface ChessBoardProps {
  board: (ChessPiece | null)[][];
  selectedSquare: Position | null;
  validMoves: Position[];
  lastMove: Move | null;
  playerColor?: 'white' | 'black';
  onSquareClick: (position: Position) => void;
  theme: Theme;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  selectedSquare,
  validMoves,
  lastMove,
  playerColor = 'white',
  onSquareClick,
  theme
}) => {
  const isValidMove = (position: Position) => {
    return validMoves.some(move => move.row === position.row && move.col === position.col);
  };

  const isLastMove = (position: Position) => {
    if (!lastMove) return false;
    const fromPos = notationToPosition(lastMove.from);
    const toPos = notationToPosition(lastMove.to);
    return (position.row === fromPos.row && position.col === fromPos.col) ||
           (position.row === toPos.row && position.col === toPos.col);
  };

  const handlePieceMouseDown = (position: Position, e: React.MouseEvent) => {
    e.preventDefault();
    // Handle drag start here if needed
  };

  // Flip board if playing as black
  const shouldFlipBoard = playerColor === 'black';

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="bg-gradient-to-br from-amber-900 to-amber-800 dark:from-slate-800 dark:to-slate-900 p-4 rounded-2xl shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className={`grid grid-cols-8 gap-0 w-80 h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] rounded-lg overflow-hidden ${shouldFlipBoard ? 'rotate-180' : ''}`}>
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const position = { row: rowIndex, col: colIndex };
              const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
              
              return (
                <div key={`${rowIndex}-${colIndex}`} className={shouldFlipBoard ? 'rotate-180' : ''}>
                  <ChessSquare
                    position={position}
                    piece={piece}
                    isSelected={isSelected}
                    isValidMove={isValidMove(position)}
                    isLastMove={isLastMove(position)}
                    isCheck={false} // Would need to implement check detection
                    onClick={() => onSquareClick(position)}
                    onPieceMouseDown={(e) => handlePieceMouseDown(position, e)}
                    theme={theme}
                  />
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
};