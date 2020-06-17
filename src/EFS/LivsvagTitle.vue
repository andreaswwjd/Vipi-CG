<template>
  <div class="livsväg title" :class="{ active }">

    <svg width="100%" height="100%" viewBox="0 0 1920 1080">

      <defs>
        <mask id="lv_mask" width="1920" height="1080">
          <g x="0" y="0" class="transition_up">
            <rect class="curtain" fill="white" y="55" x="55" width="1810"/>
            <path d="m1865,55 -55,0 55,55z"/>
          </g>
        </mask>
        <mask id="lv_titlemask">
          <rect fill="white" y="55" x="55" width="1810" height="970"/>
          <g :transform="'translate(0,'+(1080/2 - nrOfSplits * 110/2 + 110 + 110*i)+')'" v-for="(txt,i) in tspans" :key="txt">
            <text class="titlebox" x="50%" width="1000" :style="{transitionDelay: (active ? 300+i*200 : 250)+'ms'}">
              {{txt}}
            </text>
            <rect fill="white" width="1810" height="110" x="55" y="30"/>
          </g>
        </mask>
        <mask id="lv_titlemaskInverted">
          <rect fill="white" y="55" x="55" width="1810" height="970"/>
          <rect fill="black" y="55" x="55" width="1810" height="970" mask="url(#lv_mask)"/>
          <rect fill="black" y="55" x="55" width="1810" height="970" mask="url(#lv_titlemask)"/>
        </mask>
      </defs>

      <rect class="invertedtext" fill="white" y="55" x="55" width="1810" height="970" mask="url(#lv_titlemaskInverted)"/>

      <g mask="url(#lv_mask)" x="0" y="0" width="1920" height="1080">
        <rect mask="url(#lv_titlemask)" fill="white" width="1920" height="1080"/>
        <g class="transition_up" x="0" y="0">
          <path d="m1810,55 0,55 55,0z" fill="#EAE1CA"/>
        </g>
        <!-- <text class="fadein" x="50%" :y="1080/2 - nrOfSplits * 110/2 - 35 +'px'" fill="#D04F3D" style="font-size: 50px; " >{{ f1 }}</text> -->
        <foreignObject x="0" :y="1080/2 - nrOfSplits * 110/2 - 15 - 100 +'px'" width="100%" height="100">
          <Lottie class="lottie" v-bind="{ animationData, active, delay: 1100 /*, intro: [0,45], loop: 1, loopFrames: [45,0], outro: [0, 75], l0: f0*/}"/>
          <!-- <div class="lottie" ref="lottie" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/1999/xhtml"></div> -->
        </foreignObject>
        <foreignObject class="fadein" x="0" :y="1080/2 + nrOfSplits * 110/2 + 50 +'px'" width="100%" height="300" style="font-size: 35px; text-align: center;">
          <div class="textbox" xmlns="http://www.w3.org/1999/xhtml">
            <span v-for="txt in f2.split('\n')" x="50%" dy="35" :key="txt" v-html="txt+'<br>'"></span>
          </div>
        </foreignObject>
      </g>

    </svg>

  </div>
</template>
<script>
import { close } from 'fs';
const animationData = require('@/assets/livsvag_rgb.json');
import Lottie from '@/components/Lottie.vue';

