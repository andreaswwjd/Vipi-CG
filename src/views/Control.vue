<template>
  <div>

    <div class="block" v-for="block in blocks" :key="block.event">
      <TableView v-bind="block">
        <component :is="block.component" :class="{active: tick}"/>
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
// @ is an alias to /src

import Datum from '@/templates/Datum.vue';
import LivsvagTitle from '@/templates/LivsvagTitle.vue';
import LowerThird from '@/templates/LowerThird.vue';
import Namnskylt from '@/templates/Namnskylt.vue';
import Notis from '@/templates/Notis.vue';
import Swish from '@/templates/Swish.vue';
import Tema from '@/templates/Tema.vue';
import Title from '@/templates/Title.vue';
import Bibelord from '@/templates/Bibelord.vue';

import TableView from '@/components/TableView.vue';

export default {
  name: 'remote',
  components: {
    Datum,
    LivsvagTitle,    
    LowerThird,
    Namnskylt,
    Notis,
    Swish,
    Tema,
    Title, 
    Bibelord, 
    
    TableView
  },
  data () {
    return {
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
      blocks: [
        {
          placeholders: { f0:'Rubrik',f1:'Talare',f2:'etc.',f3:'Tema' },
          event: 'lowerthird',
          title: 'Titel (Lower third)',
          component: 'LowerThird'
        },{
          placeholders: { f0:'Namn',f1:'Titel' },
          event: 'namnskylt',
          title: 'Namnskylt',
          component: 'Namnskylt'
        },{
          placeholders: { f0:'Rubrik', f1:'Tema', f2:'etc.' },
          event: 'title',
          title: 'Titel (fullskärm)',
          component: 'Title'
        },{
          placeholders: { f0:'Plats', f1:'Tidpunkt' },
          event: 'datum',
          title: 'Datum',
          component: 'Datum'
        },{
          placeholders: { f0:'Tema/Sammanhang' },
          event: 'tema',
          title: 'Tema',
          component: 'Tema'
        },{
          placeholders: { f0:'i', f1:'Typ (fet stil)', f2:'Notis' },
          event: 'notis',
          title: 'Notis',
          component: 'Notis'
        },{
          placeholders: { f0:'Swish', f1:'Bg', f2:'Hemsida' },
          event: 'swish',
          title: 'Swish',
          component: 'Swish'
        },{
          placeholders: { f0:'Rubrik', f1:'Tema', f2:'etc.' },
          event: 'livsvag_title',
          title: 'Titel (Livsväg)',
          component: 'LivsvagTitle'
        },{
          placeholders: { f0:'Text', f1:'Referens' },
          event: 'bibelord',
          title: 'Bibelord',
          component: 'Bibelord'
        }
      ],
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
      this.blocks.map(block=>{
        this.$socket.emit('data', {event: block.event+'_stop'})
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
.block {
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
