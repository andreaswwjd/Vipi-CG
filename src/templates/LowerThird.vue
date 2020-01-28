<template>
  <dir class="lowerthird" :class="{ active }">
    <!-- <div class="icon">
      <img src="../assets/EFS_vit_web.svg" alt="">
    </div> -->
    <div class="tema" >
      <div class="bricka">
        <strong class="text" v-if="f3" v-html="f3"></strong>
      </div>
    </div>
    <div class="title">
      <div class="bricka">
        <div class="rubrik" v-html="f0" v-if="f0"></div>
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

export default {
  data() {
    return {
      comp: 'lowerthird',
      f0: 'Vad kan vi göra för förföljda kristna?',
      f1: '',
      f2: '',
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
      console.log(this)
    },
    update(data) {
      this.f0 = data.f0
      this.f1 = data.f1
      this.f2 = data.f2
      this.f3 = data.f3
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



.lowerthird {
  color: black;
  font-family: Campton Semibold;
  font-size: 2.77777vh;

  .tema {
    color: white;
  }

  .rubrik {
    color: #86D0F3;
    // color: #FFEB93;
    font-family: Campton Semibold;
    font-size: 50px;
  }

  .light {
    font-family: Campton Book;
  }
  strong {
    font-family: Campton Semibold;
  }
}

$fadetime: 100ms;
$slidetime: 700ms;

.lowerthird {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
  
  transition: $fadetime ($slidetime * 2);

  .tema {
    height: 54px;
    width: auto;
    position: absolute;
    bottom: 230px;
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
      height: 55px;
      width: auto;
      background: #D04F3D;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;

      transition: $slidetime cubic-bezier(0.9,0,0.1,1) 0ms;
      transform: translateX(-100%);

      .text {
        margin: 24px;
        height: 30px;
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

    // .icon {
    //   // background: #1A4489;
    //   background: #223250;
    //   height: 150px;
    //   width: 150px;
    //   z-index: 1;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;

    //   img {
    //     height: 85px;
    //   }
    // }
    .bricka {
      height: 150px;
      width: auto;
      // background: #223250;
      background: white;

      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      padding-left: 50px;
      margin-right: 50px;

      transition: $slidetime cubic-bezier(0.9,0,0.1,1) $slidetime;
      transform: translateY(100%);

      .rubrik {
        margin-top: 10px;
      }

      .speaker {
        display: flex;
        flex-direction: row;

        div {
          margin-right: 24px;
        }
      }

      &::before {
        content: '';
        position: absolute;
        right: -55px;
        height: 0;
        width: 0;
        border-right: 35.355px solid #EAE1CA;
        border-top: 35.355px solid transparent;
        border-bottom: 35.355px solid transparent;
        transform: translateY(-25px) rotate(-45deg);    
        transform-origin: left;
        margin-right: 20px;
      }
      &::after {
        content: '';
        position: absolute;
        background: white;
        right: -49px;
        bottom: 0;
        height: 100px;
        width: 51px;
      }
    } 
  }
}

.active {
  transition-delay: 0ms; 
  opacity: 1;
  .tema .bricka {
    transform: translateX(0);
    transition-delay: $slidetime; 
  }
  .title .bricka {
    transform: translateX(0);
    transition-delay: ($slidetime / 2); 
  }
}

</style>
