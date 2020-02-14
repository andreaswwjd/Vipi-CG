// TODO:
// Separate songtemplate logic to separate file.

const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path')
const fs = require("fs-extra");
const port = 3000

var ip = require('ip');
ipAddress = ip.address()
const { CasparCG } = require("casparcg-connection");

// CasparCG connection
var connection = undefined
var cgHost = 'localhost'
var cgPort = '5250'

const connect = async ()=>{
  connection = await new CasparCG(cgHost, cgPort);

  connection.onConnected = () => {
    console.log(`CasparCG connected on ${cgHost}:${cgPort}!`)
    addTemplate({templateName: 'sangplatta'})
  }
}



const serve = async app => {
  app.use(express.static(path.join(__dirname, './')))
  let session = JSON.parse(fs.readFileSync(path.join(__dirname, 'session.txt')))
  await connect()
  
  io.on('connection', client => {
    console.log('Client connected!')
    
    client.on('ready', () => { 
      io.sockets.emit('lastSession', session)
    });
  
  
    client.on('saveSession', (data) => { 
      session[data.key] = data.value
      fs.writeFileSync('session.txt', JSON.stringify(session))
    });

    client.on('connect', ({host, port}) =>{
      if (host) cgHost = host
      if (port) cgPort = port
      connect()
    })

    client.on('add', options =>{
      addTemplate(options)
    })
  
  
    client.on('getSongs', () => { 

      const filenames = fs.readdirSync(path.dirname(process.execPath))
      const songfilenames = filenames.filter(file => /.*\.txt$/.test(file) && file != 'session.txt')
      const songs = songfilenames.map(filename => parse(filename, fs.readFileSync(path.join(path.dirname(process.execPath), filename), 'utf8')))
      io.sockets.emit('songs', songs)

    });
  
    client.on('saveSong', (song) => { 
      console.log('Saving '+song.file)
      fs.writeFileSync(path.join(path.dirname(process.execPath), song.file), song.f0+'\n'+song.f1+'\n'+song.f2+'\n')
    });

    client.on('data', ({event, data, channel = 1, layer = 700, flashLayer = 1, playOnLoad = 0}) => {
      // TODO: Make this work with any template
      // BUG: Now every time a control-client plays any template, the template added will be affected as well...
      // FIX: Make control-client define layer and channel!
      if (/.?_play$/.test(event)) {
        console.log('PLAY', channel, layer, flashLayer)
        //connection.cgAdd(channel, layer, flashLayer, "_sangserver/sangplatta", playOnLoad)
        connection.cgPlay(channel, layer, flashLayer)
      } 
      if (/.?_stop$/.test(event)) {
        console.log('STOP', channel, layer, flashLayer)
        connection.cgStop(channel, layer, flashLayer)
      } 
      if (/.?_next$/.test(event)) {
        console.log('NEXT', channel, layer, flashLayer)
        connection.cgNext(channel, layer, flashLayer)
      } 
      if (/.?_update$/.test(event)) {
        //f2:"Blott en dag, ett ögonblick i sänder\\nVilken tröst, \\nvad än som kommer på!"
        console.log('UPDATE', channel, layer, flashLayer)
        if(data.f0){
          connection.cgUpdate(channel, layer, flashLayer, {
            f0: data.f0
          })
        }
        if(data.f1){
          connection.cgUpdate(channel, layer, flashLayer, {
            f1: data.f1
          })
        }
        if(data.f2){
          connection.cgUpdate(channel, layer, flashLayer, {
            f2: data.f2.replace(/\n/g,'\\n')
          })
        }
        if(data.selected || data.selected == 0){
          connection.cgUpdate(channel, layer, flashLayer, {
            selected: data.selected
          })
        }
        
        if(data.style){
          let d = {}
          Object.keys(data.style).map(attr=>{
            d[attr] = typeof data.style[attr] == 'string' ? data.style[attr].replace(/\n/g,'') : data.style[attr]
          })
          connection.cgUpdate(channel, layer, flashLayer, {
            style: d
          })
        }

      } 
      io.sockets.emit('data', {event, data})
    });
  
  
    client.on('disconnect', () => { /* … */ });
  });
  
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  })
  
}

// Templates

// Add template
const addTemplate = async ({
  templateName, 
  channel = 1, 
  layer = 700,
  flashLayer = 1, 
  playOnLoad = 0, 
  data = {f0:'', f1:'', f2:''} 
})=>{
  let CGPaths = await connection.getCasparCGPaths();

  if (CGPaths.template) {
    
    // Copy template to Caspar templates folder
    let template = path.join(path.dirname(process.execPath), templateName)
    let templatesFolder = path.join(CGPaths.template, '_sangserver/')
    try {
      await fs.copy(template, templatesFolder);
    } catch(err) {
      if (err) {
        console.log(`
  The template "${templateName}" could not be found! 
  Be shore to have the template in the same directory as the program!
  `, err); 
        return;
      } 
    }

    // Add template
    try{
      await connection.cgAdd(channel, layer, flashLayer, "_sangserver/" + templateName, playOnLoad, data)
      // await connection.cgAdd(channel, layer, flashlayer, path.join("_sangserver", templateName), playOnLoad)
    } catch (err){
      if (err) {
        console.log(`The template "${templateName}" could not be added to Caspar CG`, err)
        return
      } 
    }
      
    console.log(`Template "${templateName}" added! (Channel: ${channel} Layer: ${layer})`)
  }

}

// Songfiles
fs.watch(path.dirname(process.execPath), (event, filename)=>{
  // console.log(event, filename)
  if(event == 'change' && /.*\.txt$/.test(filename) && filename != 'session.txt') {
    console.log('Uppdating ', filename)
    const raw = fs.readFileSync(path.join(path.dirname(process.execPath), filename), 'utf8')
    const song = parse(filename, raw)

    io.sockets.emit('song', song)
  }
})

const parse = (filename, raw) => {
  let splitted = raw.split(/\n|\r/)
  
  return {
    file: filename,
    f0: splitted.shift(),
    f1: splitted.shift(),
    f2: splitted.join('\n')
  }
}


serve(app)


server.listen(port, () => console.log(`
 
ANVISNINGAR

GUI:
 - Öppna en webbrowser och navigera till http://${ipAddress}:${port}/songs.
 - Här kan du skapa nya textfiler.
 - Det går också att lägg till .txt filer i samma mapp som programfilen.

 `))


module.exports = serve
