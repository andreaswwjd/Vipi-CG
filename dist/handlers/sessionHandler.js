const fs = require('fs-extra')
const path = require('path')

let sissionsdir 

module.exports.sessionHandler = function(io, client, directory, current_session) {
  
  if(process.env.NODE_ENV === 'server') {
    sissionsdir = path.join(directory, '../sessions')
  } else {
    sissionsdir = path.join(directory, './sessions')
  }
  
  
  // /** Session CURRENT
  //  * @emits session_current To all clients
  //  */
  // client.on('session_current', async () => {
    
  //   // Make session directory
  //   let currentSessionName = await fs.readFile(`${sissionsdir}/current.txt`, 'utf8')
  //   currentSessionName = currentSessionName.trim()

  //   // Check if session exists
  //   if (await fs.pathExists(`${sissionsdir}/${currentSessionName}/session.txt`)) {

  //     // Send current session to client
  //     client.emit('session_current', currentSessionName)

  //     // Set new watcher
  //     client.watchers.session = await setWatcher(client, currentSessionName)
  
  //     // Get session templates
  //     const templates = await fs.readJSON(`${sissionsdir}/${currentSessionName}/session.txt`, 'utf8')
  //     client.emit('session', { templates })

  //     // Get session texts if exists
  //     if (await fs.pathExists(`${sissionsdir}/${currentSessionName}/texts.txt`)) {
  //       const textsRaw = await fs.readFile(`${sissionsdir}/${currentSessionName}/texts.txt`, 'utf8')
  //       const texts = textsRaw.split('\n').filter(text=>!!text)
  //       console.log('LOAD Session: ', {currentSessionName, templates, texts}) // DELETE
  //       client.emit('session', { texts })
  //     }
  //   }
  // });




  /** Session CREATE
   * @param sessionName
   * @emits session_list To all clients
   */
  client.on('session_create', async sessionName => {
    
    // Make session directory
    await fs.mkdir(`${sissionsdir}/${sessionName}`)

    // Make session files
    await fs.writeFile(`${sissionsdir}/${sessionName}/session.txt`, '{}')
    await fs.writeFile(`${sissionsdir}/${sessionName}/texts.txt`, '')

    // Create watcher
    client.watchers.session = await setWatcher(client, sessionName)

    // Broadcast new session list to clients
    io.sockets.emit('session_list', await fs.readdir(sissionsdir))

    console.log('Created new sessions: ', sessionName) // DELETE
  });





  /** Session LIST
   * @emits session_list
   */
  client.on('session_list', async () => { 

    // Read sessions direcotory
    let list = await fs.readdir(sissionsdir)

    // Send session list to client
    client.emit('session_list', list.filter(f=>f!='current.txt'))

    console.log('LIST Sessions: ', list) // DELETE
  });





  /** Session LOAD
   * @param sessionName
   * @emits session through watcher 
   */
  client.on('session_load', async sessionName => { 

    // Check if session exists
    if (await fs.pathExists(`${sissionsdir}/${sessionName}/session.txt`)) {

      // Set new watcher
      client.watchers.session = await setWatcher(client, sessionName)
  
      // Get session templates
      const templates = await fs.readJSON(`${sissionsdir}/${sessionName}/session.txt`, 'utf8')
      client.emit('session', { sessionName, templates })

      // Get session texts if exists
      if (await fs.pathExists(`${sissionsdir}/${sessionName}/texts.txt`)) {
        const textsRaw = await fs.readFile(`${sissionsdir}/${sessionName}/texts.txt`, 'utf8')
        const texts = textsRaw.split('\n').filter(text=>!!text)
        console.log('LOAD Session: ', {sessionName, templates, texts}) // DELETE
        client.emit('session', { texts })
      }
    }
  });





  /** Session SAVE
   * @param session {sessionName, templates, texts} 
   * @emits session through watcher 
   */
  client.on('session_save', ({sessionName, templates = {}, texts = []} = {}) => { 

    console.log('Saving SESSION:', sessionName)

    // Overwrite session files
    fs.writeJSON(`${sissionsdir}/${sessionName}/session.txt`, templates, {spaces: '  ', EOL: '\n'})
    if (texts[0]) fs.writeFile(`${sissionsdir}/${sessionName}/texts.txt`, texts.map(text => text.name).join('\n'))

    console.log('SAVED Session: ', {sessionName, templates, texts}) // DELETE
  });





  /** Session RENAME
   * @param fromName 
   * @param toName  
   * @emits session_list
   */
  client.on('session_rename', async (fromName, toName) => { 

    // Get current sessions
    let list = await fs.readdir(sissionsdir)
    console.log(`Rename ${fromName} -> ${toName} in:`, list) // DELETE

    // If 'session-1' -> 'session-2' is possible, rename!
    if (list.includes(fromName) && !list.includes(toName)) {
      await fs.move(`${sissionsdir}/${fromName}`, `${sissionsdir}/${toName}`)
      list = await fs.readdir(sissionsdir)

      // Set new watcher
      client.watchers.session = await setWatcher(client, toName)
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
    io.sockets.emit('session_list', list.filter(f=>f!='current.txt'))
    
  });

  



  /** Session DELETE
   * @param sessionName 
   * @emits session to all clients
   */
  client.on('session_delete', async sessionName => { 

    // Delete session if exists
    if (await fs.pathExists(`${sissionsdir}/${sessionName}`)) {
      fs.removeSync(`${sissionsdir}/${sessionName}`)
    }

    // Broadcast session-list to clients
    list = await fs.readdir(sissionsdir)
    io.sockets.emit('session_list', list.filter(f=>f!='current.txt'))

    console.log('LIST Sessions: ', list) // DELETE
  });

  return sissionsdir


}

// Session changes
async function setWatcher(client, sessionName) {
  if (!client.watchers.session) {
    return await watchSession(client, sessionName);
  } else {
    return await watcherChange(client, sessionName) 
  }
}

async function watchSession(client, sessionName) {
  const watcher = fs.watch(`${sissionsdir}/${sessionName}`, async (event, filename)=>{
    if (event == 'change') {
      console.log('SESSION changed ', filename)

      if (filename == 'session.txt') {
        const templates = await fs.readJSON(`${sissionsdir}/${sessionName}/${filename}`, 'utf8')
        client.emit('session', { sessionName, templates })
      }

      if (filename == 'texts.txt') {
        const textsRaw = await fs.readFile(`${sissionsdir}/${sessionName}/${filename}`, 'utf8')
        client.emit('session', { sessionName, texts: textsRaw.split('\n').filter(text=>!!text) })
      }
    }
  })

  // If session folder is deleted or renamed, close the watcher
  watcher.on('unlinkDir', async () => {
    console.log(`Session "${sessionName}" has been removed.`)
    await client.watchers.session.close()
    delete client.watchers.session
  })

  // Redurns the wather to be attatched on the client element.
  console.log('Watcher set: ', sessionName)
  return watcher
}

async function watcherChange(client, sessionName) {
  await client.watchers.session.close()
  return await watchSession(client, sessionName)
}