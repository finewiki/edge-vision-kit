export class ModelError extends Error {
  constructor(message: string, public originalError: unknown) {
    super(message);
    this.name = 'ModelError';
  }
}

export interface PredictionResult {
  predictions: number[];
  confidence: number;
  inferenceTime: number;
}

export interface ModelMetrics {
  inferenceTime: number;
  memoryUsage: number;
  timestamp: number;
}