<template>
  <div>

    <div class="control" v-for="control in controls" :key="control.event">
      <TableView v-bind="control">
        <component :is="control.component" :class="{active: tick}"/>
      </TableView>
    </div>

    <div class="buttons">
      <div>
        <h4>Screen</h4>
        <div class="btn-group btn-group-block">
          <input class="input" v-model="bg">
          <div :style="{background: bg}" style="width: 30px; height: 30px; border-radius: 50%;"></div>
          <button class="btn btn-sm" @click="setBg(bg)">Set color</button>
        </div>
      </div>

      <div>
        <h4>INTRO</h4>
        <div class="btn-group btn-group-block">
          <button class="btn btn-sm" @click="intro()">Play</button>
        </div>
      </div>

      <div>
      
      <h4>Stop All</h4>
        <div class="btn-group btn-group-block">
          <button class="btn btn-sm" @click="stopAll()">Stop all</button>
        </div>
      </div>

    </div>   
    
  </div>
</template>

<script>
import { setTimeout, setInterval } from 'timers';
import components, { controls } from './_components';
// @ is an alias to /src

import TableView from '@/components/TableView.vue';

export default {
  name: 'remote',
  components: {
    ...components,
    TableView
  },
  data () {
    return {
      controls,
      tick: true,
      bg: 'transparent',
      db: {
        title: [],
        tema: [],
        datum: [],
        namnskylt: [],
        lowerthird: [],
        titlesmall: []
      },
      compositions: [
        [{
          component: 'title',
          play: 0,
          stop: 3
        },{
          component: 'namnskylt',
          play: 3,
          stop: 0
        }]
      ]
    }
  },
  created () {
    setTimeout(()=>{this.tick = true},0)
    setInterval(()=>{
      this.tick = false
      setTimeout(()=>{this.tick = true},1500)
    }, 7000)
    this.$socket.emit('ready')
  },
  methods: {
    intro () {
      this.$socket.emit('data', {event: 'lowerthird_play'})
      setTimeout(()=>{ this.$socket.emit('data', {event: 'lowerthird_stop'})}, 5000)
      setTimeout(()=>{ 
        this.$socket.emit('data', {event: 'datum_play'})
        this.$socket.emit('data', {event: 'tema_play'})
      }, 6000)
      setTimeout(()=>{ this.$socket.emit('data', {event: 'datum_stop'})}, 10000)
    },
    setBg() {
      this.$socket.emit('data', {event: 'background', data: this.bg})
    },
    playKeyframes(composition) {
      composition.map(keyframe=>{
        setTimeout(()=>{ this.$socket.emit('data', {event: keyframe.component+'_play'})}, keyframe.play*1000)
        if (keyframe.stop) setTimeout(()=>{ this.$socket.emit('data', {event: keyframe.component+'_stop'})}, keyframe.stop*1000)
      })
    },
    stopAll () {
      this.controls.map(control=>{
        this.$socket.emit('data', {event: control.event+'_stop'})
      })
    }
  },
  sockets: {
    // lastSession: function(db){
    //   if(db) {
    //     Object.keys(db).map(key=>{
    //       this.db[key] = db[key]
    //     })
    //   }
    // }
  }
}
</script>
<style src="../assets/spectre.min.css"></style>
<style src="../assets/spectre-icons.min.css"></style>
<style src="../assets/spectre-exp.min.css"></style>

<style lang="scss">

body {
  width: 100vw;
  height: 100vh !important;
}
#app {
  width: 100vw;
  position: relative;
}
.container {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.control {
  width: 100%;
  margin: 10px auto;
  display: inline-block;
}
.table {
  display: inline-block;
}
.thumbnail {
  width: 192px;
  height: 108px;
  overflow: hidden;
  position: relative;
  background: #eee url('data:image/svg+xml,\
   <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill-opacity=".05" >\
      <rect x="200" width="200" height="200" />\
      <rect y="200" width="200" height="200" />\
    </svg>');
  background-size: 10px 10px;

  .scaler {
    width: 1920px;
    height: 1080px;
    transform: scale(0.1);
    transform-origin: top left;
  }
}

.slider {
  position: absolute;
}
.progress {
  position: absolute;
  width: auto;
  top: 10px;
  z-index: 1;
}

.buttons {
  display: flex;
  flex-basis: 20%;
  flex-grow: 1;
  justify-content: space-around;
}
.btn-group-block {
  align-items: center;
}
.btn-group > div {
  display: flex;
  flex-direction: column;
}
.btn-group-block * {
  margin: 5px;
}
</style>
