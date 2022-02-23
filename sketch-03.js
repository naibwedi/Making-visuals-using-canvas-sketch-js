const canvasSketch = require('canvas-sketch');
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};


// animating frame using vannela js
// const animate = () => {
//   console.log("domestika");
//   requestAnimationFrame(animate);
//
// }
// animate();

const sketch = ({ context, width, height }) => {
  const  agents = [];

  for (let i = 0; i < 50; i++) {
    const  x = random.range(0,width);
    const  y = random.range(0,height);
    agents.push(new Agent(x,y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i+1; j < agents.length; j++) {
         const  other = agents[j];

         const dist = agent.pos.getDistanse(other.pos);

         if (dist > 200 ) continue;

         context.fillStyle="#32ef08";
         context.strokeStyle="#0ff0fc";
         context.lineWidth = math.mapRange(dist,0,200,10,1);

         context.beginPath();
         context.moveTo(agent.pos.x,agent.pos.y);
         context.lineTo(other.pos.x,other.pos.y);
         context.stroke();
      }
    }


  agents.forEach(agent =>{
    // agent.bounce(width,height)

    agent.update();
    agent.wrap(width,height)
    agent.draw(context);
  });

  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;

  }
  getDistanse(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x,y) {
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-2,2),random.range(-2,2));
    this.radius = random.range(5,14);
  }

   bounce (width,height){
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *=-1;
     if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *=-1;
   }

   wrap (width,height){
    if ( this.pos.x > width) this.pos.x= 0;
     else if (this.pos.y < 0 ) this.pos.y= height;
     else if (this.pos.x <0 ) this.pos.x= width;
     else if ( this.pos.y > height) this.pos.y= 0;
   }
  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

  }

  draw(context){
    context.save()
    context.translate(this.pos.x,this.pos.y)

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0,0,this.radius,0,Math.PI*2)
    context.fill()
    context.stroke();

    context.restore();
  }
}


