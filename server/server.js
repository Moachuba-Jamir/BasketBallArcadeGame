const WebSocket = require('ws');
const {SerialPort} = require('serialport');


const wss = new WebSocket.Server({port:7070});
var readings;


// arduino connection using serial port 
const arduinoPort = new SerialPort({path:'COM3', baudRate: 9600,});

arduinoPort.on('open', ()=>{
  console.log("Arduino has been connected!");
});

//frontend user connection
wss.on('connection', (user)=>{
  console.log("user connected!");

  // sending the readings from arduino to the client.js in real time(as long as the conection is open)
  arduinoPort.on('data', (data)=>{
    readings = parseInt(data);
    // console.log(readings);
    user.send(readings);
  });
  
});

// user disconnect 
wss.on('close', ()=>{
  console.log("Client has left the conection!");
});

