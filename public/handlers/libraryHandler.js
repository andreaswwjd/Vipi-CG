
// // Library change
// fs.watch(path.dirname(process.execPath), (event, filename)=>{
//   // console.log(event, filename)
//   if(event == 'change' && /.*\.txt$/.test(filename) && filename != 'session.txt') {
//     console.log('Uppdating ', filename)
//     const raw = fs.readFileSync(path.join(path.dirname(process.execPath), filename), 'utf8')
//     const song = parse(filename, raw)

//     io.sockets.emit('song', song)
//   }
// })