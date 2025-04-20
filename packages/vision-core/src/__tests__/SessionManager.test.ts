import { SessionManager, SessionConfig } from '../SessionManager';
import { ModelLoader } from '../ModelLoader';
import { InferenceEngine } from '../InferenceEngine';

jest.mock('../ModelLoader');
jest.mock('../InferenceEngine');

describe('SessionManager', () => {
  let sessionManager: SessionManager;
  const mockConfig: SessionConfig = {
    modelUrl: 'mock/model.json',
    inputShape: [224, 224],
    autoWarmup: true
  };

  beforeEach(() => {
    sessionManager = new SessionManager(mockConfig);
  });

  it('should initialize successfully', async () => {
    await expect(sessionManager.initialize()).resolves.not.toThrow();
  });

  it('should run inference successfully', async () => {
    const mockImageData = new ImageData(1, 1);
    const expectedResult = {
      predictions: [0.8, 0.2],
      inferenceTime: 100
    };

    await sessionManager.initialize();
    const result = await sessionManager.runInference(mockImageData);
    
    expect(result).toEqual(expectedResult);
  });

  it('should dispose resources correctly', () => {
    sessionManager.dispose();
    expect(ModelLoader.prototype.dispose).toHaveBeenCalled();
  });
});