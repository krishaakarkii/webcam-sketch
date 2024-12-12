//component for webcam feed

import React, { useRef } from "react";
import Webcam from "react-webcam";

const WebcamFeed = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc); // Pass captured image to parent
  };

  return (
    <div className="webcam-feed">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
      />
      <button onClick={captureImage}>Capture</button>
    </div>
  );
};

export default WebcamFeed;
