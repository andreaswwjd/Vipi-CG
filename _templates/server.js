
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

// CasparCG connection
const { CasparCG } = require('casparcg-connection')
var connection = undefined
var cgHost = 'localhost'
var cgPort = '5250'

// Handlers
const { sessionHandler  } = require('./handlers/sessionHandler')
const { libraryHandler  } = require('./handlers/libraryHandler')
const { producerHandler } = require('./handlers/producerHandler')
// const { clientHandler   } = require('./handlers/clientHandler')


const connect = async ()=>{
  connection = await new CasparCG(cgHost, cgPort);

  connection.onConnected = async () => {
    console.log(`CasparCG connected on ${cgHost}:${cgPort}!`)
    // addTemplate({templateName: 'Sangplatta'})
    let CGPaths = await connection.getCasparCGPaths();

    if (CGPaths.template) {
      
      // Copy template to Caspar templates folder
      let template = path.join(path.dirname(process.execPath), templateName)
      let templatesFolder = path.join(CGPaths.template, '_VipiCG/')
      try {
        await fs.mkdir(templatesFolder)
        await fs.copy(template, templatesFolder);
      } catch(err) {
        if (err) {
          console.log(`
    Could not copy templates to the Caspar CG template directory! 
    Be shore to have the templates in the same directory as the program!
    `); 
        } 
      }
    }
  }
}



const serve = async app => {
  app.use(express.static(path.join(__dirname, './')))
  await connect()
  
  io.on('connection', client => {
    console.log('Client connected!')
    client.watchers = {}

    // Session
    sessionHandler(io, client)
    libraryHandler(io, client)
    producerHandler(io, client, connection)
    // clientHandler(io, client, connection)
  
    client.on('disconnect', () => { /* … */ });
  });
  
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  })
  
}

serve(app)

server.listen(port, () => console.log(`
 
ANVISNINGAR

GUI:
 - Öppna en webbrowser och navigera till http://${ipAddress}:${port}/songs.
 - Här kan du skapa nya textfiler.
 - Det går också att lägg till .txt filer i samma mapp som programfilen.

 `))
