import { 
  VideoConfig, 
  StreamError, 
  DeviceInfo 
} from './types.js';

export class WebcamManager {
  private stream: MediaStream | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private currentDevice: DeviceInfo | null = null;
  private isInitialized: boolean = false;

  async initialize(config: VideoConfig = {}): Promise<MediaStream> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new StreamError('WebRTC is not supported in this browser', null);
    }

    try {
      if (this.stream) {
        this.stop();
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: config.facingMode || 'environment',
          width: { ideal: config.width || 1280 },
          height: { ideal: config.height || 720 },
          frameRate: { ideal: config.frameRate || 30 }
        }
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (!this.stream.active) {
        throw new StreamError('Stream is not active', null);
      }

      return this.stream;
    } catch (error) {
      if (error instanceof Error) {
        throw new StreamError(`Failed to initialize webcam: ${error.message}`, error);
      }
      throw new StreamError('Failed to initialize webcam', error);
    }
  }

  attachVideo(videoElement: HTMLVideoElement): void {
    if (!videoElement) {
      throw new Error('Video element is required');
    }

    this.videoElement = videoElement;
    
    if (this.stream) {
      this.videoElement.srcObject = this.stream;
      this.videoElement.onloadedmetadata = () => {
        this.videoElement?.play().catch(error => {
          console.error('Failed to play video:', error);
        });
      };
    }
  }

  stop(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
        this.stream?.removeTrack(track);
      });
      this.stream = null;
    }
    
    if (this.videoElement) {
      this.videoElement.srcObject = null;
      this.videoElement.removeAttribute('src');
      this.videoElement = null;
    }
  }

  isActive(): boolean {
    return this.stream !== null && this.stream.active;
  }
}