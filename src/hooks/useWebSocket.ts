import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage, WebSocketMessageType } from '../types/chess.types';

interface UseWebSocketReturn {
  socket: WebSocket | null;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
  sendMessage: (message: WebSocketMessage) => void;
  connect: () => void;
  disconnect: () => void;
}

export const useWebSocket = (
  url: string = 'ws://localhost:8080',
  onMessage?: (message: any) => void
): UseWebSocketReturn => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const baseReconnectDelay = 1000;

  const connect = useCallback(() => {
    if (socket?.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionStatus('connecting');
    
    try {
      const ws = new WebSocket(url);
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        setConnectionStatus('connected');
        setSocket(ws);
        reconnectAttemptsRef.current = 0;
      };
      
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          onMessage?.(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };
      
      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setConnectionStatus('disconnected');
        setSocket(null);
        
        // Attempt to reconnect with exponential backoff
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current);
          reconnectAttemptsRef.current++;
          
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`Attempting to reconnect (${reconnectAttemptsRef.current}/${maxReconnectAttempts})...`);
            connect();
          }, delay);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('disconnected');
      };
      
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionStatus('disconnected');
    }
  }, [url, onMessage]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (socket) {
      socket.close(1000, 'Client disconnecting');
      setSocket(null);
    }
    
    setConnectionStatus('disconnected');
    reconnectAttemptsRef.current = 0;
  }, [socket]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message);
    }
  }, [socket]);

  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      disconnect();
    };
  }, [disconnect]);

  return {
    socket,
    connectionStatus,
    sendMessage,
    connect,
    disconnect
  };
};