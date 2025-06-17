import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  animate = true 
}) => {
  const Component = animate ? motion.div : 'div';
  const props = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <Component
      {...props}
      className={`
        backdrop-blur-lg bg-white/10 dark:bg-black/20 
        border border-white/20 dark:border-white/10
        rounded-2xl shadow-xl
        ${className}
      `}
    >
      {children}
    </Component>
  );
};