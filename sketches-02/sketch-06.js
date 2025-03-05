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
   
    
    const clock = 24

    for (let i = 0; i < clock; i++) {
      context.save()
      const slice = math.degToRad(360 / clock);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(2, 0.5), 1);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h );
      context.fill();
      context.restore()

      context.save()
      context.beginPath()
      context.arc(cx, cy, radius * random.range(0.5, 1.5), 0, Math.PI * 2, false)
      context.lineWidth = 4
      context.strokeStyle = 'black'
      context.stroke()
      context.restore()

    }
  
    
  };
};

canvasSketch(sketch, settings);
