

// const express = require('express')
// const app = express()


module.exports = (app, server) => {
  const io = require('socket.io')(server);

  io.on('connection', client => {
    console.log('Client connected!')
  
    client.on('data', data => { 
      io.sockets.emit('data', data)
    });
  
    client.on('disconnect', () => { /* … */ });
  });

}

