<template>
  <dir class="slideshow" :class="{ active }">
    <div class="slide" v-for="(file,i) in media_list" :key="file" 
      :style="{backgroundImage: `url(${dir}/${file})`, opacity: ((current % media_list.length) - i == 0) ? '1':'0'}"></div>
  </dir>
</template>
<script>
const convert = require('xml-js');

export default {
  data() {
    return {
      comp: 'EFS_Slideshow_start',
      duration: 5, //seconds
      current: 0,
      active: false,
      media_list: [],
      dir: 'start',
      timer: ()=>{}
    }
  },
  methods: {
    play() {
      this.active = true
      clearInterval(this.timer)
      this.timer = setInterval(()=>{
        this.current += 1
      }, this.duration*1000)
    },
    stop() {
      this.active = false
      clearInterval(this.timer)
    },
    next() {
      console.log(this)
    },
    update(data) {
      if (typeof data == 'object') {
        if (data.duration) this.duration = data.duration
      } else {
        let parsed = convert.xml2js(data);
        parsed.elements[0].elements.map(d=>{
          if (d.attributes.id == 'duration') this.duration = d.elements[0].attributes.value
        })
      }
    }
  },
  created() {
    window.play   = this.play
    window.stop   = this.stop
    window.next   = this.next
    window.update = this.update

    this.$socket.emit('media_list', this.dir)
  },
  sockets: {
    data: function({event, data}) {
      if (event == this.comp+'_play') this.play()
      if (event == this.comp+'_stop') this.stop()
      if (event == this.comp+'_next') this.next()
      if (event == this.comp+'_update') this.update(data)
    },
    media_list: function(media_list){
      console.log(media_list)
      this.media_list = media_list
    }
  }
}

</script>

<style lang="scss" scoped>
.slideshow {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  
  // transition: 500ms;
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
  // transition: 200ms opacity;
}

</style>
