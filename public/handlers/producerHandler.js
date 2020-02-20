
module.exports.producerHandler = function(io, client, connection) {

  // Producer connect
  client.on('connect', ({ host, port }) =>{
    if (host) cgHost = host
    if (port) cgPort = port
    connect()
  })

  // Producer add
  client.on('producer_add', async (
    { templateName, channel = 1, layer = 700, flashLayer = 1, playOnLoad = 0, data = {f0:'', f1:'', f2:''} }
  )=>{
  
    // Caspar CG HTML producer
    try{
      await connection.cgAdd(channel, layer, flashLayer, "_VipiCG/" + templateName, playOnLoad, data)
    } catch (err){
      if (err) {
        console.log(`The template "${templateName}" could not be added to Caspar CG`, err)
        return
      } 
    }
      
    // Vipi CG producer
    io.sockets.emit('producer_add', { templateName, channel, layer, flashLayer, playOnLoad, data })
    console.log(`Template "${templateName}" added! (Channel: ${channel} Layer: ${layer})`)
  
  })

  // Producer remove
  client.on('producer_remove', ({ templateName, channel, layer }) =>{
    connection.cgRemove(channel, layer)
    io.sockets.emit('producer_remove', { templateName })
  })

  // Producer layer
  client.on('producer_layer', ({ templateName, channel, fromLayer, toLayer }) =>{
    connection.cgRemove(channel, fromLayer)
    connection.cgAdd(channel, toLayer, 1, "_VipiCG/" + templateName, 0)
  })

  // Producer channel
  client.on('producer_channel', ({ templateName, fromChannel, toChannel, layer }) =>{
    connection.cgRemove(fromChannel, layer)
    connection.cgAdd(toChannel, layer, 1, "_VipiCG/" + templateName, 0)
  })


  // Client
  client.on('data', ({event, data, channel = 1, layer = 700, flashLayer = 1, playOnLoad = 0}) => {
    io.sockets.emit('data', {event, data})
    
    if (/.?_play$/.test(event)) {
      console.log('PLAY', channel, layer, flashLayer)
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
      console.log('UPDATE', channel, layer, flashLayer)
      Object.keys(data).map(key => {
        let d = {}
        d[key] = encodeURI(data[key])
        connection.cgUpdate(channel, layer, flashLayer, d)
      })
    } 

    if (/.?_style$/.test(event)) {
      let d = {}
      Object.keys(data.style).map(attr=>{
        d[attr] = typeof data.style[attr] == 'string' ? data.style[attr].replace(/\n/g,'') : data.style[attr]
      })
      connection.cgUpdate(channel, layer, flashLayer, {
        style: d
      })
    }
  });
  
}
