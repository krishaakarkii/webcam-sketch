import p5 from "p5";

// Apply the selected filter
export const applyFilter = (imageSrc, filterType) => {
  return new Promise((resolve) => {
    const sketch = (p) => {
      let inputImage;

      p.preload = () => {
        inputImage = p.loadImage(imageSrc); // Load captured image
      };

      p.setup = () => {
        const canvas = p.createGraphics(inputImage.width, inputImage.height);
        canvas.image(inputImage, 0, 0);

        switch (filterType) {
          case "sketch":
            applyPencilSketch(canvas, p);
            break;
          case "watercolor":
            applyWatercolor(canvas, p);
            break;
          case "cartoon":
            applyCartoon(canvas, p);
            break;
          case "oil":
            applyOilPainting(canvas, p);
            break;
          case "popart":
            applyPopArt(canvas, p);
            break;
          case "sepia":
            applySepia(canvas, p);
            break;
          default:
            applyPencilSketch(canvas, p);
        }

        resolve(canvas.canvas.toDataURL());
        p.noLoop();
      };
    };

    new p5(sketch);
  });
};

// Pencil Sketch Filter
const applyPencilSketch = (canvas, p) => {
  canvas.filter(p.GRAY);
  const inverted = p.createGraphics(canvas.width, canvas.height);
  inverted.image(canvas, 0, 0);
  inverted.filter(p.INVERT);
  inverted.filter(p.BLUR, 10);
  canvas.loadPixels();
  inverted.loadPixels();

  for (let i = 0; i < canvas.pixels.length; i += 4) {
    const blended = canvas.pixels[i] / (255 - inverted.pixels[i]) * 255;
    canvas.pixels[i] = canvas.pixels[i + 1] = canvas.pixels[i + 2] =
      Math.min(255, blended);
  }

  canvas.updatePixels();
};

// Watercolor Filter
const applyWatercolor = (canvas, p) => {
    // Step 1: Apply an initial blur to soften the image
    canvas.filter(p.BLUR, 8);

    // Step 2: Posterize with more levels for smoother color transitions
    canvas.filter(p.POSTERIZE, 10);

    // Step 3: Add subtle noise texture to simulate watercolor granularity
    const noiseCanvas = p.createGraphics(canvas.width, canvas.height);
    noiseCanvas.loadPixels();
    for (let i = 0; i < noiseCanvas.pixels.length; i += 4) {
      const noise = p.random(220, 255); // Fine noise
      noiseCanvas.pixels[i] = noise;
      noiseCanvas.pixels[i + 1] = noise;
      noiseCanvas.pixels[i + 2] = noise;
      noiseCanvas.pixels[i + 3] = 20; // Low opacity
    }
    noiseCanvas.updatePixels();
    canvas.image(noiseCanvas, 0, 0);

    // Step 4: Overlay a light gradient for a watercolor wash effect
    const gradientCanvas = p.createGraphics(canvas.width, canvas.height);
    gradientCanvas.noFill();
    gradientCanvas.colorMode(p.HSB, 360, 100, 100);
    for (let y = 0; y < canvas.height; y++) {
      const hue = p.map(y, 0, canvas.height, 180, 360); // Gradient from green to pink
      gradientCanvas.stroke(hue, 20, 90, 0.1); // Low saturation and opacity
      gradientCanvas.line(0, y, canvas.width, y);
    }
    canvas.image(gradientCanvas, 0, 0);

    // Step 5: Apply a final light blur to smooth everything together
    canvas.filter(p.BLUR, 3);
  };



// Cartoon Filter
const applyCartoon = (canvas, p) => {
  canvas.filter(p.POSTERIZE, 5); // Reduce color levels
  const edgeCanvas = p.createGraphics(canvas.width, canvas.height);
  edgeCanvas.image(canvas, 0, 0);
  edgeCanvas.filter(p.GRAY); // Grayscale for edges
  edgeCanvas.filter(p.THRESHOLD, 0.4); // Detect edges
  canvas.image(edgeCanvas, 0, 0, canvas.width, canvas.height); // Blend edges
};

// Oil Painting Filter
const applyOilPainting = (canvas, p) => {
  canvas.filter(p.BLUR, 4); // Smooth brush strokes
  canvas.filter(p.POSTERIZE, 7); // Textured look
};

// Pop Art Filter
const applyPopArt = (canvas, p) => {
  canvas.filter(p.THRESHOLD, 0.5); // High contrast
  canvas.filter(p.POSTERIZE, 6); // Bold color tones
  canvas.filter(p.INVERT); // Inverted colors
};

// Sepia Filter
const applySepia = (canvas, p) => {
  canvas.filter(p.GRAY);
  canvas.loadPixels();

  for (let i = 0; i < canvas.pixels.length; i += 4) {
    const r = canvas.pixels[i];
    const g = canvas.pixels[i + 1];
    const b = canvas.pixels[i + 2];

    // Sepia tone transformation
    canvas.pixels[i] = r * 0.393 + g * 0.769 + b * 0.189;
    canvas.pixels[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
    canvas.pixels[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
  }

  canvas.updatePixels();
};
