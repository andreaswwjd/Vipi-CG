<template>
  <dir class="video" :class="{ active }">
    <!-- <div class="slide"
      :style="{backgroundImage: `url(${file})`}"></div> -->
    <video muted id="videoPlayer">
      <source src="intro.mp4" type="video/mp4">
    </video>
  </dir>
</template>
<script>
const convert = require('xml-js');

export default {
  data() {
    return {
      comp: 'EFS_Intro',
      file: '', //seconds
      active: false,
      videoPlayer: null,
      timer: ()=>{}
    }
  },
  methods: {
    play() {
      this.active = true
      this.videoPlayer.currentTime = 0
      this.videoPlayer.play()
      this.timer = setTimeout(()=>{
        this.active = false
      }, this.videoPlayer.duration * 1000 - 700)
    },
    stop() {
      this.active = false
      clearTimeout(this.timer)
      this.videoPlayer.currentTime = 0
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
  mounted() {
    this.videoPlayer = document.getElementById('videoPlayer')
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
.video {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  
  transition: 700ms;
  opacity: 0;
  &.active {
    opacity: 1;
  }
}
video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  transition: 200ms opacity;
}

</style>
