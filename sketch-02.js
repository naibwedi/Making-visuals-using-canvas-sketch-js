const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math') //importing library instead of creating functions
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate : true

};
// this changes the value from degree we input to radian
 const degToRad = (degrees) => {
   return degrees / 180 * Math.PI;
 }
// this is fuction for min and max value in random
 const randomRange = (min,max) => {
   return Math.random() * (max - min) + min;
 }
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = "red";

    const cx = width  * 0.5;
    const cy = height * 0.5;
    const w = width  * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 20;
    const radius = width * 0.3;

    for (i = 0 ; i < num; i++ ){

      const slice =math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);


      context.save(); //
      context.translate(x,y);
      context.rotate(-angle);
      context.scale(random.range(0.5,2),random.range(0.2,0.5));

      context.beginPath();
      context.rect(-w * 0.5,-h * 0.5,w,h);
      context.fill();

      context.restore();



    }

    for (i = 0 ; i < num; i++ ){

      const slice =math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      // creating arc trasnformation

      context.fillStyle = "white";
      context.save();
      context.translate(cx,cy);
      context.rotate(-angle);

      context.lineWidth= random.range(5,20)


      context.beginPath();
      context.arc(0,0,radius * random.range(0.5,1.3),slice * random.range(1,-5),slice * 5 );
      context.stroke();
      context.restore();

      }

    context.fillStyle="black";
    context.beginPath();
    context.arc(cx,cy,20,0,2*Math.PI);
    context.fill();
    context.stroke();
  };
};

canvasSketch(sketch, settings);
