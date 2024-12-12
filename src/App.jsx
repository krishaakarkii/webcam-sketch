import React, { useState } from "react";
import WebcamFeed from "./components/WebcamFeed";
import SketchResult from "./components/SketchResult";
import Controls from "./components/Controls";
import { processSketch } from "./utils/processSketch";
import "./styles/App.css";

const App = () => {
  const [sketchImage, setSketchImage] = useState(null); // Stores the sketch result
  const [isProcessing, setIsProcessing] = useState(false); // Indicates processing state
  const [blurIntensity, setBlurIntensity] = useState(5); // Adjustable blur intensity
  const [threshold, setThreshold] = useState(180); // Adjustable brightness threshold

  const handleCapture = async (imageSrc) => {
    setIsProcessing(true);
    try {
      const sketch = await processSketch(imageSrc, blurIntensity, threshold);
      setSketchImage(sketch); // Set processed image as the sketch
    } catch (error) {
      console.error("Error processing sketch:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setSketchImage(null); // Clear the current sketch
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = sketchImage;
    link.download = "sketch.png";
    link.click();
  };

  return (
    <div className="app">
      <h1>Webcam Sketch App</h1>
      <WebcamFeed onCapture={handleCapture} />
      <Controls
        blurIntensity={blurIntensity}
        setBlurIntensity={setBlurIntensity}
        threshold={threshold}
        setThreshold={setThreshold}
      />
      {isProcessing && <p>Processing...</p>}
      {sketchImage && (
        <div className="controls">
          <SketchResult sketchImage={sketchImage} />
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
};

export default App;
