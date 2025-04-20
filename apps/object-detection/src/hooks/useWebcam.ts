import { useState, useCallback, useRef } from 'react';

interface WebcamConfig {
  facingMode?: 'user' | 'environment';
  width?: number;
  height?: number;
}

export const useWebcam = (config: WebcamConfig = {}) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const initializeCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: config.facingMode || 'environment',
          width: config.width,
          height: config.height,
        },
      });
      
      streamRef.current = stream;
      setIsReady(true);
      setError(null);
      return stream;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize camera');
      return null;
    }
  }, [config]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsReady(false);
    }
  }, []);

  return {
    isReady,
    error,
    initializeCamera,
    stopCamera,
    stream: streamRef.current,
  };
};