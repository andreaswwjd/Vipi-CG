
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

let direcotory
if(process.env.NODE_ENV === 'server') {
  direcotory = __dirname
} else {
  direcotory = path.dirname(process.execPath)
}


const serve = async app => {
  app.use(express.static(path.join(__dirname, './')))
  app.use(express.static(path.join(direcotory, './media/')))

  await connectToCaspar()
  
  io.on('connection', client => {
    console.log('Client connected!')
    client.watchers = {}

    // Handlers
    sessionHandler(io, client)
    libraryHandler(io, client)
    producerHandler(io, client)

    client.on('media_list', async (dir = '') => { 

      // Read sessions direcotory
      let list = await fs.readdir(path.join(direcotory, `./media/${dir}`))
  
      // Send session list to client
      client.emit('media_list', list)
  
      console.log('LIST Media: ', list.filter(file=>file!='.DS_Store')) // DELETE
    });
  
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
