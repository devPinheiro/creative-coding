const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
  animate: true, // Enable animation
  fps: 60, // Set frames per second
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    // Fill black background
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    // Create static noise effect
    const pixelSize = 4; // Size of each "static" pixel
    
    for (let x = 0; x < width; x += pixelSize) {
      for (let y = 0; y < height; y += pixelSize) {
        // Generate random grayscale value
        const noise = Math.random();
        
        // Add some temporal variation based on frame
        const timeNoise = Math.tanh(frame * 0.1 + x * 0.01 + y * 0.01) * 0.1;
        
        // Create grayscale value
        const grayscale = Math.min(Math.max(noise + timeNoise, 0), 1);
        
        context.fillStyle = `rgba(255, 255, 255, ${grayscale})`;
        
        // Randomly skip some pixels for more dynamic effect
        if (Math.random() > 0.1) {
          context.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    }

    // Add horizontal scanning line
    const scanLineY = (height * 0.5) + Math.sin(frame * 0.1) * height * 0.4;
    context.fillStyle = 'rgba(255, 255, 255, 0.2)';
    context.fillRect(0, scanLineY, width, 10);
  };
};

canvasSketch(sketch, settings);