<template>
  <div class="songs_control" :class="{active}">
    <div class="row">
      <div class="col-12">

      </div>
    </div>
    <div class="row">
      <div class="col col-3">
        
        <div class="files box" v-if="songs.length">
          <h2>Filer</h2>
          <div class="file" v-for="(song,i) in songs" :key="song.file" :class="{current: current_song.file == song.file}" @click="selectFile(i)">
            <p>{{song.file}}</p>
          </div>
          <div class="btn box shadow" @click="modalIsOpen = true; filename = ''; error = ''">Ny fil</div>
        </div>

        <div class="view">
          <div class="thumbnail">
            <div class="scaler">
              <Sangplatta/>
            </div>
          </div>
        </div>

        <div class="" style="margin-top: 20px;" v-if="songs.length || true">
          <h2>Inställningar</h2>
          <div class="style">
            <h4>Typsnitt:</h4>
            <div class="bgdiv">
              <p>Göm titel </p> <input @click="updateStyle()" v-model="hideTitle" type="checkbox">
              <p>Göm rättigheter </p> <input @click="updateStyle()" v-model="hideRights" type="checkbox">
              <p>Font family </p> <p><input @blur="updateStyle()" v-model="fontFamily"></p>
              <p>Font size </p> <p><input @blur="updateStyle()" v-model="fontSize"><span class="unit">px</span></p>
              <p>Color </p> <p><input @blur="updateStyle()" v-model="color"><span class="unit" :style="{background: color}"></span></p>
            </div>
            <h4>Background:</h4>
            <div class="bgdiv">
              <p>Radial background </p> <input @click="updateStyle()" v-model="radialBackground" type="checkbox">
              <p>Background</p> <p><input @blur="updateStyle()" v-model="bg1" :class="{error: !/^\#([0-9A-Fa-f]{6}$|[0-9A-Fa-f]{3}$)/.test(bg1)}"><span class="unit" :style="{background: bg1, opacity: opacityBg1/100}"></span></p>
              <p v-if="!/^\#([0-9A-Fa-f]{6}$|[0-9A-Fa-f]{3}$)/.test(bg1)" class="error">Obs! Värde måste vara HEX.</p>
              <p>Opacity </p> <p><input @blur="updateStyle()" v-model="opacityBg1"><span class="unit">%</span></p>
              <p v-if="radialBackground">Background 2 </p> <p v-if="radialBackground"><input @blur="updateStyle()" v-model="bg2" :class="{error: !/^\#([0-9A-Fa-f]{6}$|[0-9A-Fa-f]{3}$)/.test(bg2)}"><span class="unit" :style="{background: bg2, opacity: opacityBg2/100}"></span></p>
              <p v-if="!/^\#([0-9A-Fa-f]{6}$|[0-9A-Fa-f]{3}$)/.test(bg2)" class="error">Obs! Värde måste vara HEX.</p>
              <p v-if="radialBackground">Opacity 2 </p> <p v-if="radialBackground"><input @blur="updateStyle()" v-model="opacityBg2"><span class="unit">%</span></p>
            </div>
            <h4>Positionering:</h4>
            <div class="bgdiv">
              <p>Height </p> <p><input @blur="updateStyle()" v-model="height"><span class="unit">px</span></p>
              <p>Left </p> <p><input @blur="updateStyle()" v-model="left"><span class="unit">%</span></p>
              <p>Right </p> <p><input @blur="updateStyle()" v-model="right"><span class="unit">%</span></p>
              <p>Bottom </p> <p><input @blur="updateStyle()" v-model="bottom"><span class="unit">%</span></p>
              <p>Centrera </p> <input @click="updateStyle()" v-model="centrera" type="checkbox">
              <p>Text marginal </p> <p><input @blur="updateStyle()" v-model="paddingLeft"><span class="unit">%</span></p>
              <p>Titel Posotion X </p> <p><input @blur="updateStyle()" v-model="titX"><span class="unit">%</span></p>
              <p>Titel Posotion Y </p> <p><input @blur="updateStyle()" v-model="titY"><span class="unit">%</span></p>
            </div>
          </div>
          <div class="btn box shadow">Uppdatera</div>
        </div>
      </div>
      
      <div class="col col-6">
        <div v-if="!current_song" class="box shadow emptybox" >
          <img src="@/assets/empty.png" style="width: 50%;">
          <h2 style="margin-bottom: 0;">Hoppsan! Här var det tomt!</h2>
          <p style="color: #666;">Lägg till några .txt filer i samma folder som <br>programmet så dyker dom upp här.</p>
          <div class="btn box shadow" @click="modalIsOpen = true; filename = ''; error = ''">Ny fil</div>
        </div>

        <div v-if="current_song" class="box shadow" style="width: 100%; position: relative;">
          <div class="box btn edit" @click="editor()">{{edit ? 'Spara' : 'Redigera'}}</div>
          <div v-if="!edit">
            <h1>{{current_song.f0}}</h1>
            <p><strong>{{current_song.f1}}</strong></p>
            <p class="line" 
              v-for="(line,i) in lines" 
              :key="line+i" 
              :class="{selected: i==selected, next: i==selected+1, active}"
              @click="select(i)"
            >
              {{line}}
            </p>
          </div>

          <div v-if="current_song && edit">
            <input class="title" placeholder="Titel" v-model="current_song.f0">
            <input class="writer" placeholder="Text & musik" v-model="current_song.f1">
            <textarea id="editor" type="text" v-model="current_song.f2" :style="{height: lines.length * 30+30+'px'}"/>
          </div>

        </div>
      </div>

      <div class="col col-3" style="position: relative;">
        <div style="position: fixed;">
          <div class="box shadow btn play" @click="play()" :disabled="edit" :title="edit ? 'Du måste spara innan du kan spela!':''" :class="{hit: active}">Play <code>(F2)</code></div>
          <div class="box shadow btn"      @click="prev()" :disabled="edit" :class="{hit: prev_btn_hit}">Previous <code>(pil upp)</code></div>
          <div class="box shadow btn"      @click="next()" :disabled="edit" :class="{hit: next_btn_hit}">Next <code>(pil ner)</code></div>
          <div class="box shadow btn stop" @click="stop()" :disabled="edit" :class="{hit: !active}">Stop <code>(F1)</code></div>
        </div>
      </div>
    </div>

    <div class="modal" :class="{open: modalIsOpen}">
      <div class="backgropp"></div>
      <div class="modal-content box shadow">
        <div class="close" @click="modalIsOpen = false;">&times;</div>
        <img src="@/assets/new.png" style="width: 25%;">
        <h1>Vad ska den heta?</h1>
        <div class="input" :class="{error}">
          <input v-model="newfilename"/> .txt
        </div>
        <p v-if="error" class="error">{{error}}</p>
        <div class="btn box shadow" @click="newFile(newfilename)">Skapa</div>
      </div>
    </div>
  </div>
