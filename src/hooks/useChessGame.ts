import { useState, useCallback } from 'react';
import {
  ChessPiece,
  Position,
  GameMove,
  GameStatus,
  PieceColor,
  Move
} from '../types/chess.types';
import { initializeBoard, notationToPosition, positionToNotation } from '../utils/chess.utils';

export const useChessGame = () => {
  const [board, setBoard] = useState<(ChessPiece | null)[][]>(initializeBoard);
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    state: 'landing',
    currentTurn: 'white',
    isCheck: false,
    isCheckmate: false,
    connectionStatus: 'connected' // Set to connected for local play
  });
  const [moveHistory, setMoveHistory] = useState<GameMove[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [lastMove, setLastMove] = useState<Move | null>(null);

  const startGame = useCallback(() => {
    setGameStatus(prev => ({ 
      ...prev, 
      state: 'playing',
      playerColor: 'white', // For local play, player controls white
      connectionStatus: 'connected'
    }));
  }, []);

  const makeMove = useCallback((from: string, to: string) => {
    const fromPos = notationToPosition(from);
    const toPos = notationToPosition(to);
    
    const piece = board[fromPos.row][fromPos.col];
    if (!piece) return false;

    // Check if it's the correct player's turn
    if (piece.color !== gameStatus.currentTurn) {
      return false;
    }

    // Make the move
    const newBoard = board.map(row => [...row]);
    const capturedPiece = newBoard[toPos.row][toPos.col];
    
    newBoard[toPos.row][toPos.col] = piece;
    newBoard[fromPos.row][fromPos.col] = null;
    
    setBoard(newBoard);
    
    // Add to move history
    const gameMove: GameMove = {
      from,
      to,
      piece,
      captured: capturedPiece || undefined,
      timestamp: Date.now()
    };
    
    setMoveHistory(prev => [...prev, gameMove]);
    
    // Update game status - switch turns
    setGameStatus(prev => ({
      ...prev,
      currentTurn: prev.currentTurn === 'white' ? 'black' : 'white'
    }));
    
    // Clear selection
    setSelectedSquare(null);
    setValidMoves([]);
    
    // Set last move for highlighting
    setLastMove({ from, to });
    
    return true;
  }, [board, gameStatus.currentTurn]);

  const selectSquare = useCallback((position: Position) => {
    const piece = board[position.row][position.col];
    
    // If clicking on a valid move destination
    if (selectedSquare && validMoves.some(move => move.row === position.row && move.col === position.col)) {
      const from = positionToNotation(selectedSquare);
      const to = positionToNotation(position);
      makeMove(from, to);
      return;
    }
    
    // If clicking on a piece that belongs to the current player
    if (piece && piece.color === gameStatus.currentTurn) {
      setSelectedSquare(position);
      // Calculate basic valid moves (simplified - just adjacent squares for now)
      const moves: Position[] = [];
      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          if (rowOffset === 0 && colOffset === 0) continue;
          const newRow = position.row + rowOffset;
          const newCol = position.col + colOffset;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol];
            // Can move to empty square or capture opponent piece
            if (!targetPiece || targetPiece.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        }
      }
      setValidMoves(moves);
    } else {
      setSelectedSquare(null);
      setValidMoves([]);
    }
  }, [board, selectedSquare, validMoves, gameStatus.currentTurn, makeMove]);

  const resetGame = useCallback(() => {
    setBoard(initializeBoard());
    setGameStatus({
      state: 'landing',
      currentTurn: 'white',
      isCheck: false,
      isCheckmate: false,
      connectionStatus: 'connected'
    });
    setMoveHistory([]);
    setSelectedSquare(null);
    setValidMoves([]);
    setLastMove(null);
  }, []);

  // Mock functions for compatibility
  const connect = useCallback(() => {
    // No-op for local play
  }, []);

  const disconnect = useCallback(() => {
    // No-op for local play
  }, []);

  return {
    board,
    gameStatus,
    moveHistory,
    selectedSquare,
    validMoves,
    lastMove,
    startGame,
    makeMove,
    selectSquare,
    resetGame,
    connect,
    disconnect
  };
};