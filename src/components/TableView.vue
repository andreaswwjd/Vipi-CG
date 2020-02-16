<template>
  <div>
    <table class="table">
      <thead>
        <h2>{{ title }}</h2>
      </thead>
      <tbody>
        <tr :class="{active: row.active}" v-for="(row,i) in dataRows" :key="i">
          <td :rowspan="!i?2:1" v-if="!i||i>=2" style="background: white; width: 200px;border: none">
            <div class="thumbnail" v-if="i==0">
              <div class="scaler">
                <slot/>
              </div>
            </div>
          </td>
          <td>
            <div class="form-group">
              <label class="form-switch">
                <input type="radio" @input="
                  row.active = true; dataRows.map((l,j)=>l.active = i==j); 
                  $socket.emit('data', {event: event+'_update', data: currentRow}); 
                  $socket.emit('saveSession', dbSet);" 
                  :checked="row.active"
                >
                <i class="form-icon"></i>
                <small>{{row.active ? 'Active' : 'Inactive'}}</small>
              </label> 
            </div>
          </td>
          <td v-for="key in dataKeys" :key="key">
            <input class="form-input" type="text" :placeholder="placeholders[key]" v-model="row[key]" @keyup="
              $socket.emit('data', {event: event+'_update', data: currentRow})"
              @blur="$socket.emit('saveSession', dbSet);"
            >
          </td>
          <td><i class="icon icon-cross" @click="dataRows.splice(i,1)"></i></td>
        </tr>
        <tr>
          <td v-if="dataRows.length >= 2" style="border: none"></td>
          <td>
            <button class="btn" @click="addDataRow()" style="">New</button>
          </td>
          <td colspan="4">
            <div class="action-btns">
              <button class="btn big-btn btn-success" @click="$socket.emit('data', {event: event+'_play'})">
                Play
              </button>
              <button class="btn big-btn btn-error" @click="$socket.emit('data', {event: event+'_stop'})">
                Stop
              </button>
              <button class="btn big-btn" @click="inOut(out)">
                In-Out
              </button>
              <input class="input-small" v-model="out" type="number">
              <span>s</span>
              <div class="spacer"></div>
              <div class="input-group" style="width: 100px;">
                <small class="input-group-addon">Layer</small>
                <input type="text" class="form-input input-small" v-model="layer">
              </div>
              <div class="input-group" style="width: 90px;">
                <small class="input-group-addon">Channel</small>
                <input type="text" class="form-input input-small" v-model="channel">
              </div>
            </div>
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { setTimeout } from 'timers';

export default {
  name: 'tableview',
  props: ['event', 'placeholders', 'title', 'channel', 'layer'],
  data () {
    return {
      dataRows: [],
      current: -1,
      out: 6
    }
  },
  created(){
    this.addDataRow()
  },
  methods: {
    addDataRow () {
      this.dataRows.push({...this.emptyDataObject, active: false, out: 6 })
    },
    inOut (out) {
      this.$socket.emit('data', {event: this.event+'_play'})
      setTimeout(()=>{
        this.$socket.emit('data', {event: this.event+'_stop'})
      }, out*1000)
    }
  },
  computed: {
    currentRow () {
      let activeRow = this.dataRows.find(r=>r.active) 
      return activeRow ? activeRow : this.emptyDataObject
    },
    dataKeys () {
      return Object.keys(this.placeholders)
    },
    emptyDataObject () {
      let dataObject = {}
      this.dataKeys.map(key=>{
        dataObject[key] = ''
      })
      return dataObject
    },
    dbSet () {
      return {key: this.event , value: this.dataRows}
    }
  },
  sockets: {
    lastSession: function(db){
      if(db[this.event]) {
        this.dataRows = db[this.event]
        this.$socket.emit('data', {event: this.event+'_update', data: this.currentRow});
      }
    }
  }
}
</script>
<!--style lang="scss" src="../assets/spectre/spectre.scss" scoped></style>
<style lang="scss" src="../assets/spectre/spectre-exp.scss" scoped></style>
<style lang="scss" src="../assets/spectre/spectre-icons.scss" scoped></style-->

<style lang="scss" scoped>

@import "../assets/spectre/_variables";
@import "../assets/spectre/_mixins";
@import "../assets/spectre/_buttons";
@import "../assets/spectre/_forms";
@import "../assets/spectre/_tables";

$max_width: 1000px;

@mixin bg-opacity($color, $opacity) {
  background: $color;
  background: rgba($color, $opacity);
}
// @import "../assets/spectre/_typography";

@font-face {
  font-family: Josefin Sans;
  src: url(../fonts/JosefinSans/JosefinSans-Regular.ttf);
}
@font-face {
  font-family: Josefin SemiBold;
  src: url(../fonts/JosefinSans/JosefinSans-SemiBold.ttf);
}

h1, h2, h3, h4, h5, h6, button {
  font-family: Josefin SemiBold, Helvetica, Arial, sans-serif;
}

p, input, textarea, label, small {
  font-family: Josefin Sans;
}

small {
  font-size: 0.7em;
  // text-transform: uppercase;
}

input, textarea {
  width: 100%;
  min-width: 120px;
  box-sizing: border-box;
  border: none;
  border-radius: 7px;
  line-height: 30px;
  font-size: 1em;
  padding: 0 5px 0 5px;
  border: lightgray solid 1px;
}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}

.input-small {
  width: 2em; 
  min-width: 2em;
  max-width: 3em;
}


.big-btn {
  margin: 10px;
  min-width: 50px;
  max-height: 40px;
  min-height: 40px;
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

  &:disabled, &[disabled] {
    opacity: 0.5;
    background: white !important;
    color: gray !important;
    box-shadow: 0 2.8px 2.2px rgba(100, 100, 100, 0.034);
    cursor: not-allowed;
  }
  
}

.action-btns {
  padding: 1em 0;
  // width: 192px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  button, input {
    flex-basis: 70px;
    margin: 0 10px 0 0;
    width: auto;
    // flex-grow: 1;
    text-align: center;
  }
  input {
    flex-basis: 35px;
  }
  span {
    flex-basis: 35px;
  }
  .spacer {
    flex-grow: 1;
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

  .scaler {
    width: 1920px;
    height: 1080px;
    transform: scale(0.1);
    transform-origin: top left;
  }
}
</style>