</template>

<script>

import Sangplatta from '@/templates/Sangplatta.vue';

//import TableView from '@/components/TableView.vue';

export default {
  name: 'songs',
  components: {
    Sangplatta,
  },
  data () {
    return {
      tick: true,
      edit: false,
      play_btn_hit: false,
      next_btn_hit: false,
      prev_btn_hit: false,
      stop_btn_hit: false,
      selected: 0,
      active: false,
      song_nr: 0, 
      songs: [],
      newfilename: '',
      error: '',
      modalIsOpen: false,

      hideTitle: false,
      hideRights: false,
      fontFamily: 'Josefin Sans', //
      fontSize: 50, //
      color: 'white',
      bg1: '#000', //
      bg2: '#000', //
      opacityBg1: 40, //
      opacityBg2: 15, //
      radialBackground: true, //
      height: 60, 
      left: 0, //
      right: 0, //
      bottom: 5, //
      centrera: false,
      paddingLeft: 15,
      titX: 10,
      titY: 70
    }
  },
  computed: {
    current_song() {
      return this.songs[this.song_nr]
    },
    lines() {
      return this.current_song.f2.split(/\n|\r/)
    },
    style() {
      return {
        hideTitle: this.hideTitle,
        hideRights: this.hideRights,
        fontFamily: this.fontFamily,
        fontSize: this.fontSize,
        color: this.color,
        background: `radial-gradient( 
          rgba(${[...this.hexToRGB(this.bg1), this.opacityBg1/100].join()}), 
          rgba(${
            this.radialBackground ? 
              [...this.hexToRGB(this.bg2), this.opacityBg2/100].join() : 
              [...this.hexToRGB(this.bg1), this.opacityBg1/100].join()}
          )
        )`,
        height: this.height,
        left: this.left +'%',
        right: this.right +'%',
        bottom: this.bottom +'%',
        centrera: this.centrera,
        paddingLeft: this.paddingLeft+'%',
        metaTransform: `translate(${this.titX/100*1920}px,${this.titY/100*1080}px)`
      }
    }
  },
  created () {
    document.onkeydown = event => {
      console.log(event.code)
      // Save
      if(this.edit && (event.metaKey || event.ctrlKey) && event.code == 'KeyS' ) {
        event.preventDefault()
        this.save()
      }
      if(this.edit) return

      // Play
      if(event.code == 'F2') {
        event.preventDefault()
        this.play()
      }

      // Stop
      if(event.code == 'F1') {
        event.preventDefault()
        this.stop()
      }
      
      // Next
      if(event.code == 'F5' || event.code == 'ArrowDown') {
        event.preventDefault()
        this.next()
      }
      
      // Prev
      if(event.code == 'ArrowUp') {
        event.preventDefault()
        this.prev()
      }
    }

    this.$socket.emit('getSongs')
    // setTimeout(()=>{this.tick = true},0)
    // setInterval(()=>{
    //   this.tick = false
    //   setTimeout(()=>{this.tick = true},1500)
    // }, 7000)
  },
  methods: {
    play() {
      this.active = true
      // this.hit('play')
      this.$socket.emit('data', {event: 'sangplatta_update', data: {...this.current_song, selected: this.selected}})
      this.$socket.emit('data', {event: 'sangplatta_play'})
    },
    stop() {
      this.active = false
      // this.hit('stop')
      this.$socket.emit('data', {event: 'sangplatta_stop'})
    },
    next() {
      this.selected ++
      if(!this.lines[this.selected]) this.selected ++
      this.hit('next')
      this.$socket.emit('data', {event: 'sangplatta_update', data: {selected: this.selected}})
    },
    prev() {
      if (this.selected) this.selected --
      if(!this.lines[this.selected]) this.selected --
      this.hit('prev')
      this.$socket.emit('data', {event: 'sangplatta_update', data: {selected: this.selected}})
    },
    hit(event) {
      this[event+'_btn_hit'] = true
      setTimeout(()=>{
        this[event+'_btn_hit'] = false
      },100)
    },
    editor() {
      this.edit = !this.edit
      if (!this.edit) this.save()
    },
    save() {
      this.edit = false
      this.$socket.emit('saveSong', this.current_song)
      this.$socket.emit('data', {event: 'sangplatta_update', data: {...this.current_song, selected: this.selected } })
    },
    select(i) {
      this.selected = i
      this.$socket.emit('data', {event: 'sangplatta_update', data: { selected: this.selected } })
    },
    selectFile(i) {
      this.song_nr = i
      this.$socket.emit('data', {event: 'sangplatta_update', data: {...this.songs[i], selected: this.selected } })
    },
    updateStyle() {
      this.$socket.emit('data', {event: 'sangplatta_update', data: {style: this.style} })
    },
    hexToRGB(h) {

      let r = 0, g = 0, b = 0;

      // 3 digits
      if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

      // 6 digits
      } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
      }
      
      return [+r, +g, +b ];
    },
    newFile(filename) {
      if(!filename) {
        this.error = 'OBS! Du måste ge filen ett namn.'
        return 
      }
      if (this.songs.find(s=>s.file == filename)) {
        this.error = 'OBS! Filnamnet finns redan.'
        return 
      }

      this.songs.push({
        file: filename+'.txt',
        f0: '',
        f1: '',
        f2: ''
      })
      this.edit = true
      this.error = ''
      this.newfilename = ''
      this.modalIsOpen = false
      this.song_nr = this.songs.length - 1
    }
  },
  sockets: {
    songs(songs) {
      this.songs = songs
    },
    song(song) {
      this.songs = this.songs.map((s,i)=>{
        if (s.file == song.file) s = song
        return s
      })
      if (!this.songs.find(s => s.file == song.file)) {
        this.songs.push(song)
      }
    }
  },
}
</script>

