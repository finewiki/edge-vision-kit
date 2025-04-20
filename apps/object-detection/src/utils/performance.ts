export class PerformanceMonitor {
  private timestamps: number[] = [];
  private readonly maxSamples: number = 30;

  addTimestamp(): void {
    this.timestamps.push(performance.now());
    if (this.timestamps.length > this.maxSamples) {
      this.timestamps.shift();
    }
  }

  getFPS(): number {
    if (this.timestamps.length < 2) return 0;
    
    const timeElapsed = this.timestamps[this.timestamps.length - 1] - this.timestamps[0];
    return (this.timestamps.length - 1) / (timeElapsed / 1000);
  }

  reset(): void {
    this.timestamps = [];
  }
}