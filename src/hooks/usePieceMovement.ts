import { useState, useCallback } from 'react';
import { Position } from '../types/chess.types';

interface DragState {
  isDragging: boolean;
  draggedPiece: Position | null;
  dragOffset: { x: number; y: number };
}

export const usePieceMovement = (onMove: (from: Position, to: Position) => void) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedPiece: null,
    dragOffset: { x: 0, y: 0 }
  });

  const startDrag = useCallback((position: Position, event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setDragState({
      isDragging: true,
      draggedPiece: position,
      dragOffset: {
        x: event.clientX - centerX,
        y: event.clientY - centerY
      }
    });
  }, []);

  const updateDrag = useCallback((event: MouseEvent) => {
    if (!dragState.isDragging) return;
    
    setDragState(prev => ({
      ...prev,
      dragOffset: {
        x: event.clientX - window.innerWidth / 2, // Simplified for demo
        y: event.clientY - window.innerHeight / 2
      }
    }));
  }, [dragState.isDragging]);

  const endDrag = useCallback((targetPosition?: Position) => {
    if (dragState.isDragging && dragState.draggedPiece && targetPosition) {
      onMove(dragState.draggedPiece, targetPosition);
    }
    
    setDragState({
      isDragging: false,
      draggedPiece: null,
      dragOffset: { x: 0, y: 0 }
    });
  }, [dragState, onMove]);

  return {
    dragState,
    startDrag,
    updateDrag,
    endDrag
  };
};