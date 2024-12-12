//component to display sketch result

import React from "react";

const SketchResult = ({ sketchImage }) => {
  return (
    <div className="sketch-result">
      <h3>Sketch Result</h3>
      {sketchImage ? (
        <img src={sketchImage} alt="Sketch" />
      ) : (
        <p>No image captured yet!</p>
      )}
    </div>
  );
};

export default SketchResult;
