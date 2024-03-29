const fs = require('fs-extra')
const path = require('path')

const parse = (filename, raw) => {
  let splitted = raw.split(/\n|\r/)
  
  return {
    file: filename,
    title: splitted.shift(),
    author: splitted.shift(),
    text: splitted.join('\n')
  }
}

module.exports.libraryHandler = function(io, client, directory, current_session) {

  let getLibaryDir = (sessionName) => {
    let sessionsDir = process.env.NODE_ENV === 'server' ? '../sessions' : './sessions'
    return path.join(directory, `${sessionsDir}/${sessionName}/library`);
  }

  /** library LIST
   * @emits library_list
   */
  client.on('library_list', async ({sessionName = current_session}) => { 

    // List library filenames
    let list = await fs.readdir(getLibaryDir(sessionName))

    // Send library list to client
    client.emit('library_list', list)

    console.log('LIST Library: ', list) // DELETE
  });


  /** Library LOAD
   * @param fileName
   * @emits library_load { text: { file, title, author, text } }through watcher 
   */
  client.on('library_load', async ({sessionName, fileName}) => { 

    // Check if textfile exists
    if (await fs.pathExists(`${getLibaryDir(sessionName)}/${fileName}`)) {

      // Set new watcher
      client.watchers.library = await setWatcher(client, fileName)
  
      // Get and parse textfile
      const current_song = parse(fileName, await fs.readFile(`${getLibaryDir(sessionName)}/${fileName}`, 'utf8'))

      client.emit('library_load', current_song)

      // TODO: This should be solved with a watcher instead...
      // List library filenames
      let list = await fs.readdir(getLibaryDir(sessionName))
      client.emit('library_list', list)
    }
  });


  /** Library SAVE
   * @param text { file, title = '', author = '', text = ''}
   * @emits library_list To all clients
   */
  client.on('library_save', async ({ file, title = '', author = '', text = ''} = {}) => {
    
    // Make text file
    await fs.writeFile(`${getLibaryDir(sessionName)}/${file}`, title+'\n'+author+'\n'+text+'\n')

    // Create watcher
    client.watchers.library = await setWatcher(client, file)

    // Broadcast new library list to clients
    io.sockets.emit('library_list', await fs.readdir(getLibaryDir(sessionName)))
    client.emit('library_load', { file, title, author, text})

    console.log('Saved library file: ', file) // DELETE
  });


  /** Library RENAME
   * @param fromName 
   * @param toName  
   * @emits library_list
   */
  client.on('library_rename', async (fromName, toName) => { 

    // Get current library lisr
    let list = await fs.readdir(getLibaryDir(sessionName))
    console.log(`Rename ${fromName} -> ${toName} in:`, list) // DELETE

    // If 'name' -> 'newName' is possible, rename!
    if (list.includes(fromName) && !list.includes(toName)) {
      await fs.move(`${getLibaryDir(sessionName)}/${fromName}`, `${getLibaryDir(sessionName)}/${toName}`)
      list = await fs.readdir(getLibaryDir(sessionName))

      // Set new watcher
      client.watchers.library = await setWatcher(client, toName)
    } else {
      
      // If 'file-to' already exist, inform:
      if (list.includes(toName)) {
        client.emit('msg', { 
          type: 'error', 
          msg: `The file "${toName}" does already exist. Choose another name!`
        })
        console.log(`Library "${toName}" already exists!`) // DELETE
      } 

    }

    // Broadcast to clients current library list.
    io.sockets.emit('library_list', list)
    
  });

  
  /** Library DELETE
   * @param fileName 
   * @emits library to all clients
   * @emits library_list to all clients
   */
  client.on('library_delete', async fileName => { 

    // Delete library file if exists
    if (await fs.pathExists(`${getLibaryDir(sessionName)}/${fileName}`)) {
      fs.removeSync(`${getLibaryDir(sessionName)}/${fileName}`)
    }

    // Broadcast library-list to clients
    list = await fs.readdir(getLibaryDir(sessionName))
    io.sockets.emit('library_list', list)

    console.log('LIST Library: ', list) // DELETE
  });


}

// Library changes
async function setWatcher(client, fileName) {
  if (!client.watchers.library) {
    return await watchLibrary(client, fileName);
  } else {
    return await watcherChange(client, fileName) 
  }
}

async function watchLibrary(client, fileName) {
  const watcher = fs.watch(`${getLibaryDir(sessionName)}/${fileName}`, async (event, filename)=>{
    // Update client
    if (event == 'change') {
      console.log('FILE changed ', filename)

      const changed_song = parse(fileName, await fs.readFile(`${getLibaryDir(sessionName)}/${filename}`, 'utf8'))
      client.emit('text', { file: filename, ...changed_song })

    }
  })

  // If library file is deleted or renamed, close the watcher
  watcher.on('unlinkDir', async () => {
    console.log(`Library file "${fileName}" has been removed.`)
    await client.watchers.library.close()
    delete client.watchers.library
  })

  // Redurns the wather to be attatched on the client element.
  console.log('Watcher set: ', fileName)
  return watcher
}

async function watcherChange(client, fileName) {
  await client.watchers.library.close()
  return await watchLibrary(client, fileName)
}