import { ChessPiece, Position, PieceColor, PieceType } from '../types/chess.types';

// Convert chess notation (e.g., "e4") to board position
export const notationToPosition = (notation: string): Position => {
  const col = notation.charCodeAt(0) - 'a'.charCodeAt(0);
  const row = 8 - parseInt(notation[1]);
  return { row, col };
};

// Convert board position to chess notation
export const positionToNotation = (position: Position): string => {
  const col = String.fromCharCode('a'.charCodeAt(0) + position.col);
  const row = (8 - position.row).toString();
  return col + row;
};

// Check if a position is within the board
export const isValidPosition = (position: Position): boolean => {
  return position.row >= 0 && position.row < 8 && position.col >= 0 && position.col < 8;
};

// Get piece Unicode character
export const getPieceUnicode = (piece: ChessPiece): string => {
  const pieces = {
    white: {
      king: '♔',
      queen: '♕',
      rook: '♖',
      bishop: '♗',
      knight: '♘',
      pawn: '♙'
    },
    black: {
      king: '♚',
      queen: '♛',
      rook: '♜',
      bishop: '♝',
      knight: '♞',
      pawn: '♟'
    }
  };
  return pieces[piece.color][piece.type];
};

// Initialize standard chess board
export const initializeBoard = (): (ChessPiece | null)[][] => {
  const board: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black' };
    board[6][col] = { type: 'pawn', color: 'white' };
  }
  
  // Place other pieces
  const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  
  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: pieceOrder[col], color: 'black' };
    board[7][col] = { type: pieceOrder[col], color: 'white' };
  }
  
  return board;
};

// Check if it's a light square
export const isLightSquare = (row: number, col: number): boolean => {
  return (row + col) % 2 === 0;
};

// Format move for display
export const formatMove = (move: any, moveNumber: number): string => {
  // This is a simplified version - in a real app you'd want proper chess notation
  return `${moveNumber}. ${move.from}-${move.to}`;
};

// Get valid moves for a piece (simplified version)
export const getValidMoves = (
  board: (ChessPiece | null)[][],
  from: Position,
  piece: ChessPiece
): Position[] => {
  // This is a simplified implementation
  // In a real chess app, you'd implement full move validation for each piece type
  const validMoves: Position[] = [];
  
  // For now, just return adjacent squares as an example
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      if (rowOffset === 0 && colOffset === 0) continue;
      
      const newPos = {
        row: from.row + rowOffset,
        col: from.col + colOffset
      };
      
      if (isValidPosition(newPos)) {
        const targetPiece = board[newPos.row][newPos.col];
        if (!targetPiece || targetPiece.color !== piece.color) {
          validMoves.push(newPos);
        }
      }
    }
  }
  
  return validMoves;
};