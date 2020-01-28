const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path')
const fs = require('fs')
const port = 3000


const serve = app => {
  app.use(express.static(path.join(__dirname, './')))
  let session = JSON.parse(fs.readFileSync(path.join(__dirname, 'session.txt')))
  
  io.on('connection', client => {
    console.log('Client connected!')
    
    client.on('ready', () => { 
      io.sockets.emit('lastSession', session)
    });
  
  
    client.on('saveSession', (data) => { 
      session[data.key] = data.value
      fs.writeFileSync('session.txt', JSON.stringify(session))
    });
  
  
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

    client.on('data', data => { 
      io.sockets.emit('data', data)
    });
  
  
    client.on('disconnect', () => { /* … */ });
  });
  
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  })
  
}

fs.watch(path.dirname(process.execPath), (event, filename)=>{
  console.log(event, filename)
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
 - Öppna en webbrowser och navigera till http://localhost:${port}/songs.
 - Här kan du skapa nya textfiler.
 - Det går också att lägg till .txt filer i samma mapp som programfilen.

CasparCG:
 - Öppna en Caspar klient och lägg till "HTML Page" som man hittar 
   under Tools > Other > HTML Page.
 - I inställningarna till höger sätt in http://localhost:${port}/screen
   i URL-fältet.
 – Tryck på F2 (play). 

 `))


module.exports = serve
