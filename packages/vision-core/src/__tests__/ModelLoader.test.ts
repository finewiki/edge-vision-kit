import { ModelLoader, ModelOptions } from '../ModelLoader';
import * as tf from '@tensorflow/tfjs';

describe('ModelLoader', () => {
  let modelLoader: ModelLoader;
  const mockOptions: ModelOptions = {
    modelUrl: 'mock/model.json',
    inputShape: [224, 224],
    warmup: true
  };

  beforeEach(() => {
    modelLoader = new ModelLoader(mockOptions);
  });

  it('should initialize successfully', async () => {
    const mockModel = {
      predict: jest.fn(),
      dispose: jest.fn()
    };
    
    jest.spyOn(tf, 'loadGraphModel').mockResolvedValue(mockModel as any);
    
    await expect(modelLoader.initialize()).resolves.not.toThrow();
  });

  it('should throw error on failed initialization', async () => {
    jest.spyOn(tf, 'loadGraphModel').mockRejectedValue(new Error('Network error'));
    
    await expect(modelLoader.initialize()).rejects.toThrow('Model initialization failed');
  });
});