# Webcam Sketch

Webcam Sketch is a web application that uses a webcam to capture a photo and transforms it into a sketch-like rendition, resembling a pencil drawing or line art. This application leverages modern web technologies and image processing techniques to deliver a creative and intuitive user experience.

## Features

### Webcam Integration
- Access the webcam to preview and capture photos directly from the browser.

### Image Processing
- Convert images to grayscale.
- Apply edge detection algorithms for sketch-like effects.
- Optional image blending for enhanced styles.

### User Interface
- Real-time preview of the webcam feed.
- Easy-to-use controls for capturing and processing images.
- Adjustable effect intensity and style options.

### Export Options
- Download processed images.
- Share directly to social media platforms.

## Technologies Used

### Frontend
- JavaScript
- React.js (created using Vite)
- HTML5 Canvas API or p5.js for image manipulation
- WebRTC API for webcam access

### Backend (Optional)
- FastAPI or Node.js for additional processing (if required for advanced features).

## Installation

To set up the project locally:

1. Clone the repository:
    ```bash
    git clone git@github.com:krishaakarkii/webcam-sketch.git
    cd webcam-sketch
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to the local server (default: http://localhost:5173).

## Usage

1. Open the application in your browser.
2. Grant webcam access when prompted.
3. Preview the webcam feed.
4. Capture a photo and apply the sketch effect.
5. Adjust settings to customize the output.
6. Download or share the processed image.

## Roadmap

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes and push to your branch:
    ```bash
    git commit -m "Add new feature"
    git push origin feature-name
    ```
4. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- OpenCV.js: For edge detection and image processing.
- React.js: For building the user interface.
- WebRTC API: For seamless webcam integration.

## Contact

For questions or feedback, please contact Krisha Karki.