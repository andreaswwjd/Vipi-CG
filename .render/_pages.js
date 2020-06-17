const fs = require('fs')
const ejs = require('ejs')

const caspar_exports = require('../src/caspar')
const export_template = fs.readFileSync('.render/_default.ejs', 'utf8')

let pages = {}
Object.keys(caspar_exports).map((name)=>{
  // Renders Vue.js instances to .render-folder
  const file = ejs.render(export_template, {
    component: caspar_exports[name].replace(/^\./, '../src')
  })
  fs.writeFileSync('.render/'+name+'.js', file)
  pages[name] = '.render/'+name+'.js'
})

module.exports = pages