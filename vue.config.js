// const server = require('./server/server')

module.exports = {
  publicPath: '',
  outputDir: '_templates',
  // devServer: {
  //   before: server
  // },
  pages: {
    index: 'src/_server.js',
    // control: 'src/_control.js',
    // green: {
    //   entry: 'src/_all.js',
    //   template: 'public/green.html',
    // },
    // black: {
    //   entry: 'src/_all.js',
    //   template: 'public/black.html',
    // },
    // datum: 'src/EFS/datum.js',
    // lowerthird: 'src/EFS/lowerthird.js',
    // namnskylt: 'src/EFS/namnskylt.js',
    // sangplatta: 'src/EFS/sangplatta.js',
    // notis: 'src/EFS/notis.js',
    // swish: 'src/EFS/swish.js',
    // tema: 'src/EFS/tema.js',
    // title: 'src/EFS/title.js',
    // livsvag_title: 'src/EFS/livsvag_title.js',
    // bibelord: 'src/EFS/bibelord.js',
  },
}