var osc = new OSC();
osc.open(); // connect by default to ws://localhost:8080
let val = 0;
var colors;
let colorIndex = 0;
osc.on('/level', message => {
  val = message.args[0];
     if(message.args[0]*100 < 1.0){
      colorIndex = 0
    } else if( message.args[0]*100 < 10.0 && message.args[0]*100 >= 1.0) {
      colorIndex = 1;

    } else if (message.args[0]*100 > 10.0){
      colorIndex = 2;

    }
})
let resolution = 260; // how many points in the circle
let rad = 150;
let x = 1;
let y = 1;
//float prevX;
//float prevY;

let t = 0; // time passed
let tChange = .02; // how quick time flies

let nVal; // noise value
let nInt = 1; // noise intensity
let nAmp = 1; // noise amplitude
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  stroke(255, 15);
  noFill();
  t = 0;
  
  let c1 = color("#00FF00");
  c1.setAlpha(15);
   let c2 = color("#FFFF00");
  c2.setAlpha(15);
   let c3 = color("#FF0000");
  c3.setAlpha(15);
  colors = [c1,c2,c3];
}

function draw() {
  translate(width/2, height/2);
  
  nInt = map(val, 0, 10.0, 0.1, 40.0);
  nAmp = map(val, 0, 10, 0.0, 100.0);
  cG = map(val, 0, 1.0, 255, 0);
 // stroke(255, cG, 0, val*15);
  //console.log(cG);
  stroke(colors[colorIndex]);
  
  beginShape();
  for (var i = 0; i < 200; i++) {
    var ang = map(i, 0, 200, 0, TWO_PI);
    nVal = map(noise( cos(ang)*nInt+1, sin(ang)*nInt+1, t ), 0.0, 1.0, nAmp, 1.0); // map noise value to match the amplitude

    x = cos(ang)*rad *nVal;
    y = sin(ang)*rad *nVal;
    curveVertex(x, y);
  }
  endShape(CLOSE);
  t += tChange;

  // clear the background every 600 frames using mod (%) operator
  if (frameCount % 600 == 0) {
	background(0);
  }
}
