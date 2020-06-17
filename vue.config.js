const caspar = (process.argv[3] == 'caspar')
if (process.argv[2] == 'serve') require('./server')

module.exports = {
  publicPath: '',
  outputDir: (caspar ? 'caspar' : 'dist'),
  pages: (caspar ? require('./.render/_pages') : { index: 'src/_server.js'}),
  // devServer: {
  //   proxy: 'http://127.0.0.1:3000',
  //   port: 8080,
  //   host: '127.0.0.1'
  // }
}