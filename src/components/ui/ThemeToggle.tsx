import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Theme } from '../../types/chess.types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`
        relative w-14 h-8 rounded-full p-1 transition-colors duration-300
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-slate-700 to-slate-600' 
          : 'bg-gradient-to-r from-blue-200 to-cyan-200'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          ${theme === 'dark' ? 'bg-amber-400' : 'bg-white'}
        `}
        animate={{
          x: theme === 'dark' ? 20 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <Moon size={14} className="text-slate-800" />
        ) : (
          <Sun size={14} className="text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
};