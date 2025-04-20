export class FrameProcessor {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    this.context = ctx;
  }

  captureFrame(video: HTMLVideoElement): ImageData {
    this.context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
    return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  drawDetections(detections: any[]): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    detections.forEach(detection => {
      const { bbox, label, confidence } = detection;
      
      this.context.strokeStyle = '#00ff00';
      this.context.lineWidth = 2;
      this.context.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
      
      this.context.fillStyle = '#00ff00';
      this.context.font = '16px Arial';
      this.context.fillText(
        `${label} ${(confidence * 100).toFixed(1)}%`,
        bbox.x,
        bbox.y - 5
      );
    });
  }
}