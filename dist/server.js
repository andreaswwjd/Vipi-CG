const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path')
const port = 1992

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://127.0.0.1:27017/caspar';



app.use(express.static(path.join(__dirname, '../dist')))

io.on('connection', client => {
  console.log('Client connected!')

  
  client.on('ready', () => { 
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);

      // Get the documents collection
      var collection = db.collection('sessions');

      // Find some documents
      collection.find({_id: '5d0ab0e28cc25fe201d3b7c9'}).toArray(function(err, sessions) {
        assert.equal(err, null);
        if (!sessions[0]){
          collection.insertMany([
            {
              _id: '5d0ab0e28cc25fe201d3b7c9',
              title: [],
              tema: [],
              datum: [],
              namnskylt: [],
              lowerthird: [],
              titlesmall: []
            }
          ], function(err, session) {
            assert.equal(err, null);
            io.sockets.emit('lastSession', session)
            db.close();
          });
        } else {
          io.sockets.emit('lastSession', sessions[0])
          db.close();
        }
      });

    });
  });



  client.on('saveSession', (data) => { 
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      // Get the documents collection
      var collection = db.collection('sessions');
      collection.update( {_id: '5d0ab0e28cc25fe201d3b7c9'}, { $set: data }, function(err, result) {
        assert.equal(err, null);
        if(result.result.n == 1){
          console.log(result.result)
        }
        db.close();
      }); 
    });
  });



  client.on('lowerthird_play', () => { 
    io.sockets.emit('lowerthird_play')
  });

  client.on('lowerthird_stop', () => { 
    io.sockets.emit('lowerthird_stop')
  });

  client.on('lowerthird_next', () => { 
    io.sockets.emit('lowerthird_next')
  });

  client.on('lowerthird_update', data => { 
    io.sockets.emit('lowerthird_update', data)
  });



  client.on('namnskylt_play', () => { 
    io.sockets.emit('namnskylt_play')
  });

  client.on('namnskylt_stop', () => { 
    io.sockets.emit('namnskylt_stop')
  });

  client.on('namnskylt_next', () => { 
    io.sockets.emit('namnskylt_next')
  });

  client.on('namnskylt_update', data => { 
    io.sockets.emit('namnskylt_update', data)
  });



  client.on('title_play', () => { 
    io.sockets.emit('title_play')
  });

  client.on('title_stop', () => { 
    io.sockets.emit('title_stop')
  });

  client.on('title_next', () => { 
    io.sockets.emit('title_next')
  });

  client.on('title_update', data => { 
    io.sockets.emit('title_update', data)
  });



  client.on('datum_play', () => { 
    io.sockets.emit('datum_play')
  });

  client.on('datum_stop', () => { 
    io.sockets.emit('datum_stop')
  });

  client.on('datum_next', () => { 
    io.sockets.emit('datum_next')
  });

  client.on('datum_update', data => { 
    io.sockets.emit('datum_update', data)
  });



  client.on('tema_play', () => { 
    io.sockets.emit('tema_play')
  });

  client.on('tema_stop', () => { 
    io.sockets.emit('tema_stop')
  });

  client.on('tema_next', () => { 
    io.sockets.emit('tema_next')
  });

  client.on('tema_update', data => { 
    io.sockets.emit('tema_update', data)
  });



  client.on('titlesmall_play', () => { 
    io.sockets.emit('titlesmall_play')
  });

  client.on('titlesmall_stop', () => { 
    io.sockets.emit('titlesmall_stop')
  });

  client.on('titlesmall_next', () => { 
    io.sockets.emit('titlesmall_next')
  });

  client.on('titlesmall_update', data => { 
    io.sockets.emit('titlesmall_update', data)
  });



  client.on('swish_play', () => { 
     io.sockets.emit('swish_play')
  });

  client.on('swish_stop', () => { 
    io.sockets.emit('swish_stop')
  });

  client.on('swish_next', () => { 
    io.sockets.emit('swish_next')
  });

  client.on('swish_update', data => { 
    io.sockets.emit('swish_update', data)
  });
  



  client.on('credit_play', () => { 
    io.sockets.emit('credit_play')
  });

  client.on('credit_stop', () => { 
    io.sockets.emit('credit_stop')
  });

  client.on('credit_next', () => { 
    io.sockets.emit('credit_next')
  });

  client.on('credit_update', data => { 
    io.sockets.emit('credit_update', data)
  });
  

  client.on('disconnect', () => { /* … */ });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
