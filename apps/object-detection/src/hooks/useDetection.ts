import { useState, useCallback } from 'react';
import { Detection } from '../types';

export const useDetection = () => {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fps, setFps] = useState(0);

  const processFrame = useCallback(async (imageData: ImageData) => {
    setIsProcessing(true);
    try {
      // Model processing will be implemented here
      const startTime = performance.now();
      
      // Placeholder for actual detection logic
      const results: Detection[] = [];
      
      const endTime = performance.now();
      setFps(1000 / (endTime - startTime));
      setDetections(results);
    } catch (error) {
      console.error('Detection error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    detections,
    isProcessing,
    fps,
    processFrame,
  };
};