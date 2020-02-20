const fs = require('fs-extra')

const parse = (filename, raw) => {
  let splitted = raw.split(/\n|\r/)
  
  return {
    file: filename,
    title: splitted.shift(),
    author: splitted.shift(),
    text: splitted.join('\n')
  }
}

module.exports.libraryHandler = function(io, client) {


  /** library LIST
   * @emits library_list
   */
  client.on('library_list', async () => { 

    // List library filenames
    let list = await fs.readdir('./library')

    // Send library list to client
    client.emit('library_list', list)

    console.log('LIST Library: ', list) // DELETE
  });


  /** Library LOAD
   * @param fileName
   * @emits library_load { text: { file, title, author, text } }through watcher 
   */
  client.on('library_load', async fileName => { 

    // Check if textfile exists
    if (await fs.pathExists(`./library/${fileName}`)) {

      // Set new watcher
      client.watchers.library = await setWatcher(client, fileName)
  
      // Get and parse textfile
      const text = parse(fileName, await fs.readFile(`./library/${fileName}`, 'utf8'))

      client.emit('library_load', { text })
    }
  });


  /** Library SAVE
   * @param text { file, title = '', author = '', text = ''}
   * @emits library_list To all clients
   */
  client.on('library_save', async ({ file, title = '', author = '', text = ''} = {}) => {
    
    // Make text file
    await fs.writeFile(`./library/${file}`, title+'\n'+author+'\n'+text+'\n')

    // Create watcher
    client.watchers.library = await setWatcher(client, file)

    // Broadcast new library list to clients
    io.sockets.emit('library_list', await fs.readdir('./library'))

    console.log('Saved library file: ', file) // DELETE
  });


  /** Library RENAME
   * @param fromName 
   * @param toName  
   * @emits library_list
   */
  client.on('library_rename', async (fromName, toName) => { 

    // Get current library lisr
    let list = await fs.readdir('./library')
    console.log(`Rename ${fromName} -> ${toName} in:`, list) // DELETE

    // If 'name' -> 'newName' is possible, rename!
    if (list.includes(fromName) && !list.includes(toName)) {
      await fs.move(`./library/${fromName}`, `./library/${toName}`)
      list = await fs.readdir('./library')

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
    if (await fs.pathExists(`./library/${fileName}`)) {
      fs.removeSync(`./library/${fileName}`)
    }

    // Broadcast library-list to clients
    list = await fs.readdir('./library')
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
  const watcher = fs.watch(`./library/${fileName}`, async (event, filename)=>{
    if (event == 'change') {
      console.log('FILE changed ', filename)

      const text = parse(fileName, await fs.readFile(`./library/${filename}`, 'utf8'))
      client.emit('text', { file: filename, ...text })

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