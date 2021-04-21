const io = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on('connect', () => {
    socket.emit('init_msg', 'eu, "'+socket.id+'", digo que estou conectado')
  
    socket.on('init_msg', (msg) => {
      console.log(msg)
    })

    let interval = setInterval(() => {
        
        if(send){
            socket.emit('buffer2', buffer);
            //console.log(buffer1);
            //send1 = false;
        }

    }, 10);//Tempo entre chamadas

    
  })

var buffer = '';
var send = false;

var WebSocket = require('ws');
const WS_PORT  = 8889;

const wsServer = new WebSocket.Server({port: WS_PORT}, ()=> console.log(`WS Server is listening at ${WS_PORT}`));

let connectedClients = [];

wsServer.on('connection', (ws, req)=>{
    console.log('Connected');
    connectedClients.push(ws);
    ws.on('message', data => {

        buffer = data;
        send = true;
    });

});
