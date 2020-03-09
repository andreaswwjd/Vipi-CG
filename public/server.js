
// Network
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// System
const path = require('path')
const fs = require('fs-extra')
const ip = require('ip')

const ipAddress = ip.address()
const port = 3000

// Handlers
const { sessionHandler  } = require('./handlers/sessionHandler')
const { libraryHandler  } = require('./handlers/libraryHandler')
const { producerHandler, connectToCaspar } = require('./handlers/producerHandler')
// const { clientHandler   } = require('./handlers/clientHandler')



const serve = async app => {
  app.use(express.static(path.join(__dirname, './')))
  await connectToCaspar()
  
  io.on('connection', client => {
    console.log('Client connected!')
    client.watchers = {}

    // Handlers
    sessionHandler(io, client)
    libraryHandler(io, client)
    producerHandler(io, client)
  
    client.on('disconnect', () => { /* … */ });
  });
  
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  })
  
}

serve(app)

server.listen(port, () => console.log(`
 
Vipi CG panel is now awailable at: 
    http://${ipAddress}:${port}
    http://localhost:${port}

 `))
