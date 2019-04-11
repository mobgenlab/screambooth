var osc = new OSC();
osc.open(); // connect by default to ws://localhost:8080
let val = 0;
var colors;
let colorIndex = 0;
let dbString = ' ';
let status = '';
let textDiv;
let averageBuff = [];
const BUFF_SIZE = 8;

function getAverageArray(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i]; //don't forget to add the base
  }

  return sum / array.length;
}



osc.on('/level', message => {
  val = message.args[0];
  if (message.args[0] * 100 < 1.0) {
    colorIndex = 0
  } else if (message.args[0] * 100 < 10.0 && message.args[0] * 100 >= 1.0) {
    colorIndex = 1;

  } else if (message.args[0] * 100 > 10.0) {
    colorIndex = 2;

  }
})

osc.on('/db', message => {
  let av = 0;
  if (averageBuff.length < BUFF_SIZE) {
    averageBuff.push(parseFloat(message.args[0]));

  } else {
    averageBuff.shift();
    averageBuff.push(parseFloat(message.args[0]));
  }
  av = Math.round(getAverageArray(averageBuff))
  dbString = av + ' dB'

  if (av > 60) {
    actRandomSeed = random(100000);

  }

  let k = 10;
  Object.keys(audioStatus).forEach(function (key) {
    if (av > key) {
      k = key;
    }
  });
  status = "You are as loud as a " + audioStatus[k];
})


let nVal; // noise value
let nInt = 190; // noise intensity
let nAmp = 10; // noise amplitude

function setupColors() {
  let c1 = color("#00FF00");
  c1.setAlpha(15);
  let c2 = color("#FFFF00");
  c2.setAlpha(15);
  let c3 = color("#FF0000");
  c3.setAlpha(15);
  colors = [c1, c2, c3];
}



'use strict';

var tileCount = 5;
var actRandomSeed = 0;

var actStrokeCap;

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.position(window.innerWidth / 2 - 300, window.innerHeight / 2 - 300);
  setupColors();


  actStrokeCap = SQUARE;
}

function draw() {
  console.log(val);
  nInt = map(val, 0, 10.0, 2.0, 100.0);
  nAmp = map(val, 0, 10, 0.5, 400.0);
  cG = map(val, 0, 1.0, 255, 0);
  // clear the background every 600 frames using mod (%) operator
  if (frameCount % 1200 == 0) {
    // background(0);
    clear()

  }
  background(colors[colorIndex]);

  strokeCap(actStrokeCap);

  randomSeed(actRandomSeed);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;

      var toggle = int(random(0, 2));

      if (toggle == 0) {
        strokeWeight(nInt + 10.0);
        stroke(0);

        line(posX, posY, posX + width / tileCount, posY + height / tileCount);
      }
      if (toggle == 1) {
        strokeWeight(nAmp + 10.0);
        stroke(255);
        line(posX, posY + width / tileCount, posX + height / tileCount, posY);
      }

      
    }
  }
}

function mousePressed() {}