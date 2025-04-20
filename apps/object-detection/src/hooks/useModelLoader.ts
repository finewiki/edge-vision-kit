import { useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';

export const useModelLoader = () => {
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadModel = useCallback(async (modelUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const loadedModel = await tf.loadGraphModel(modelUrl);
      setModel(loadedModel);
      return loadedModel;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load model';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unloadModel = useCallback(() => {
    if (model) {
      model.dispose();
      setModel(null);
    }
  }, [model]);

  return {
    model,
    isLoading,
    error,
    loadModel,
    unloadModel,
  };
};