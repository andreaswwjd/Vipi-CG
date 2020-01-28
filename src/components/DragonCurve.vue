<template>
  <div id="app">
    <div class="curvediv" :class="{active, yled: data.dir=='top'||data.dir=='bottom', xled: data.dir=='left'||data.dir=='right'}" v-for="data in curve" :key="data.index" 
      :style="{
        left: (200+data.x*divSize)+'px', 
        top: (200+data.y*divSize)+'px', 
        backgroundPosition: (200-data.x*divSize)+'px ' + (200-data.y*divSize)+'px',
        height: divSize, 
        width: divSize,
        transitionDelay: data.index*0.08+'s',
        transformOrigin: data.dir
      }" ></div>
    <div class="container" :class="{ active }"></div>
    <!-- <svg width="1000" height="1000">
      <path stroke="black" fill="none" :d="pathify(dragonCurve(curveSize))"/>
    </svg> -->
    <div>
    </div>
  </div>
</template>
<script>
import { setInterval } from 'timers';

export default {
  data() {
    return {
      f0: 'Andreas Lundström',
      f1: '',
      f2: '',
      active: false,
      curveSize: 7,
      divSize: 10

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
    },
    dragonCurve(curveSize){
      let r = [1]
      while(curveSize-- && curveSize>0){ 
        r = [...r, 1, ...r.map(d => -d).reverse()]
      }
      // Directions = sum of values until index
      let dirs = r.map((d,i,a)=> a.slice(0,i+1).reduce((a,b)=>a+b) )
      let xs = dirs.map((d,i,a)=> a.slice(0,i+1).reduce((a,b) => {
        if (b%4==0) return a+1 // right
        if (b%4==1) return a   // down
        if (b%4==2) return a-1 // left
        if (b%4==3) return a   // up
      },0) )
      let ys = dirs.map((d,i,a)=> a.slice(0,i+1).reduce((a,b) => {
        if (b%4==0) return a   // right
        if (b%4==1) return a+1 // down
        if (b%4==2) return a   // left
        if (b%4==3) return a-1 // up
      },0) )

      return r.map((d,i) => ({
          index: i,
          r: d,
          dir: dirs[i]%4==0 ? 'left': dirs[i]%4==1 ? 'top' : dirs[i]%4==2 ? 'right' : 'bottom',
          x: xs[i],
          y: ys[i]
        })
      )
    },
    pathify(dragonCurve){
      return 'M190,200 200,200 ' + dragonCurve.map(d => (200+d.x*10) +','+ (200+d.y*10) ).join(' ')
    },
    randomHex(){
      return 'rgb('+ (200+Math.ceil(Math.random()*55)) +',100,100)'
    }
  },
  computed: {
    curve() {
      return this.dragonCurve(this.curveSize)
    }
  },
  sockets: {
    event: function() {
      this.play()
    }
  },
  created() {
    window.play   = this.play
    window.stop   = this.stop
    window.next   = this.next
    window.update = this.update
    // setInterval(()=>{
    //   this.curveSize++
    //   if(this.curveSize > 10) this.curveSize = 0
    // },1000)
  }
}

</script>


<style>
@font-face {
  font-family: Campton Semibold;
  src: url(../fonts/Campton/Rene.Bieder_Campton.SemiBold.otf);
}
@font-face {
  font-family: Campton Book;
  src: url(../fonts/Campton/Rene.Bieder_Campton.Book.otf);
}
body {
  position: relative;
  margin: 0;
  width: 100vw;
  height: 56.25vw;
  max-width: 100vw;
  max-height: 100vh;
  /* background-image: url(../assets/testscreen.png); */
  /* background-color: gray; */
  background-repeat: no-repeat;
  background-size: cover; 
}
#app {
  font-family: Campton Book, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  position: absolute;
  /* Action Safe: */
  top: 5%;
  left: 5%;
  bottom: 5%;
  right: 5%;

}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 5px; 
  left: 5px; 
  position: absolute;
  height: 2em;
}
.curvediv {
  position: absolute;
  width: 10px;
  height: 10px;
  opacity: 0;
  transition: 100ms;
  background-image: url(../assets/testscreen.png);
  background-size: 1080px;

}
.curvediv.xled{
  transform:  rotateX(90deg) rotateY(90deg);
}
.curvediv.yled{
  transform:  rotateY(90deg) rotateX(90deg);
}
.curvediv.active {
  opacity: 1;
  transform: rotateX(0deg) rotateY(0deg);
}
</style>
