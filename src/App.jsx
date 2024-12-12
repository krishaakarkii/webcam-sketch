import React, { useState } from "react";
import WebcamFeed from "./components/WebcamFeed";
import SketchResult from "./components/SketchResult";
import { applyFilter } from "./utils/filters"; // Import filters logic
import "./styles/App.css";

const App = () => {
  const [filterType, setFilterType] = useState("sketch"); // Selected filter
  const [sketchImage, setSketchImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCapture = async (imageSrc) => {
    setIsProcessing(true);
    try {
      const filteredImage = await applyFilter(imageSrc, filterType);
      setSketchImage(filteredImage);
    } catch (error) {
      console.error("Error applying filter:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => setSketchImage(null);

  return (
    <div className="app">
      <h1>Webcam Sketch App</h1>
      <WebcamFeed onCapture={handleCapture} />
      <div className="filter-selector">
        <label htmlFor="filter">Choose a Filter:</label>
        <select
          id="filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="sketch">Pencil Sketch</option>
          <option value="watercolor">Watercolor</option>
          <option value="cartoon">Cartoon</option>
          <option value="oil">Oil Painting</option>
          <option value="popart">Pop Art</option>
          <option value="sepia">Sepia</option>
        </select>
      </div>
      {isProcessing && <p>Processing...</p>}
      {sketchImage && <SketchResult sketchImage={sketchImage} />}
      {sketchImage && <button onClick={handleClear}>Clear</button>}
    </div>
  );
};

export default App;
