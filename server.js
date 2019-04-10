// server.js
// where your node app starts

// init project
// OSC
const OSC = require('osc-js')

const options = {
  "httpServer": {
    "host": "0.0.0.0",
    "port": 3000
  },
  "staticFolderName": "dist",
  "udpClient": {
    "host": "localhost",
    "port": 9012
  },
  "udpServer": {
    "host": "localhost",
    "port": 2010
  },
  "wsServer": {
    "host": "0.0.0.0",
    "port": 8080
  }
}




var colors = ["00FF00", "FFFF00", "FF0000"];


const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 5000);


app.use(express.static('public'));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(2001, function () {
  console.log('Your express app is listening on port ' + listener.address().port);
});
const osc = new OSC({
      plugin: new OSC.BridgePlugin(options)
    })
    osc.open()
    
    osc.on('open', () => {
      console.log(`✔ osc bridge ready`);
    });
    
    osc.on('/level', message => {
      // led.intensity(message.args[0]*200);
      // if(message.args[0]*100 < 1.0){
      //   led.color(colors[0]);
      // } else if( message.args[0]*100 < 10.0 && message.args[0]*100 >= 1.0) {
      //   led.color(colors[1]);
  
      // } else if (message.args[0]*100 > 10.0){
      //   led.color(colors[2]);
  
      // }
    })
  

// //Johnny Five
// var five = require("johnny-five");
// var led;

// five.Board().on("ready", function() {

//   // Initialize the RGB LED
//   led = new five.Led.RGB({
//     pins: {
//       red: 6,
//       green: 3,
//       blue: 5
//     }
//   });



//   // Add led to REPL (optional)
//   this.repl.inject({
//     led: led
//   });

//   // Turn it on and set the initial color
//   led.on();
//   led.color("#00FF00");


//   const osc = new OSC({
//     plugin: new OSC.BridgePlugin(options)
//   })
//   osc.open()
  
//   osc.on('open', () => {
//     console.log(`✔ osc bridge ready`);
//   });
  
//   osc.on('/level', message => {
//     led.intensity(message.args[0]*200);
//     if(message.args[0]*100 < 1.0){
//       led.color(colors[0]);
//     } else if( message.args[0]*100 < 10.0 && message.args[0]*100 >= 1.0) {
//       led.color(colors[1]);

//     } else if (message.args[0]*100 > 10.0){
//       led.color(colors[2]);

//     }
//   })

  
// });


