const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path')
const fs = require('fs')
const port = 3000

app.use(express.static(path.join(__dirname, './')))
let session = JSON.parse(fs.readFileSync('session.txt'))

io.on('connection', client => {
  console.log('Client connected!')
  console.log(session)
  
  client.on('ready', () => { 
    io.sockets.emit('lastSession', session)
  });


  client.on('saveSession', (data) => { 
    session[data.key] = data.value
    fs.writeFileSync('session.txt', JSON.stringify(session))
  });



  client.on('data', data => { 
    io.sockets.emit('data', data)
  });


  client.on('disconnect', () => { /* … */ });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './all.html'));
})

app.get('/control', (req, res) => {
  res.sendFile(path.join(__dirname, './control.html'));
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
