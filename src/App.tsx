import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChessBoard } from './components/ChessBoard/ChessBoard';
import { GameStatusPanel } from './components/GameStatus/GameStatusPanel';
import { LandingScreen } from './components/GameScreens/LandingScreen';
import { WaitingScreen } from './components/GameScreens/WaitingScreen';
import { GameOverScreen } from './components/GameScreens/GameOverScreen';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { useChessGame } from './hooks/useChessGame';
import { Theme } from './types/chess.types';

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const {
    board,
    gameStatus,
    moveHistory,
    selectedSquare,
    validMoves,
    lastMove,
    startGame,
    selectSquare,
    resetGame
  } = useChessGame();

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handlePlayAgain = () => {
    resetGame();
    startGame();
  };

  // Apply theme to document
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const renderCurrentScreen = () => {
    switch (gameStatus.state) {
      case 'landing':
        return <LandingScreen onStartGame={startGame} theme={theme} />;
      
      case 'waiting':
        return <WaitingScreen onCancel={resetGame} />;
      
      case 'game-over':
        return (
          <GameOverScreen
            winner={gameStatus.winner}
            playerColor={gameStatus.playerColor}
            onPlayAgain={handlePlayAgain}
            onBackToHome={resetGame}
          />
        );
      
      case 'playing':
        return (
          <div className="min-h-screen p-4">
            {/* Header */}
            <motion.header
              className="flex justify-between items-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Modern Chess
              </h1>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </motion.header>

            {/* Game Layout */}
            <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
              {/* Chess Board */}
              <motion.div
                className="flex-1 flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <ChessBoard
                  board={board}
                  selectedSquare={selectedSquare}
                  validMoves={validMoves}
                  lastMove={lastMove}
                  playerColor={gameStatus.playerColor}
                  onSquareClick={selectSquare}
                  theme={theme}
                />
              </motion.div>

              {/* Game Status Panel */}
              <div className="w-full lg:w-80">
                <GameStatusPanel
                  gameStatus={gameStatus}
                  moveHistory={moveHistory}
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return <LandingScreen onStartGame={startGame} theme={theme} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    } text-gray-900 dark:text-white`}>
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {renderCurrentScreen()}
      </div>
    </div>
  );
}

export default App;