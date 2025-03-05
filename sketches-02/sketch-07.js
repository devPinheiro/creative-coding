const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const settings = {
  dimensions: [ 2048, 2048 ]
};


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    const w = width * 0.01;
    const h = height * 0.1;
    const cx = width  * 0.5;
    const cy = height  * 0.5;

    let x,y

    const radius = width * 0.3

 
   
    context.fillStyle = 'black';
   

  };
};

canvasSketch(sketch, settings);