<style lang="scss">

@font-face {
  font-family: Josefin Sans;
  src: url(../fonts/JosefinSans/JosefinSans-Regular.ttf);
}
@font-face {
  font-family: Josefin SemiBold;
  src: url(../fonts/JosefinSans/JosefinSans-SemiBold.ttf);
}

$max_width: 1000px;

@mixin bg-opacity($color, $opacity) {
  background: $color;
  background: rgba($color, $opacity);
}

body {
  width: 100vw;
  height: 100vh !important;
  background: #fcfcfc;
}
#app {
  width: 100vw;
  position: relative;
  font-family: Josefin Sans, Helvetica, Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6, button {
  font-family: Josefin SemiBold, Helvetica, Arial, sans-serif;
}

input, textarea {
  font-family: Josefin Sans;
}

.container {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-grow: 1;
}


.songs_control{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    flex-basis: 100%;
    min-height: 100px;
  }
  .col {
    position: relative;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: auto;
  }
  .col-12 {
    max-width: $max_width;
    margin: 0 auto;
  }
  .col-6 {
    flex-basis: 40%;
    min-height: 100vh;
    max-width: $max_width / 2;
    flex-shrink: 1;
  }
  .col-3 {
    flex-basis: 15%;
    min-height: 100vh;
    max-width: $max_width / 4;
    flex-shrink: 0;
  }
}

