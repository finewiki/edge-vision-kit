import { ModelManager } from './ModelManager';
import { Detection } from './types';
import * as tf from '@tensorflow/tfjs';

export class MobileNetModel extends ModelManager {
  private labels: string[];

  constructor() {
    super({
      modelUrl: '/models/mobilenet/model.json',
      inputShape: [224, 224],
      threshold: 0.5,
      maxDetections: 10
    });
    this.labels = [];
  }

  async initialize(): Promise<void> {
    await super.initialize();
    this.labels = await fetch('/models/mobilenet/labels.json')
      .then(response => response.json());
  }

  protected async processDetections(predictions: tf.Tensor): Promise<Detection[]> {
    const scores = await predictions.data();
    const detections: Detection[] = [];

    for (let i = 0; i < scores.length; i++) {
      if (scores[i] > this.config.threshold) {
        detections.push({
          id: `${i}`,
          label: this.labels[i],
          confidence: scores[i],
          bbox: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          }
        });
      }
    }

    return detections.slice(0, this.config.maxDetections);
  }
}