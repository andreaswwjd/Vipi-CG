<template>
  <div class="control-panel">

    <div class="buttons">
      <div>
        <h2>Screen</h2>
        <div class="btn-group btn-group-block">
          <input class="input form-input" v-model="bg">
          <div class="transparent-bg" :style="{background: bg != 'transparent' ? bg : ''}" style="width: 30px; height: 30px; border-radius: 50%;"></div>
          <button class="btn" @click="setBg(bg)">Set color</button>
        </div>
      </div>

      <div>
        <h2>Stop All</h2>
        <div class="btn-group btn-group-block">
          <button class="btn" @click="stopAll()">Stop all</button>
        </div>
      </div>

    </div>  


    <div class="control" v-for="control in controls" :key="control.event">
      <TableView v-bind="control">
        <component :is="control.component" :class="{active: tick}"/>
      </TableView>
    </div>

    <div class="modal" :class="{open: modalIsOpen}">
      <div class="backgropp"></div>
      <div class="modal-content box shadow">
        <div class="columns">
          <div class="column col-4 bg-light">
            <h2>Saved sessions</h2>
            <div class="list">
              <p class="box big-btn shadow" v-for="session in ['Söndag morgonmöte', 'Söndagsgudstjänst', 'Måndag']">
                {{session}}
              </p>
            </div>
          </div>
          <div class="column col-8">
            <div class="close" @click="modalIsOpen = false;">&times;</div>
            <img src="@/assets/new.png" style="width: 25%;">
            <h1>Give me a name!</h1>
            <div class="input" :class="{error}">
              <input v-model="newSessionName"/>
            </div>
            <p v-if="error" class="error">{{error}}</p>
            <div class="big-btn box shadow" @click="newSession(newSessionName)">Create session</div>
          </div>
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
      newSessionName: '',
      error: '',
      modalIsOpen: true,
      db: {
        title: [],
        tema: [],
        datum: [],
        namnskylt: [],
        lowerthird: [],
        titlesmall: []
      },
      sessions: {
        'session-1': {
          name: 'session-1',
          templates: {
            'FKAB_Title': [{
              f0: '',
              f1: '',
              f3: '',
            }]
          }
        }
      },
      // compositions: [
      //   [{
      //     component: 'title',
      //     play: 0,
      //     stop: 3
      //   },{
      //     component: 'namnskylt',
      //     play: 3,
      //     stop: 0
      //   }]
      // ]
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
    // intro () {
    //   this.$socket.emit('data', {event: 'lowerthird_play'})
    //   setTimeout(()=>{ this.$socket.emit('data', {event: 'lowerthird_stop'})}, 5000)
    //   setTimeout(()=>{ 
    //     this.$socket.emit('data', {event: 'datum_play'})
    //     this.$socket.emit('data', {event: 'tema_play'})
    //   }, 6000)
    //   setTimeout(()=>{ this.$socket.emit('data', {event: 'datum_stop'})}, 10000)
    // },
    setBg() {
      this.$socket.emit('data', {event: 'background', data: this.bg})
    },
    // playKeyframes(composition) {
    //   composition.map(keyframe=>{
    //     setTimeout(()=>{ this.$socket.emit('data', {event: keyframe.component+'_play'})}, keyframe.play*1000)
    //     if (keyframe.stop) setTimeout(()=>{ this.$socket.emit('data', {event: keyframe.component+'_stop'})}, keyframe.stop*1000)
    //   })
    // },
    stopAll () {
      this.controls.map(control=>{
        this.$socket.emit('data', {event: control.event+'_stop'})
      })
    },
    newSession(newSessionName) {
      if(!newSessionName) {
        this.error = 'OBS! The session need a name.'
        return 
      }
      if (this.sessions.find(s=>s.file == newSessionName)) {
        this.error = 'OBS! The session already exists.'
        return 
      }

      // this.songs.push({
      //   file: newSessionName+'.txt',
      //   f0: '',
      //   f1: '',
      //   f2: ''
      // })
      // this.edit = true
      // this.error = ''
      // this.newSessionName = ''
      // this.modalIsOpen = false
      // this.song_nr = this.songs.length - 1
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

<style lang="scss" scoped>

@import "../assets/spectre/_variables";
@import "../assets/spectre/_mixins";
@import "../assets/spectre/_buttons";
@import "../assets/spectre/_forms";
// @import "../assets/spectre/_layout";

@font-face {
  font-family: Josefin Sans;
  src: url(../fonts/JosefinSans/JosefinSans-Regular.ttf);
}
@font-face {
  font-family: Josefin SemiBold;
  src: url(../fonts/JosefinSans/JosefinSans-SemiBold.ttf);
}

body {
  width: 100vw;
  height: 100vh !important;
}

h1, h2, h3, h4, h5, h6, button {
  font-family: Josefin SemiBold, Helvetica, Arial, sans-serif;
}

input, textarea, p, .big-btn {
  font-family: Josefin Sans;
}

input, textarea {
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 7px;
  line-height: 30px;
  font-size: 1em;
  padding: 0 5px 0 5px;
  border: lightgray solid 1px;
}

$max_width: 1000px;

@mixin bg-opacity($color, $opacity) {
  background: $color;
  background: rgba($color, $opacity);
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
.control-panel {
  padding: 4em;
}
.control {
  width: 100%;
  max-width: $max_width;
  margin: 10px auto;
  display: block;
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
.btn-group {
  display: flex;
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
.transparent-bg {
  background: #eee url('data:image/svg+xml,\
   <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill-opacity=".05" >\
      <rect x="200" width="200" height="200" />\
      <rect y="200" width="200" height="200" />\
    </svg>');
  background-size: 30%;
} 





.box {
  box-shadow: 0 2.8px 2.2px rgba(100, 100, 100, 0.034);

  padding: 15px;
  background: white;
  border-radius: 5px;
}

.shadow {
  box-shadow:
    0 2.8px 2.2px rgba(100, 100, 100, 0.034),
    0 6.7px 5.3px rgba(100, 100, 100, 0.048),
    0 22.3px 17.9px rgba(100, 100, 100, 0.072);

}

.big-btn {
  margin: 10px;
  flex-basis: 33%;
  min-width: 150px;
  max-height: 50px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 500ms;
  background: white;
  cursor: pointer;

  code {
    color: gray;
  }

  &.edit {
    min-width: 50px;
    min-height: initial;
    position: absolute;
    top: 15px;
    right: 0;
    border: lightcoral solid 1px;
    border-radius: 50px;
    box-shadow: 0 2.8px 2.2px rgba(100, 100, 100, 0.034);
    font-size: 14px;
    padding: 4px 8px;
  }

  &:hover, &.hit {
    transition: 200ms;
    background: lightblue;
  }
  &.play:hover, &.play.hit {
    background: lightgreen;
  }
  &.stop:hover, &.stop.hit {
    background: lightcoral;
  }
  &.edit:hover {
    background: lightgray;
  }

  &:disabled, &[disabled] {
    opacity: 0.5;
    background: white !important;
    color: gray !important;
    box-shadow: 0 2.8px 2.2px rgba(100, 100, 100, 0.034);
    cursor: not-allowed;
  }
  
}
p.error {
  color: indianred;
  font-size: 12px;
}

input.error {
  border-color: indianred;
}

.bg-light {
      background: #fafafa;

}
.columns {
  height: 100%;
  width: 100%;
  padding: 2em 2em;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  .column {
    height: 100%;
    position: relative;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .list {
      padding: 1em;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      text-align: left;
    }
  }
  .column.col-2 {
    flex-basis: calc(8.33% * 2);
  }
  .column.col-3 {
    flex-basis: calc(8.33% * 3);
  }
  .column.col-4 {
    flex-basis: calc(8.33% * 4);
  }
  .column.col-5 {
    flex-basis: calc(8.33% * 5);
  }
  .column.col-7 {
    flex-basis: calc(8.33% * 7);
  }
  .column.col-8 {
    flex-basis: calc(8.33% * 8);
  }
  .column.col-9 {
    flex-basis: calc(8.33% * 9);
  }

  .column-line {
    width: 3px;
    height: 100%;
    background: #fafafa;
  }
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0,0,0,0.2);

  opacity: 0;
  transition: 300ms;
  pointer-events: none;
  &.open {
    opacity: 1;
    pointer-events: initial;
  }
  // .backdrop {
  //   position: absolute;
  //   top: 0;
  //   bottom: 0;
  //   right: 0;
  //   left: 0;
  // }
  .modal-content {
    max-width: $max_width;
    width: calc(100vw - 8em);
    height: calc(100vh - 8em);
    border-radius: 10px;
    padding: 2em;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .close {
      top: 7px;
      right: 7px;
      position: absolute;
      color: #aaa;
      font-size: 40px;
      font-weight: 100;
      margin-top: -10px;
      cursor: pointer;
      &:hover {
        color: indianred;
      }
    }
    .input {
      height: 30px;
      border: solid #cfcfcf 1px;
      border-radius: 7px;
      width: 50%;
      // input {
      //   width: 85%;
      // }
      &.error {
        border-color: indianred;
      }
    }
    .big-btn {
      max-height: 20px;
      // width: 33%;
      // width: 75%;
      font-size: 20px;
      padding: 0.3em 1em;
      // align-self: flex-end;
    }
  }
}
</style>