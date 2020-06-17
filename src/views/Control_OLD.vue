<template>
  <div class="control-panel">

    <div>
      <h1>{{ session.sessionName }}</h1>
    </div>
    <button class="settings btn flexbox row" style="border: none;" @click="settingsModalIsOpen = true">
      <i class="icon icon-apps" style="margin-right:2px;"></i>
      <span>Settings</span>
    </button>

    <div class="space"></div>
    <div class="control" v-for="control in activeControls" :key="control.event">
      <TableView v-bind="control">
        <component :is="control.component" :class="{active: tick}"/>
      </TableView>
    </div>
    <div class="add-control">
      <div class="big-btn box" @click="templateModalIsOpen = !templateModalIsOpen">Add template</div>
    </div>
    <div class="space"></div>

    <!-- Add templates panel -->
    <div class="modal" :class="{open: templateModalIsOpen}">
      <div class="backgropp"></div>
      <div class="modal-content box shadow">
        <div class="close" @click="templateModalIsOpen = false;">&times;</div>
        <h1 class="title">Pick your favorites!</h1>
        <div class="grid">
          <div class="item" v-for="template in controls" :key="'temp'+template.component" @click="addTemplate(template)" :class="{disabled: sessionHasTemplate(template)}">
            <div class="thumbnail">
              <div class="scaler">
                <component :is="template.component" :class="{active: tick}"/>
              </div>
            </div>
            <h2 class="title">{{ template.title }}</h2>
            <div class="close" @click.stop="removeTemplate(template)">&times;</div>
          </div>
        </div>
        <div class="box shadow big-btn" @click="templateModalIsOpen = false;">Done</div>
      </div>
    </div>

    <!-- Load Session Panel -->
    <div class="modal" :class="{open: !session.sessionName}">
      <div class="backgropp"></div>
      <div class="modal-content box shadow" style="width: 600px;">
        <div class="column col-4 bg-light" style="padding: 2em;">
          <h2 style="text-align: center" v-if="session_list[0]">Load session</h2>
          <div class="list">
            <p class="box big-btn shadow" v-for="sessionName in session_list" :key="sessionName" @click="$socket.emit('session_load', sessionName)">
              {{ sessionName }}
            </p>
            <!-- <p class="box big-btn shadow">
              <input id="new_session_input" placeholder="Name" style="width: 100%; border: none;">
            </p> -->
          </div>

          <div>
            <h2 style="text-align: center">Create a new session</h2>
            <div class="btn-group btn-group-block">
              <button class="btn" @click="settingsModalIsOpen = false; sessionModalIsOpen = true">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Session Panel -->
    <div class="modal" :class="{open: sessionModalIsOpen}">
      <div class="backgropp"></div>
      <div class="modal-content box shadow" style="width: 600px;">
          <!-- <div class="column col-4 bg-light">
            <h2>Saved sessions</h2>
            <div class="list">
              <p class="box big-btn shadow" v-for="session in ['Söndag morgonmöte', 'Söndagsgudstjänst', 'Måndag']" :key="session">
                {{session}}
              </p>
            </div>
          </div> -->
            <div class="close" @click="sessionModalIsOpen = false;">&times;</div>
            <img src="@/assets/new.png" style="width: 25%;">
            <h1>Give me a name!</h1>
            <div class="input" :class="{error}">
              <input v-model="newSessionName"/>
            </div>
            <p v-if="error" class="error">{{error}}</p>
            <div class="big-btn box shadow" @click="newSession(newSessionName)">Create session</div>
      </div>
    </div>

    <!-- Settings panel -->
    <div class="modal" :class="{open: settingsModalIsOpen}">
      <div class="backgropp"></div>
      <div class="modal-content box shadow">
        <div class="close" @click="settingsModalIsOpen = false;">&times;</div>
        <h1 class="title">Settings</h1>
        <div class="columns" style="overflow: scroll;">
          <div class="column col-5">
            <h2>Screen</h2>
            <input class="input form-input" style="width: 100px;" v-model="bg">
            <div class="btn-group btn-group-block">
              <div class="transparent-bg" :style="{background: bg != 'transparent' ? bg : ''}" style="width: 30px; height: 30px; margin: 0;"></div>
              <button class="btn" @click="setBg(bg)">Set color</button>
            </div>


            <div>
              <h2>Stop All</h2>
              <div class="btn-group btn-group-block">
                <button class="btn" @click="stopAll()">Stop all</button>
              </div>
            </div>
          </div>

          <div class="column col-4 bg-light">
            <h2>Saved sessions</h2>
            <div class="list">
              <p class="box big-btn shadow" v-for="sessionName in session_list" :key="sessionName" @click="$socket.emit('session_load', sessionName)">
                {{ sessionName }}
              </p>
              <!-- <p class="box big-btn shadow">
                <input id="new_session_input" placeholder="Name" style="width: 100%; border: none;">
              </p> -->
            </div>

            <div>
              <h2>New session</h2>
              <div class="btn-group btn-group-block">
                <button class="btn" @click="settingsModalIsOpen = false; sessionModalIsOpen = true">Create</button>
              </div>
            </div>
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
      sessionModalIsOpen: false,
      templateModalIsOpen: false,
      settingsModalIsOpen: false,
      // db: {
      //   title: [],
      //   tema: [],
      //   datum: [],
      //   namnskylt: [],
      //   lowerthird: [],
      //   titlesmall: []
      // },
      session: {
        sessionName: undefined,
        texts: [],
        templates: {},
      },
      session_list: [],
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
  computed: {
    activeControls() {
      return this.controls.filter(c=>!!this.session.templates[c.component])
      // return this.controls.filter(c=>c.active)
    }, 
    // templates() {
    //   return controls.filter(template => !!this.session.templates[template.component])
    // },
  },
  created () {
    setTimeout(()=>{this.tick = true},0)
    setInterval(()=>{
      this.tick = false
      setTimeout(()=>{this.tick = true},1500)
    }, 7000)
    // this.$socket.emit('session_current')
    this.$socket.emit('session_list')
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
    newSession(sessionName) {
      if(!sessionName) {
        this.error = 'OBS! The session need a name.'
        return 
      }
      if (this.session_list.find(s=>s == sessionName)) {
        this.error = 'OBS! The session already exists.'
        return 
      }
      this.$socket.emit('session_create', sessionName)
      this.sessionModalIsOpen = false
    },
    sessionHasTemplate(control) {
      return this.session.templates.hasOwnProperty(control.component)
    },
    addTemplate(template) {
      this.session.templates[template.component] = []
      this.saveSession()
    },
    removeTemplate(template) {
      delete this.session.templates[template.component]
      this.saveSession()
    },
    saveSession() {
      this.$socket.emit('session_save', this.session)      
    }
  },
  sockets: {
    // session_current: function(sessionName){
    //   this.session.sessionName = sessionName
    // },
    session_list: function(session_list){
      this.session_list = session_list
    },
    session: function(session){
      for(let key in session) {
        this.session[key] = session[key]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../assets/style/global";

@import "../assets/spectre/_variables";
@import "../assets/spectre/_mixins";
@import "../assets/spectre/_buttons";
@import "../assets/spectre/_forms";

@import "../assets/spectre/spectre-icons";

$primary-color: lightgreen;

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
  min-width: 850px;
  max-width: $max_width;
  margin: 10px auto;
  display: block;
}
.add-control {
  width: 100%;
  height: 192px;
  max-width: $max_width;
  margin: 10px auto;
  display: block;
  border-radius: $unit-7;
  background: #fafafa;
  margin: 4em 0;

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #f3f3f3;
    .big-btn {
      @extend .shadow;
    }
  }
}
.space {
  width: 100%;
  height: 90px;
  max-width: $max_width;

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





// .box {
//   box-shadow: 0 2.8px 2.2px rgba(100, 100, 100, 0.034);

//   padding: 15px;
//   background: white;
//   border-radius: 5px;
// }

// .shadow {
//   box-shadow:
//     0 2.8px 2.2px rgba(100, 100, 100, 0.034),
//     0 6.7px 5.3px rgba(100, 100, 100, 0.048),
//     0 22.3px 17.9px rgba(100, 100, 100, 0.072);

// }

// .flexbox {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   &.row {
//     flex-direction: row;
//   }
// }
.settings {
  position: absolute;
  top: 2em;
  right: 2em;
}

// .big-btn {
//   margin: 10px;
//   flex-basis: 33%;
//   min-width: 150px;
//   max-height: 50px;
//   min-height: 50px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   transition: 500ms;
//   background: white;
//   cursor: pointer;

//   code {
//     color: gray;
//   }

//   &.edit {
//     min-width: 50px;
//     min-height: initial;
//     position: absolute;
//     top: 15px;
//     right: 0;
//     border: lightcoral solid 1px;
//     border-radius: 50px;
//     box-shadow: 0 2.8px 2.2px rgba(100, 100, 100, 0.034);
//     font-size: 14px;
//     padding: 4px 8px;
//   }

//   &:hover, &.hit {
//     transition: 200ms;
//     background: lightblue;
//   }
//   &.play:hover, &.play.hit {
//     background: lightgreen;
//   }
//   &.stop:hover, &.stop.hit {
//     background: lightcoral;
//   }
//   &.edit:hover {
//     background: lightgray;
//   }

//   &:disabled, &[disabled] {
//     opacity: 0.5;
//     background: white !important;
//     color: gray !important;
//     box-shadow: 0 2.8px 2.2px rgba(100, 100, 100, 0.034);
//     cursor: not-allowed;
//   }
  
// }
// p.error {
//   color: indianred;
//   font-size: 12px;
// }

// input.error {
//   border-color: indianred;
// }

.bg-light {
      background: #fafafa;

}
// .columns {
//   height: 100%;
//   width: 100%;
//   padding: 2em 2em;

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: row;
//   .column {
//     height: 100%;
//     position: relative;
//     padding: 1em;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     .list {
//       padding: 1em;
//       display: flex;
//       align-items: flex-start;
//       justify-content: flex-start;
//       flex-direction: column;
//       text-align: left;
//     }
//   }
//   .column.col-2 {
//     flex-basis: calc(8.33% * 2);
//   }
//   .column.col-3 {
//     flex-basis: calc(8.33% * 3);
//   }
//   .column.col-4 {
//     flex-basis: calc(8.33% * 4);
//   }
//   .column.col-5 {
//     flex-basis: calc(8.33% * 5);
//   }
//   .column.col-7 {
//     flex-basis: calc(8.33% * 7);
//   }
//   .column.col-8 {
//     flex-basis: calc(8.33% * 8);
//   }
//   .column.col-9 {
//     flex-basis: calc(8.33% * 9);
//   }

//   .column-line {
//     width: 3px;
//     height: 100%;
//     background: #fafafa;
//   }
// }

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
  .modal-content {
    max-width: $max_width;
    width: calc(100vw - 8em);
    height: calc(100vh - 10em);
    // height: auto;
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
      &.error {
        border-color: indianred;
      }
    }
    .big-btn {
      max-height: 20px;
      font-size: 20px;
      padding: 0.3em 1em;
    }

    .grid {
      background: #fff;
      overflow: scroll;
      width: calc((240px + 2em) * 2);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      @media screen and (min-width: 880px) {
        &.grid {
          width: calc((240px + 2em) * 3 );
        }
      }
      .item {
        position: relative;
        flex: 192px 0 0;
        max-width: 192px;
        margin: 1em;
        padding: 1em;
        border: 3px white solid;
        border-radius: $unit-3;
        
        opacity: 1;
        transition: 1s;
        // transform-origin: 50% 100%;

        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;

        .title {
          text-align: center;
          width: 100%;
          height: 10px;
        }


        &:hover {
          transition: 200ms;
          background: #fafafa;
          // transform: scale(1.1);

          .title {
            opacity: 0.5;
          }

          .thumbnail {
            opacity: 0.5;
            transition: 200ms;
            transform: scale(0.95);
          }

          &:after {
            content: '\FF0B';
            @extend .shadow;
            @extend .box;
            position: absolute;
            padding: .7em;
            height: 0;
            width: 0;
            border-radius: 1000px;
            background: white;
            color: lightgreen;
            font-size: 3em;
            font-weight: 900;
            vertical-align: middle;

            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .close {
          display: none;
        }
        &.disabled {
          opacity: 0.5;
          background: white;
          border: 3px solid lightgreen;
          &:hover {
            &::after {
              content: none;
            }
            .close {
              display: block;
            }
          }
          &::before {
            content: 'ACTIVE';
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            color: green;
            font-weight: 900;
          }
          .thumbnail {
            transform: initial;
            opacity: 0.5;
          }
          .title {
            opacity: 0.5;
          }
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
          border-radius: $unit-3;
          border: 18px white solid;
          transition: 1s;

          .scaler {
            width: 1920px;
            height: 1080px;
            transform: scale(0.1);
            transform-origin: top left;
          }
        }
      }
    }
  }
}



</style>