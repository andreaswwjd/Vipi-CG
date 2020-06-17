
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
const { settingsHandler } = require('./handlers/settingsHandler')
const { sessionHandler  } = require('./handlers/sessionHandler')
const { libraryHandler  } = require('./handlers/libraryHandler')
const { producerHandler, connectToCaspar } = require('./handlers/producerHandler')

//
let isPkg = !(process.env.NODE_ENV === 'server')

const serve = async app => {
  
  // Settings
  let { 
    directory, 
    current_session, 
    caspar_connection, 
    views 
  } = await fs.readJSON(path.join(__dirname, `./settings.json`), 'utf8')

  // Directory sanitation
  if(/^\./.test(directory) || directory == "") {
    directory = path.join( (isPkg ? path.dirname(process.execPath) : __dirname), directory)
  }
  
  app.use(express.static(path.join(__dirname, './')))
  app.use(express.static(path.join(directory, './media/')))

  await connectToCaspar()
  
  io.on('connection', async client => {
    console.log('Client connected!')
    client.watchers = {}

    // Handlers
    sessionHandler(io, client, directory, current_session)
    libraryHandler(io, client, directory, current_session)
    producerHandler(io, client, caspar_connection, views)

    client.on('media_list', async (dir = '') => { 

      // Read sessions directory
      let list = await fs.readdir(path.join(directory, `./media/${dir}`))
  
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
