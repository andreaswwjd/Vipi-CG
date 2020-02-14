<template>
  <dir class="date" :class="{ active }">
    <div class="bricka">
      <div class="text" v-html="f0" v-if="f0"></div>
    </div>
  </dir>
</template>
<script>

export default {
  data() {
    return {
      comp: 'EFS_Tema',
      f0: 'Teologi',
      active: false
    }
  },
  methods: {
    play() {
      this.active = true
      console.log('Tema')
    },
    stop() {
      this.active = false
    },
    next() {
      console.log(this)
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

.date {
  color: white;
  font-family: Campton Semibold;
  font-size: 30px;
  text-transform: uppercase;
}

$slidetime: 500ms;

.date {
  height: 54px;
  width: auto;
  position: absolute;
  top: 10%;
  left: 5%;
  overflow: hidden;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; 

  transition: $slidetime;
  opacity: 0;

  .bricka {
    height: 54px;
    width: auto;
    background: #D04F3D;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    transition: $slidetime ease-out 0ms;
    transform: translateX(-55px);

    .text {
      margin: 24px;
      height: 30px;
    }
  } 
}

.active {
  transition-delay: 0ms; 
  opacity: 1;
  .bricka {
    transform: translateX(0);
    // transition-delay: ($slidetime / 2); 
  }
}

</style>
