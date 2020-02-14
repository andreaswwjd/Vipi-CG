
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const path = require('path')
// const fs = require("fs-extra");
const port = 3000

io.on('connection', client => {
  console.log('Client connected!')

  client.on('data', data => { 
    io.sockets.emit('data', data)
  });

  client.on('disconnect', () => { /* … */ });
});

server.listen(port, () => console.log(`Socket.io server running on port ${port}.`))