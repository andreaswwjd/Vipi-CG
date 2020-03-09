import templates from '../templates';

// Mangling
const components = {...templates}
for (let i in components) {
  components[i] = components[i].component
}

// Exports
export default components
export const controls = Object.keys(templates).map((name, i)=>({
  // Corresponds to fields injected in '@/components/TableView' inside the Control-view.
  title: templates[name].title || name,
  placeholders: templates[name].placeholders,
  event: name, 
  component: name, 
  channel: 1,
  layer: 700 + i
}))
