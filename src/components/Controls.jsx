import React from "react";

const Controls = ({ blurIntensity, setBlurIntensity, threshold, setThreshold }) => {
  return (
    <div className="controls-panel">
      <h3>Adjust Sketch Settings</h3>
      <label>
        Blur Intensity:
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={blurIntensity}
          onChange={(e) => setBlurIntensity(Number(e.target.value))}
        />
      </label>
      <label>
        Threshold:
        <input
          type="range"
          min="100"
          max="255"
          step="10"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </label>
    </div>
  );
};

export default Controls;
