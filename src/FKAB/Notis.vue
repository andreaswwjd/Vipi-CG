<template>
  <dir class="notis" :class="{ active }">
    <div class="icon">
      <div v-html="f0" style="height: 30px; width: 5px; background: #262626;"></div>
      <!-- <img v-if="!f0" src="../assets/EFS_vit_web.svg" alt=""> -->
    </div>
    <div class="bricka">
      <div class="text">
        <strong v-html="f1" v-if="f1"></strong>
        <span v-if="f1 && f2">&nbsp;</span>
        <span v-html="f2" v-if="f2"></span>
      </div>
    </div>
  </dir>
</template>
<script>

export default {
  data() {
    return {
      comp: 'FKAB_Notis',
      f0: '',
      f1: '',
      f2: 'Vad kan vi göra för förföljda kristna?',
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
  font-family: Lato;
  src: url(../fonts/Lato/Lato-Regular.ttf);
}
@font-face {
  font-family: Lato Bold;
  src: url(../fonts/Lato/Lato-Bold.ttf);
}

.notis {
  color: #262626;
  font-family: Lato;
  font-size: 30px;

  strong {
    font-family: Lato Bold;
  }
}

$fadetime: 0ms;
$slidetime: 700ms;

$height: 55px;

.notis {
  height: $height - 1px;
  width: auto;
  position: absolute;
  bottom: 5%;
  left: 5%;
  overflow: hidden;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; 

  transition: $fadetime $slidetime;
  opacity: 0;

  .icon {
    background: #FAFAFA;
    color: #FAFAFA;
    // background: #223250;
    font-family: Lato Bold;
    height: $height;
    width: auto;
    min-width: 30px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      height: 100px;
    }
  }

  .bricka {
    height: $height - 1px;
    width: auto;
    background: #FAFAFA;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    transition: $slidetime cubic-bezier(0.9,0,0.1,1) 0ms;
    transform: translateX(-100%);

    .text {
      margin-right: 18px;
      // height: 30px;
    }
  } 
}

.active {
  transition-delay: 0ms; 
  opacity: 1;
  .bricka {
    transform: translateX(0);
    transition-delay: ($fadetime / 2); 
  }
}

</style>
