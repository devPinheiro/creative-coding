const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
  // fps: 60
};

const animate = () => {
  console.log('hey');
  requestAnimationFrame(animate)
}
// animate()
const sketch = ({ width, height}) => {
  const agents = []

    for (let i = 0; i < 120; i++) {
      const x = random.range(0, width)
      const y = random.range(0, height)
      const r = random.range(5, 15) 

        agents.push(new Agent(x,y,r))
      }
  
    return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    agents.forEach(agent => {
      agent.update()
      agent.draw(context)
      agent.bounce(width, height)
      // agent.wrap(width, height)
      
    })

  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x,y) {
  this.x = x
  this.y = y
  }

}

class Agent {
  constructor(x,y,r){
    this.pos = new Vector(x,y)
    this.vel = new Vector(random.range(1,-1), random.range(0,-1))
    this.r = r
  }
 
  bounce(width, height){
    if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1
    if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1
  }

  wrap(width, height){
    if ( this.pos.x > width) this.pos.x = 0
    if ( this.pos.y > height) this.pos.y = 0
  }

  update(){
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  draw(context){
    context.fillStyle = 'black';
    
    context.save()
    context.translate(this.pos.x, this.pos.y,)

    context.beginPath()
    context.arc(0,0, this.r, 0, Math.PI * 2)
    context.fill()
  
    context.restore()
  }
}