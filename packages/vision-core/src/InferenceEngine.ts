import * as tf from '@tensorflow/tfjs';
import { ModelLoader } from './ModelLoader';

export interface InferenceResult {
  predictions: number[];
  inferenceTime: number;
}

export class InferenceEngine {
  constructor(private modelLoader: ModelLoader) {}

  async process(imageData: ImageData): Promise<InferenceResult> {
    const startTime = performance.now();
    
    const tensor = tf.tidy(() => {
      return tf.browser.fromPixels(imageData)
        .expandDims(0)
        .toFloat()
        .div(255);
    });

    const predictions = await this.modelLoader.predict(tensor);
    const result = await predictions.data();

    tensor.dispose();
    predictions.dispose();

    return {
      predictions: Array.from(result),
      inferenceTime: performance.now() - startTime
    };
  }
}