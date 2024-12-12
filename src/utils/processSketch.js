import p5 from "p5";

export const processSketch = (imageSrc) => {
  return new Promise((resolve) => {
    const sketch = (p) => {
      let inputImage;

      p.preload = () => {
        inputImage = p.loadImage(imageSrc); // Load the captured image
      };

      p.setup = () => {
        const tempCanvas = p.createGraphics(inputImage.width, inputImage.height);

        // Convert the image to grayscale
        tempCanvas.image(inputImage, 0, 0);
        tempCanvas.filter(p.GRAY);

        // Invert the grayscale image
        const invertedCanvas = p.createGraphics(inputImage.width, inputImage.height);
        invertedCanvas.image(tempCanvas, 0, 0);
        invertedCanvas.filter(p.INVERT);

        // Apply Gaussian Blur to the inverted image
        invertedCanvas.filter(p.BLUR, 10);

        // Blend the grayscale and blurred inverted images (Dodge blend)
        const finalCanvas = p.createGraphics(inputImage.width, inputImage.height);
        finalCanvas.image(tempCanvas, 0, 0);
        finalCanvas.loadPixels();
        invertedCanvas.loadPixels();

        const pixels = finalCanvas.pixels;
        const invertedPixels = invertedCanvas.pixels;

        for (let i = 0; i < pixels.length; i += 4) {
          const blended = pixels[i] / (255 - invertedPixels[i]) * 255;
          pixels[i] = pixels[i + 1] = pixels[i + 2] = Math.min(255, blended);
        }

        finalCanvas.updatePixels();

        // Return the final canvas as a data URL
        resolve(finalCanvas.canvas.toDataURL());
        p.noLoop(); // Stop the loop
      };
    };

    // Initialize p5.js with the sketch
    new p5(sketch);
  });
};
