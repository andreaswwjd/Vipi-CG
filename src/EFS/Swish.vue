<template>
  <dir class="swish" :class="{ active }">
    <div class="bricka">
      <div class="text" :style="{transform: 'translateY('+tick*(-100)+'%)', transitionDuration: transition_time+'ms'}">
        <div class="line" v-html="f0" v-if="f0"></div>
        <div class="line" v-html="f1" v-if="f1"></div>
        <div class="line" v-html="f2" v-if="f2"></div>
        <div class="line" v-html="f0" v-if="f0"></div>
      </div>
    </div>
  </dir>
</template>
<script>
import { setInterval, clearInterval, setTimeout } from 'timers';
import { constants } from 'crypto';
const convert = require('xml-js');

export default {
  data() {
    return {
      comp: 'EFS_Swish',
      f0: 'Swish: 900 99 03',
      f1: 'Bankgiro: 900-9903',
      f2: 'www.efs.nu/ge',
      active: false,
      tick: 0,
      transition_time: 500,
      delay_time: 7000,
      interval: setInterval(()=>{},5000)
    }
  },
  computed: {
    nr(){
      return !!this.f0 + !!this.f1 + !!this.f2
    }
  },
  methods: {
    play() {
      this.active = true
      clearInterval(this.interval)
      this.interval = setInterval(()=>{
        this.transition_time = 700
        this.tick++
        console.log(this.tick)
        if (this.tick % this.nr === 0){
          setTimeout(()=>{
            this.transition_time = 0
            this.tick = 0
          }, this.transition_time)
        }
      }, this.delay_time)
      console.log('Swish')
    },
    stop() {
      this.active = false
      clearInterval(this.interval)
    },
    next() {
      console.log(this)
    },
    update(data) {
      if (typeof data == 'object') {
        if (data.f0) this.f0 = data.f0
        if (data.f1) this.f1 = data.f1
        if (data.f2) this.f2 = data.f2
      } else {
        let parsed = convert.xml2js(data);
        parsed.elements[0].elements.map(d=>{
          if (d.attributes.id == 'f0') this.f0 = d.elements[0].attributes.value
          if (d.attributes.id == 'f1') this.f1 = d.elements[0].attributes.value
          if (d.attributes.id == 'f2') this.f2 = d.elements[0].attributes.value
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

@font-face {
  font-family: Campton Semibold;
  src: url(../fonts/Campton/Rene.Bieder_Campton.SemiBold.otf);
}
@font-face {
  font-family: Campton Book;
  src: url(../fonts/Campton/Rene.Bieder_Campton.Book.otf);
}

.swish {
  color: white;
  font-family: Campton Book;
  font-size: 30px;

  .line {
    font-family: Campton Semibold;
    line-height: 30px;
  }
}

$fadetime: 0ms;
$slidetime: 700ms;

.swish {
  height: 54px;
  width: auto;
  position: absolute;
  bottom: 5%;
  right: 5%;
  overflow: hidden;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; 

  transition: $fadetime $slidetime;
  opacity: 0;

  .bricka {
    height: 54px;
    width: auto;
    background: #223250;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    text-align: center;

    transition: $slidetime cubic-bezier(0.9,0,0.1,1) 0ms;
    transform: translateX(100%);

    .text {
      height: 55px;
      display: block;
      // flex-direction: column;
      // box-sizing: border-box;

      transition-timing-function: cubic-bezier(0.9,0,0.1,1);
      // transition: 500ms cubic-bezier(0.9,0,0.1,1);
      .line {
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 13px;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
      }
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
