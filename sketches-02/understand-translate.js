const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1048, 1048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const w = width * 0.2;
    const h = height * 0.2;
    const x = width  * 0.5;
    const y = height  * 0.5;
    // context.fillRect(x, y, w, h);

    context.save();
    context.translate(x, y); 
    // context.rotate(0.3);
    // context.fillStyle = 'red';
    // context.fillRect(-w / 2, -h / 2, w, h);

    context.beginPath();
    context.rect(-w / 2, -h / 2, w, h);
    context.fill();
    context.restore()

    context.save();
    context.translate(x, 100);

    context.beginPath();
    context.arc(0, 0, 50, 0, Math.PI * 2);
    context.fill();
    context.restore()
 
  };
};

canvasSketch(sketch, settings);
