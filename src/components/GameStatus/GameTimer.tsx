import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface GameTimerProps {
  isActive: boolean;
  initialTime?: number; // in seconds
  onTimeUp?: () => void;
}

export const GameTimer: React.FC<GameTimerProps> = ({
  isActive,
  initialTime = 600, // 10 minutes default
  onTimeUp
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 60;
  const isCriticalTime = timeLeft < 30;

  return (
    <GlassCard className="p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Timer size={16} />
        <h3 className="font-semibold text-sm">Game Timer</h3>
      </div>
      
      <motion.div
        className={`
          text-2xl font-mono font-bold text-center p-3 rounded-lg
          ${isCriticalTime ? 'text-red-400 bg-red-400/20' : 
            isLowTime ? 'text-yellow-400 bg-yellow-400/20' : 
            'text-green-400 bg-green-400/20'}
        `}
        animate={isCriticalTime ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 1, repeat: isCriticalTime ? Infinity : 0 }}
      >
        {formatTime(timeLeft)}
      </motion.div>
      
      {isLowTime && (
        <motion.div
          className="text-xs text-center mt-2 text-yellow-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Time running low!
        </motion.div>
      )}
    </GlassCard>
  );
};