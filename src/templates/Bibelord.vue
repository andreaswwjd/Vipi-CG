<template>
  <dir class="bibelord" :class="{ active }">
    <Lottie class="lottie" v-bind="{ animationData, active, delay: 1100, intro: [0,30], render: 'canvas', /*loop: 10, loopFrames: [0,30],*/ outro: [1483, 1500], l0: f0, l1: f1}"/>
  </dir>
</template>
<script>
const bibelord = require('@/assets/bibelord.json');
import Lottie from '@/components/Lottie';

export default {
  components: {
    Lottie
  },
  data() {
    return {
      comp: 'bibelord',
      f0: 'Uppsala',
      f1: '13 maj 2019',
      active: false,
      animationData: bibelord
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
      return this
    },
    update(data) {
      this.f0 = data.f0
      this.f1 = data.f1
      this.f2 = data.f2
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

@font-face {
  font-family: Campton Semibold;
  src: url(../fonts/Campton/Rene.Bieder_Campton.SemiBold.otf);
}
@font-face {
  font-family: Campton Book;
  src: url(../fonts/Campton/Rene.Bieder_Campton.Book.otf);
}

.bibelord {
  font-family: Campton Book;
  font-size: 30px;
  position: absolute;
  // bottom: 5%;
  // right: 5%;
  // left: 5%;
  // top: 5%;
  overflow: hidden;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; 
}


</style>
