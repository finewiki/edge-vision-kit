import React, { useRef, useEffect } from 'react';
import { useWebcam } from '@edge-vision-kit/webcam-utils';

export const WebcamFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { initializeWebcam } = useWebcam();

  useEffect(() => {
    if (videoRef.current) {
      initializeWebcam(videoRef.current);
    }
  }, [initializeWebcam]);

  return (
    <div className="webcam-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
      />
    </div>
  );
};