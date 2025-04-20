import React, { useEffect, useRef, useState } from 'react';
import { WebcamManager, FrameProcessor } from '@edge-vision-kit/webcam-utils';
import { SessionManager } from '@edge-vision-kit/vision-core';

export const ObjectDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const webcamManager = useRef(new WebcamManager());
  const frameProcessor = useRef<FrameProcessor | null>(null);
  const sessionManager = useRef(new SessionManager({
    modelUrl: '/models/mobilenet/model.json',
    inputShape: [224, 224],
    autoWarmup: true
  }));

  useEffect(() => {
    let animationFrame: number;
    let isProcessing = false;

    const processFrame = async () => {
      if (!isProcessing && frameProcessor.current && videoRef.current) {
        isProcessing = true;
        try {
          const frame = frameProcessor.current.captureFrame(videoRef.current);
          const result = await sessionManager.current.runInference(frame);
          
          if (canvasRef.current && result.predictions.length > 0) {
            frameProcessor.current.drawDetections(result.predictions);
          }
        } catch (err) {
          console.error('Frame processing error:', err);
        }
        isProcessing = false;
      }
      animationFrame = requestAnimationFrame(processFrame);
    };

    const initialize = async () => {
      try {
        await sessionManager.current.initialize();
        const stream = await webcamManager.current.initialize();
        
        if (videoRef.current) {
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              frameProcessor.current = new FrameProcessor(
                videoRef.current.videoWidth,
                videoRef.current.videoHeight
              );
              setIsReady(true);
              processFrame();
            }
          };
          webcamManager.current.attachVideo(videoRef.current);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Initialization failed');
      }
    };

    initialize();

    return () => {
      cancelAnimationFrame(animationFrame);
      webcamManager.current.stop();
      sessionManager.current.dispose();
    };
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="object-detection">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="detection-canvas"
      />
      {!isReady && <div className="loading">Loading...</div>}
    </div>
  );
};