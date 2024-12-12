// Function for image processing

export const processSketch = (inputImage) => {
    return new Promise((resolve) => {
      // Create a temporary canvas for processing
      const tempCanvas = createGraphics(inputImage.width, inputImage.height);

      // Draw the input image onto the temporary canvas
      tempCanvas.image(inputImage, 0, 0, inputImage.width, inputImage.height);

      // Convert the image to grayscale
      tempCanvas.filter(GRAY);

      // Apply an edge-detection algorithm (e.g., Sobel filter)
      tempCanvas.loadPixels();
      const pixels = tempCanvas.pixels;
      const width = tempCanvas.width;
      const height = tempCanvas.height;

      const newPixels = new Uint8ClampedArray(pixels.length);

      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          // Calculate index in pixel array
          const i = (y * width + x) * 4;

          // Sobel filter kernels for edge detection
          const Gx =
            -1 * pixels[((y - 1) * width + (x - 1)) * 4] +
            1 * pixels[((y - 1) * width + (x + 1)) * 4] +
            -2 * pixels[(y * width + (x - 1)) * 4] +
            2 * pixels[(y * width + (x + 1)) * 4] +
            -1 * pixels[((y + 1) * width + (x - 1)) * 4] +
            1 * pixels[((y + 1) * width + (x + 1)) * 4];

          const Gy =
            -1 * pixels[((y - 1) * width + (x - 1)) * 4] +
            -2 * pixels[((y - 1) * width + x) * 4] +
            -1 * pixels[((y - 1) * width + (x + 1)) * 4] +
            1 * pixels[((y + 1) * width + (x - 1)) * 4] +
            2 * pixels[((y + 1) * width + x) * 4] +
            1 * pixels[((y + 1) * width + (x + 1)) * 4];

          const edge = Math.sqrt(Gx * Gx + Gy * Gy);

          newPixels[i] = newPixels[i + 1] = newPixels[i + 2] = edge > 128 ? 255 : 0; // Binarize edges
          newPixels[i + 3] = 255; // Set alpha channel
        }
      }

      // Update the canvas pixels with the new data
      tempCanvas.loadPixels();
      for (let i = 0; i < pixels.length; i++) {
        tempCanvas.pixels[i] = newPixels[i];
      }
      tempCanvas.updatePixels();

      // Resolve the final image as a data URL
      resolve(tempCanvas.canvas.toDataURL());
    });
  };
