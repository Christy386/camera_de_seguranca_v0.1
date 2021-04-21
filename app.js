var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var fs = require('fs');

var buffer1 = '';
var send1 = false;
var buffer2 = '';
var send2 = false;

var cmdA = '';
var cmd = '';


var readJSON = function(local){
    let string = fs.readFileSync(local)
    let object = JSON.parse(string)
    return object;
}

var writeJSON = function(obj, local){
    fs.writeFileSync(local, JSON.stringify(obj))
    console.log('Gravado:')
    console.log(obj)
    console.log('Em:')
    console.log(local)
}

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));
//app.get('/',(req,res)=>res.sendFile(path.join(__dirname, './public/index.html')));

io.on('connection', (socket) => {
    let interval1 = setInterval(() => {
        
        if (cmd != ''){
            //console.log(cmd);
            socket.emit('ESP32_msg', cmd)
            //cmdA = cmd;            
        }
        //console.log(msg);
        
    }, 10);//Tempo entre chamadas

    let interval2 = setInterval(() => {
        if(send1){
            socket.emit('camera1', buffer1);
            //console.log(buffer1);
            //send1 = false;
        }

    }, 20);//Tempo entre chamadas

    let interval3 = setInterval(() => {
        if(send2){
            socket.emit('camera2', buffer2);
            //console.log(buffer1);
            //send1 = false;
        }

    }, 20);//Tempo entre chamadas
  
    console.log('novo client com o id:', socket.id)

    socket.on('buffer1', (msg) => {
        buffer1 = msg;
        send1 = true;
    })
    socket.on('buffer2', (msg) => {
        buffer2 = msg;
        send2 = true;
    })
    


    socket.on('update', (msg) => {
    //console.log('update')
        socket.emit('update', readJSON('db/state.json'))
    })

    socket.on('move', (msg) => {
        console.log(msg)
        //socket.emit('arduino_cmd', msg)
        //writeJSON({cmd: msg}, 'sv_arduino/tmp.json')
        cmd = msg

    })

    socket.on('init_msg_esp32', (msg) => {
        console.log(msg)
    })

    socket.emit('msg', 'eu, "O servidor", digo que deixo você ficar connectado')

    socket.on('disconnect', () => {
        console.log('foi desconectado o client: ', socket.id)
    });
});