export interface VideoConfig {
  facingMode?: 'user' | 'environment';
  width?: number;
  height?: number;
  frameRate?: number;
}

export class StreamError extends Error {
  constructor(message: string, public originalError: unknown) {
    super(message);
    this.name = 'StreamError';
  }
}

export interface FrameMetadata {
  timestamp: number;
  width: number;
  height: number;
}

export interface DeviceInfo {
  id: string;
  label: string;
  kind: 'videoinput';
}


export interface StreamStatus {
  isActive: boolean;
  deviceId: string | null;
  error: Error | null;
}

export interface VideoConstraints extends MediaTrackConstraints {
  facingMode?: 'user' | 'environment';
  width?: number | { ideal: number };
  height?: number | { ideal: number };
  frameRate?: number | { ideal: number };
}