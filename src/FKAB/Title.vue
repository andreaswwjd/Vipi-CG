<template>
  <dir class="lowerthird" :class="{ active }">
    <div class="icon">
      <img src="../assets/gubbe.png">
    </div>
    <div class="tema" >
      <div class="bricka">
        <strong class="text" v-if="f3" v-html="f3"></strong>
      </div>
    </div>
    <div class="title">
      <div class="bricka">
        <div class="rubrik" v-if="f0">
          <span class="letter" v-for="(letter,i) in f0.split('')" :key="letter+i" :style="{transitionDelay: eaze(i/f0.length)+'s' }">{{letter}}</span>
        </div>
        <div class="speaker">
          <div>
            <strong v-html="f1+' '" v-if="f1"></strong>
            <span class="light" v-html="f2" v-if="f2"></span>
          </div>
        </div>
      </div>
      <div class="rightspacer"></div>
    </div>
  </dir>
</template>
<script>
require('../assets/bezier-easing.min.js')

const easing = BezierEasing(0,.54,1,.18)

export default {
  data() {
    return {
      comp: 'FKAB_Title',
      f0: 'Own your emotions',
      f1: 'Bokrelease',
      f2: 'med Frida Nilsson',
      f3: '',
      active: false
    }
  },
  methods: {
    play() {
      this.active = true
      console.log('Lowerthird')
    },
    stop() {
      this.active = false
    },
    next() {

    },
    update(data) {
      this.f0 = data.f0
      this.f1 = data.f1
      this.f2 = data.f2
      this.f3 = data.f3
    },
    eaze(frame){
      return easing(frame)
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
  font-family: Gotham Ultra;
  src: url(../fonts/Gotham/Gotham-Ultra.otf);
}
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



.lowerthird {
  color: white;
  font-family: Lato;
  letter-spacing: 5px;
  font-size: 50px;

  .tema {
    color: white;
    font-size: 30px;
  }

  .rubrik {
    font-family: Gotham Ultra;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 80px;
  }

  .light {
    font-family: Lato;
  }
  strong {
    font-family: Lato Bold;
  text-transform: uppercase;
    // font-family: Gotham Ultra;
  }
}

$fadetime: 500ms;
$slidetime: 1000ms;

.lowerthird {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
  
  // transition: $fadetime ($slidetime * 2);
  transition: $slidetime;
  
  .icon {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 350px;
    width: 350px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 100%;
      transition: 1.5s 2s transform ease-out; 
      transform: translate(100%, 0%) rotate(20deg);
    }
  }
  .tema {
    height: 64px;
    width: auto;
    position: absolute;
    bottom: 230px;
    left: 5%;
    overflow: hidden;
    margin: 0;
    margin-left: 50px;
    padding: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; 

    transition: $fadetime $slidetime;

    .bricka {
      height: 65px;
      width: auto;
      background: #262626;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;

      transition: $slidetime cubic-bezier(0.9,0,0.1,1) 0ms;
      // transform: translateX(-100%);

      .text {
        margin: 24px;
        // height: 30px;
        text-transform: uppercase;
      }
    }
  }
  .title {
    height: 150px;
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

    
    .bricka {
      height: 150px;
      width: auto;
      // background: #223250;
      // background: white;

      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      padding-left: 50px;
      margin-right: 50px;

      transition: $slidetime cubic-bezier(0.9,0,0.1,1) ;
      // transform: translateX(-100%);

      .rubrik {
        margin-top: 10px;
        .letter {
          opacity: 0;
          transition: 200ms 100ms opacity;
        }
      }

      .speaker {
        display: flex;
        flex-direction: row;
        opacity: 0;
        transition: $slidetime cubic-bezier(0.9,0,0.1,1) $slidetime / 2;

        div {
          margin-right: 24px;
        }
      }

      // &::before {
      //   content: '';
      //   position: absolute;
      //   right: -55px;
      //   height: 0;
      //   width: 0;
      //   // border-right: 35.355px solid #EAE1CA;
      //   border-top: 35.355px solid transparent;
      //   border-bottom: 35.355px solid transparent;
      //   transform: translateY(-25px) rotate(-45deg);    
      //   transform-origin: left;
      //   margin-right: 20px;
      // // }
      // &::after {
      //   content: '';
      //   position: absolute;
      //   // background: white;
      //   right: -49px;
      //   bottom: 0;
      //   height: 100px;
      //   width: 51px;
      // }
    } 
  }
}

.active {
  transition-delay: 0ms; 
  opacity: 1;
  .icon img {
    transform: translate(26%, 0) rotate(0);
  }
  .tema .bricka {
    transform: translateX(0);
    transition-delay: 0; 
    // transition-delay: $slidetime; 
  }
  .title .bricka {
    transform: translateX(0);
    transition-delay: ($slidetime / 2); 
    .rubrik .letter {
      opacity: 1;
    }
    .speaker {
      opacity: 1;
      transition-delay: 0; 
    }
  }
}

</style>
