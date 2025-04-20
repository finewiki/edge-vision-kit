import * as tf from '@tensorflow/tfjs';

export interface Detection {
  id: string;
  label: string;
  confidence: number;
  bbox: BoundingBox;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ModelConfig {
  modelUrl: string;
  inputShape: [number, number];
  threshold: number;
  maxDetections: number;
}