export default {
  components: { Lottie },
  data() {
    return {
      comp: 'EFS_LivsvagTitle',
      f0: 'Titel', // '000000089011111118902222267890333',//
      f1: 'Titel',
      f2: `Titel`,
      defaultSplitIndex: 26,
      maxSplitIndex: 28,
      active: false,
      animationData: animationData
    }
  },
  computed: {
    scale() {
      return screen.availWidth / 1920
    },
    nrOfSplits() {
      return Math.ceil(this.f0.length / this.defaultSplitIndex)
    },
    tspans() {
      let text = this.f0
      let tspans = [text]
      if (this.nrOfSplits > 1) {
        let splitAtIndex = Math.ceil(text.length / this.nrOfSplits)
        for (let i = 0; i < this.nrOfSplits; i++) {
          let t0 = splitAtIndex - text.substr(0,splitAtIndex).lastIndexOf(' ')
          let t1 = text.substr(splitAtIndex, this.maxSplitIndex - splitAtIndex).indexOf(' ')

          // Choosing the closest spacecharacter to splitindex 
          let closestIndex 
          if (t0 === splitAtIndex+1) {
            if (t1 === -1) {
              closestIndex = splitAtIndex
            } else {
              closestIndex = splitAtIndex + t1
            }
          } else {
            if (t1 === -1) {
              closestIndex = splitAtIndex - t0
            } else {
              closestIndex = t0 < t1 ? splitAtIndex - t0 : splitAtIndex + t1;
            }
          }

          tspans[i] = text.substr(0,closestIndex)
          text = text.substr(closestIndex)
          if (text != '' && t0 == splitAtIndex+1 && t1 == -1) { tspans[i] += '-' }

}
        tspans[tspans.length-1] += text
      }
      return tspans
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
      if(data.defaultSplitIndex) {
        this.defaultSplitIndex = data.defaultSplitIndex
      }
      if(data.maxSplitIndex) {
        this.maxSplitIndex = data.maxSplitIndex
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


<style scoped>
/* @font-face {
  font-family: 'Josefin Sans Regular';
  src: url(../fonts/JosefinSans/JosefinSans-Regular.ttf);
}
@font-face {
  font-family: 'Josefin Sans Bold Italic';
  src: url(../fonts/JosefinSans/JosefinSans-BoldItalic.ttf);
} */
@font-face {
  font-family: Campton Semibold;
  src: url(../fonts/Campton/Rene.Bieder_Campton.SemiBold.otf);
}
@font-face {
  font-family: Campton Book;
  src: url(../fonts/Campton/Rene.Bieder_Campton.Book.otf);
}

.title {
  position: relative;
  height: 100%;
  width: 100%;
  position: absolute;
  /* Action Safe: */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  /* font-family: 'Josefin Sans Bold Italic'; */
  font-family: 'Campton Semibold';

}

.title svg {
  position: absolute;
  transition: 400ms;
  /* opacity: 0; */
}

.title svg text {
  text-anchor: middle; 
  width: 1000px; 
  height: 35px; 
  font-size: 35px; 
  text-align: center; 
  /* font-family: 'Josefin Sans Bold Italic'; */
  font-family: 'Campton Semibold';
}

.title .textbox {
  font-size: 35px; 
  text-align: center; 
  /* font-family: 'Josefin Sans Regular'; */
  font-family: 'Campton Book';
} 
.title .textbox strong {
  /* font-family: 'Josefin Sans Bold Italic'; */
  font-family: 'Campton Semibold';
} 
.title .titlebox {
  font-size: 110px; 
  transform: translate(0,110px);
  transition: all 700ms cubic-bezier(0.9,0,0.1,1);
}
.title.active .titlebox {
  transform: translate(0,0);
}

.title .transition_up, .title .curtain {
  transition: all 1s cubic-bezier(0.9,0,0.1,1);
  /* transition-delay: 500ms; */
}
.title.active .transition_up, .title.active .curtain {
  transition-delay: 1000ms;
}

.title .transition_up {
  transform: translate(0,970px);
}
.title.active .transition_up {
  transform: translate(0,0);
}

.title .curtain {
  height: 0;
}
.title.active .curtain {
  height: 970px;
}

.title .invertedtext {
  opacity: 0;
}
.title.active .invertedtext {
  opacity: 1;
}

.title .fadein {
  opacity: 0;
  transition: 1s;
}
.title.active .fadein {
  opacity: 1;
  transition-delay: 500ms;
}

.lottie {
  opacity: 0;
  transition: 500ms opacity;
}
.title.active .lottie {
  opacity: 1;
}
</style>
