export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: string;
  to: string;
}

export interface GameMove extends Move {
  piece: ChessPiece;
  captured?: ChessPiece;
  timestamp: number;
}

export type GameState = 'landing' | 'waiting' | 'playing' | 'game-over';

export interface GameStatus {
  state: GameState;
  playerColor?: PieceColor;
  currentTurn: PieceColor;
  isCheck: boolean;
  isCheckmate: boolean;
  winner?: PieceColor;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
}

export type WebSocketMessageType = 'INIT_GAME' | 'MOVE' | 'GAME_OVER';

export interface WebSocketMessage {
  type: WebSocketMessageType;
  payload?: any;
}

export interface InitGameMessage {
  type: 'INIT_GAME';
  payload: {
    color: PieceColor;
    gameId: string;
  };
}

export interface MoveMessage {
  type: 'MOVE';
  payload: {
    move: Move;
    gameState?: any;
  };
}

export interface GameOverMessage {
  type: 'GAME_OVER';
  payload: {
    winner: PieceColor | 'draw';
    reason: string;
  };
}

export type Theme = 'dark' | 'light';