.emptybox {
  width: 100%; 
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p.line {
  margin: 0;
  padding: 0 5px 0 15px;
  line-height: 30px;
  min-height: 30px;
  text-indent: -10px;
  background: white;
  transition: 200ms;
  cursor: pointer;

  &.selected {
    border-radius: 4px 4px 0px 0px;
    @include bg-opacity(indianred,0.4);
    &.active {
      @include bg-opacity(lightgreen,0.4);
    }
  }
  &.next {
    border-radius: 0px 0px 4px 4px;
    @include bg-opacity(indianred,0.2);
    &.active {
      @include bg-opacity(lightgreen,0.2);
    }
  }
}
.files .file {
  padding: 4px 8px;
  cursor: pointer;
  &:hover,&.current {
    border-left: 2px solid #262626;
    font-weight: bold;
  }
  p {
    margin: 0;
  }
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

.btn {
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

.title {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.writer {
  font-weight: bold;
  line-height: inherit;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
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
    width: $max_width / 2;
    height: 600px;
    border-radius: 10px;

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
      input {
        width: 85%;
      }
      &.error {
        border-color: indianred;
      }
    }
    .btn {
      max-height: 20px;
      width: 33%;
      font-size: 20px;
      // align-self: flex-end;
    }
  }
}

p.error {
  color: indianred;
  font-size: 12px;
}
.style {
  .unit {
    width: 16px;
    height: 16px;
    margin-left: -25px;
    display: inline-block;
    border-radius: 3px;
    vertical-align: text-bottom;
  }
  .bgdiv {
    float: right;
    margin-bottom: 40px;
    width: 90%; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    input[type="checkbox"] {
      flex-basis: 5%;
      flex-shrink: 1;
    }
    p {
      flex-basis: 50%;
      margin: 1px 0;
      flex-grow: 1;
    }
    input { 
      width: 100%; 
      flex-basis: 50%;
    }
    p.error {
      flex-basis: 100%;
      text-align: right;
    }
  }
}
input.error {
  border-color: indianred;
}

.view {
  // padding: 20px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // text-align: center;
  .thumbnail {
    width: 288px;
    height: 162px;
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
      transform: scale(0.15);
      transform-origin: top left;
    }
  }
}

</style>
