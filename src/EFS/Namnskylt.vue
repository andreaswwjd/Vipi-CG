<template>
  <dir class="namnskylt" :class="{ active }">
    <div class="icon">
      <img src="../assets/EFS_vit_web.svg" alt="">
    </div>
    <div class="bricka">
      <div class="name" v-html="f0" v-if="f0"></div>
      <div class="title light" v-html="f1" v-if="f1"></div>
    </div>
  </dir>
</template>
<script>

export default {
  data() {
    return {
      comp: 'EFS_Namnskylt',
      f0: 'Andreas Lundström',
      f1: 'Filmproducent',
      active: false
    }
  },
  methods: {
    play() {
      this.active = true
      console.log('Namnskylt')
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

.namnskylt {
  color: white;
  font-family: Campton Semibold;
  font-size: 30px;

  .titel {
    color: black;
    font-family: Campton Semibold;
    font-size: 50px;
  }

  .light {
    font-family: Campton Book;
  }
}

$fadetime: 1s;
$slidetime: 700ms;

.namnskylt {
  height: 100px;
  // width: 100%;
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
    // background: #1A4489;
    background: #223250;
    height: 100px;
    width: 100px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 55px;
    }
  }

  .bricka {
    height: 100px;
    width: auto;
    background: #223250;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    padding-right: 24px;

    transition: $slidetime cubic-bezier(0.9,0,0.1,1) 0ms;
    transform: translateX(-100%);

    .name {
      margin-top: 5px;
    }
    .name, .title {
      // margin-left: 24px;
      height: 30px;
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
