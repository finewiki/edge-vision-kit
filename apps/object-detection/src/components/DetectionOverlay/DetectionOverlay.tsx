import React from 'react';

interface Detection {
  id: string;
  label: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface DetectionOverlayProps {
  detections: Detection[];
}

export const DetectionOverlay: React.FC<DetectionOverlayProps> = ({ detections }) => {
  return (
    <div className="detection-overlay">
      {detections.map((detection) => (
        <div
          key={detection.id}
          className="bounding-box"
          style={{
            position: 'absolute',
            left: `${detection.bbox.x}px`,
            top: `${detection.bbox.y}px`,
            width: `${detection.bbox.width}px`,
            height: `${detection.bbox.height}px`,
          }}
        >
          <span className="label">
            {detection.label} ({(detection.confidence * 100).toFixed(1)}%)
          </span>
        </div>
      ))}
    </div>
  );
};