const path = require('path')
const fs = require('fs-extra')

module.exports.sessionHandler = function(io, client) {


  /** Session CREATE
   * @param sessionName
   * @emits session_list To all clients
   */
  client.on('session_create', async sessionName => {
    sessionName = 'session-1' // DELETE
    
    // Make session directory
    await fs.mkdir(`./sessions/${sessionName}`)

    // Make session files
    await fs.writeFile(`./sessions/${sessionName}/session.txt`, '{}')
    await fs.writeFile(`./sessions/${sessionName}/texts.txt`, '')

    // Create watcher
    client.watcher = await setWatcher(client, sessionName)

    // Broadcast new session list to clients
    io.sockets.emit('session_list', await fs.readdir('./sessions'))

    console.log('Created new sessions: ', sessionName) // DELETE
  });


  /** Session LIST
   * @emits session_list
   */
  client.on('session_list', async () => { 

    // Read sessions direcotory
    let list = await fs.readdir('./sessions')

    // Send session list to client
    client.emit('session_list', list)

    console.log('LIST Sessions: ', list) // DELETE
  });


  /** Session LOAD
   * @param sessionName
   * @emits session through watcher 
   */
  client.on('session_load', async sessionName => { 
    sessionName = 'session-1' // DELETE

    // Check if session exists
    if (await fs.pathExists(`./sessions/${sessionName}/session.txt`)) {

      // Set new watcher
      client.watcher = await setWatcher(client, sessionName)
  
      // Get session templates
      const templates = await fs.readJSON(`./sessions/${sessionName}/session.txt`, 'utf8')

      // Get session texts if exists
      if (await fs.pathExists(`./sessions/${sessionName}/texts.txt`)) {
        const textsRaw = await fs.readFile(`./sessions/${sessionName}/texts.txt`, 'utf8')
        const texts = textsRaw.split('\n').filter(text=>!!text)
        console.log('LOAD Session: ', {sessionName, templates, texts}) // DELETE
      }
    }
  });


  /** Session SAVE
   * @param session {sessionName, templates, texts} 
   * @emits session through watcher 
   */
  client.on('session_save', ({sessionName, templates = {}, texts = []} = {}) => { 
    sessionName = 'session-1' // DELETE
    templates = {FKAB_Namnskylt: [{f0:'Frida Nilsson', f1:'Författare'}]} // DELETE

    // Overwrite session files
    fs.writeJSON(`./sessions/${sessionName}/session.txt`, templates, {spaces: '  ', EOL: '\n'})
    fs.writeFile(`./sessions/${sessionName}/texts.txt`, texts.map(text => text.name).join('\n'))

    console.log('SAVED Session: ', {sessionName, templates, texts}) // DELETE
  });


  /** Session RENAME
   * @param fromName 
   * @param toName  
   * @emits session_list
   */
  client.on('session_rename', async (fromName, toName) => { 
    fromName = 'session-2' // DELETE
    toName = 'session-1' // DELETE

    // Get current sessions
    let list = await fs.readdir('./sessions')
    console.log(`Rename ${fromName} -> ${toName} in:`, list) // DELETE

    // If 'session-1' -> 'session-2' is possible, rename!
    if (list.includes(fromName) && !list.includes(toName)) {
      await fs.move(`./sessions/${fromName}`, `./sessions/${toName}`)
      list = await fs.readdir('./sessions')

      // Set new watcher
      client.watcher = await setWatcher(client, toName)
    } else {
      
      // If 'session-2' already exist, inform:
      if (list.includes(toName)) {
        client.emit('msg', { 
          type: 'error', 
          msg: `The session "${toName}" does already exist. Choose another name!`
        })
        console.log(`Session "${toName}" already exists!`) // DELETE
      } 

    }

    // Broadcast to clients current sessions list.
    io.sockets.emit('session_list', list)
    
  });

  
  /** Session DELETE
   * @param sessionName 
   * @emits session to all clients
   */
  client.on('session_delete', async sessionName => { 
    sessionName = 'session-1' // DELETE

    // Delete session if exists
    if (await fs.pathExists(`./sessions/${sessionName}`)) {
      fs.removeSync(`./sessions/${sessionName}`)
    }

    // Broadcast session-list to clients
    list = await fs.readdir('./sessions')
    io.sockets.emit('session_list', list)

    console.log('LIST Sessions: ', list) // DELETE
  });


}

// Session changes
async function setWatcher(client, sessionName) {
  if (!client.watcher) {
    return await watchSession(client, sessionName);
  } else {
    return await watcherChange(client, sessionName) 
  }
}

async function watchSession(client, sessionName) {
  const watcher = fs.watch(`./sessions/${sessionName}`, async (event, filename)=>{
    if (event == 'change') {
      console.log('SESSION changed ', filename)

      if (filename == 'session.txt') {
        const templates = await fs.readJSON(`./sessions/${sessionName}/${filename}`, 'utf8')
        client.emit('session', { templates })
      }

      if (filename == 'texts.txt') {
        const textsRaw = await fs.readFile(`./sessions/${sessionName}/${filename}`, 'utf8')
        client.emit('session', { texts: textsRaw.split('\n').filter(text=>!!text) })
      }
    }
  })

  // If session folder is deleted or renamed, close the watcher
  watcher.on('unlinkDir', async () => {
    console.log(`Session "${sessionName}" has been removed.`)
    await client.watcher.close()
    delete client.watcher
  })

  // Redurns the wather to be attatched on the client element.
  console.log('Watcher set: ', sessionName)
  return watcher
}

async function watcherChange(client, sessionName) {
  await client.watcher.close()
  return await watchSession(client, sessionName)
}