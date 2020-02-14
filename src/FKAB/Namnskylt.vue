<template>
  <dir class="namnskylt" :class="{ active }">
    <div class="icon">
      <img src="../assets/gubbe_icon.png">
    </div>
    <div class="bricka">
      <div class="name" v-html="f0" v-if="f0"></div>
      <div class="bar"></div>
      <div class="title light" v-html="f1" v-if="f1"></div>
    </div>
  </dir>
</template>
<script>

export default {
  data() {
    return {
      comp: 'FKAB_Namnskylt',
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

// @font-face {
//   font-family: Gotham Ultra;
//   src: url(../fonts/Gotham/Gotham-Ultra.otf);
// }
// @font-face {
//   font-family: Gotham Book;
//   src: url(../fonts/Gotham/Gotham-Book.otf);
// }

@font-face {
  font-family: Lato;
  src: url(../fonts/Lato/Lato-Regular.ttf);
}
@font-face {
  font-family: Lato Bold;
  src: url(../fonts/Lato/Lato-Bold.ttf);
}


.namnskylt {
  color: black;

  .name {
    // font-family: Gotham Ultra;
    font-family: Lato Bold;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 30px;
  }

  .light {
    font-family: Lato;
    // font-family: Gotham Book;
    font-size: 27px;
  }
}

$fadetime: 1s;
$slidetime: 700ms;

$height: 120px;

.namnskylt {
  height: $height;
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
    background: #fefefe;
    height: $height;
    width: $height;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: $height - 20px;
    }
  }

  .bricka {
    height: $height;
    width: auto;
    background: #fefefe;

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

    .bar {
      display: block;
      width: 100%;
      height: 5px;
      background: #262626;
      margin: 5px 0;
    }

    .name, .title {
      // margin-left: 24px;
      height: 35px;
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
