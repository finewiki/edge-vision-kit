import { 
  GraphModel, 
  loadGraphModel, 
  zeros, 
  Tensor,
  ready 
} from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { ModelError } from './types';

export interface ModelOptions {
  modelUrl: string;
  inputShape: [number, number];
  warmup?: boolean;
  backend?: 'webgl' | 'cpu';
}

export class ModelLoader {
  private model: GraphModel | null = null;
  private isInitialized: boolean = false;

  constructor(private options: ModelOptions) {}

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await ready();
      this.model = await loadGraphModel(this.options.modelUrl);
      
      if (this.options.warmup) {
        const dummyInput = zeros([1, ...this.options.inputShape, 3]);
        await this.model.predict(dummyInput);
        dummyInput.dispose();
      }
      
      this.isInitialized = true;
    } catch (error) {
      throw new ModelError('Model initialization failed', error);
    }
  }

  async predict(input: Tensor): Promise<Tensor> {
    if (!this.model || !this.isInitialized) {
      throw new ModelError('Model not initialized', null);
    }
    try {
      return this.model.predict(input) as Tensor;
    } catch (error) {
      throw new ModelError('Prediction failed', error);
    }
  }

  dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
      this.isInitialized = false;
    }
  }

  isLoaded(): boolean {
    return this.isInitialized && this.model !== null;
  }
}