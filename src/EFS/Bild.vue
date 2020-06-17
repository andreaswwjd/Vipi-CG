<template>
  <dir class="bild" :class="{ active }">
    <div class="slide"
      :style="{backgroundImage: `url(${file})`}"></div>
  </dir>
</template>
<script>
const convert = require('xml-js');

export default {
  data() {
    return {
      comp: 'EFS_Bild',
      file: '', //seconds
      active: false
    }
  },
  methods: {
    play() {
      this.active = true
    },
    stop() {
      this.active = false
    },
    next() {
      console.log(this)
    },
    update(data) {
      if (typeof data == 'object') {
        if (data.file) this.file = data.file
      } else {
        let parsed = convert.xml2js(data);
        parsed.elements[0].elements.map(d=>{
          if (d.attributes.id == 'file') this.file = d.elements[0].attributes.value
        })
      }
    }
  },
  created() {
    window.play   = this.play
    window.stop   = this.stop
    window.next   = this.next
    window.update = this.update
  },
  sockets: {
    data: function({event, data}) {
      if (event == this.comp+'_play') this.play()
      if (event == this.comp+'_stop') this.stop()
      if (event == this.comp+'_next') this.next()
      if (event == this.comp+'_update') this.update(data)
    }
  }
}

</script>

<style lang="scss" scoped>
.bild {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  
  transition: 500ms;
  opacity: 0;
  &.active {
    opacity: 1;
  }
}
.slide {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  transition: 200ms opacity;
}

</style>
