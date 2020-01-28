<template>
  <div class="lottie" ref="lottie" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/1999/xhtml"></div>
</template>
<script>
import lottie from 'lottie-web';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      anim: null
    }
  },
  props: {
    active: Boolean,
    animationData: Object,
    intro: {
      type: Array,
      default: null
    },
    outro: {
      type: Array,
      default: null
    },
    loopFrames: {
      type: Array,
      default: null
    },
    delay: {
      type: Number,
      defalt: 0
    },
    render: {
      type: String,
      default: 'svg',
    },
    loop: {
      type: Boolean | Number,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    l0: String,
    l1: String,
    l2: String,
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lottie,
      ...this.$props
    })
  },
  methods: {
    play(){
      this.anim.goToAndStop(0)
      setTimeout(()=>{
        if (this.intro) {
          if (this.loopFrames) this.anim.playSegments([this.intro, this.loopFrames], true)
          else this.anim.playSegments(this.intro, true)
        } else {
          this.anim.play()
        }
      }, this.delay)
    },
    stop(){
      if (this.outro) {
        this.anim.playSegments(this.outro, false)
      }
    }
  },
  watch: {
    'active': function(active){
      active ? this.play() : this.stop()
    },
    'l0': function(f){
      this.anim.renderer.elements[0].updateDocumentData({t: f},0);
    },
    'l1': function(f){
      this.anim.renderer.elements[1].updateDocumentData({t: f},0);
    },
    'l2': function(f){
      this.anim.renderer.elements[2].updateDocumentData({t: f},0);
    }
  }
}
</script>
