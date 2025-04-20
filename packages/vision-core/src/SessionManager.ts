import { ModelLoader } from './ModelLoader';
import { InferenceEngine } from './InferenceEngine';

export interface SessionConfig {
  modelUrl: string;
  inputShape: [number, number];
  autoWarmup?: boolean;
}

export class SessionManager {
  private modelLoader: ModelLoader;
  private inferenceEngine: InferenceEngine;

  constructor(config: SessionConfig) {
    this.modelLoader = new ModelLoader({
      modelUrl: config.modelUrl,
      inputShape: config.inputShape,
      warmup: config.autoWarmup
    });
    this.inferenceEngine = new InferenceEngine(this.modelLoader);
  }

  async initialize(): Promise<void> {
    await this.modelLoader.initialize();
  }

  async runInference(imageData: ImageData) {
    return this.inferenceEngine.process(imageData);
  }

  dispose(): void {
    this.modelLoader.dispose();
  }
}