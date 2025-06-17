import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Loader } from 'lucide-react';

interface ConnectionStatusProps {
  status: 'connected' | 'connecting' | 'disconnected';
  className?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: Wifi,
          text: 'Connected',
          color: 'text-green-400',
          bgColor: 'bg-green-400/20'
        };
      case 'connecting':
        return {
          icon: Loader,
          text: 'Connecting...',
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-400/20'
        };
      case 'disconnected':
        return {
          icon: WifiOff,
          text: 'Disconnected',
          color: 'text-red-400',
          bgColor: 'bg-red-400/20'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <motion.div
      className={`flex items-center space-x-2 px-3 py-2 rounded-full ${config.bgColor} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={status === 'connecting' ? { rotate: 360 } : {}}
        transition={{ duration: 1, repeat: status === 'connecting' ? Infinity : 0, ease: 'linear' }}
      >
        <Icon size={14} className={config.color} />
      </motion.div>
      <span className={`text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    </motion.div>
  );
};