const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express();

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

const server = require('http').createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('numberAdded', function(number){
    socket.broadcast.emit('numberAdded', number);
  });
});

const port = process.env.PORT || 3000;

server.listen(port, ()=> console.log(`listening on port ${port}`));
