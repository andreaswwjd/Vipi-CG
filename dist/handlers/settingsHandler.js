const fs = require('fs-extra')
const path = require('path')

module.exports.settingsHandler = async function(){

  // Directory sanitation
  if(/^\./.test(directory) || directory == "") {
    if(process.env.NODE_ENV === 'server') {
      directory = path.join(__dirname, directory)
    } else {
      directory = path.join(path.dirname(process.execPath), directory)
    }
  }

  return { 
    directory, 
    current_session, 
    caspar_connection, 
    views 
  }
}