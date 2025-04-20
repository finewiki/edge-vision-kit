import { InferenceEngine } from '../InferenceEngine';
import { ModelLoader } from '../ModelLoader';
import * as tf from '@tensorflow/tfjs';

jest.mock('../ModelLoader');

describe('InferenceEngine', () => {
  let inferenceEngine: InferenceEngine;
  let mockModelLoader: jest.Mocked<ModelLoader>;

  beforeEach(() => {
    mockModelLoader = new ModelLoader({
      modelUrl: 'mock/model.json',
      inputShape: [224, 224]
    }) as jest.Mocked<ModelLoader>;
    
    inferenceEngine = new InferenceEngine(mockModelLoader);
  });

  it('should process image data correctly', async () => {
    const mockImageData = new ImageData(1, 1);
    const mockPredictions = tf.tensor1d([0.8, 0.2]);
    
    jest.spyOn(mockModelLoader, 'predict').mockResolvedValue(mockPredictions);
    
    const result = await inferenceEngine.process(mockImageData);
    
    expect(result.predictions).toHaveLength(2);
    expect(result.inferenceTime).toBeGreaterThan(0);
  });
});