const path = require('path')

// CasparCG connection
const { CasparCG } = require('casparcg-connection')
var connection = undefined
var cgHost = 'localhost'
var cgPort = '5250'

module.exports.producerHandler = function(io, client, caspar_connection, views) {

  // Caspar settings
  if (caspar_connection) {
    cgHost = caspar_connection.host
    cgPort = caspar_connection.port
  }

  // Producer connect
  client.on('producer_caspar', ({ host, port }) =>{
    if (host) cgHost = host
    if (port) cgPort = port
    connectToCaspar(cgHost, cgPort)
  })

  // Producer add
  client.on('producer_add', async (
    { templateName, channel = 1, layer = 700, flashLayer = 1, playOnLoad = 0, data = {} }
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

  // View set settings
  client.on('view_set', ({ view, settings }) => {

  })

  // View get settings
  client.on('view_get', ({ view }) => {

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


const connectToCaspar = async function(host = cgHost, port = cgPort) {
  connection = await new CasparCG(host, port);

  connection.onConnected = async () => {
    console.log(`CasparCG connected on ${host}:${port}!`)
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

module.exports.connectToCaspar = connectToCaspar