<template>
  <div>
    <table class="table">
      <thead>
        <h2>{{ title }}</h2>
      </thead>
      <tbody>
        <tr :class="{active: row.active}" v-for="(row,i) in dataRows" :key="i">
          <td :rowspan="!i?3:1" v-if="!i||i>=3" style="background: white; width: 200px;border: none">
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
          <td class="action-btns">
            <div v-if="row.active" >
              <button 
                class="btn btn-success" 
                @click="$socket.emit('data', {event: event+'_play'})"
              >Play</button>
              <button v-if="row.active" 
                class="btn btn-error" 
                @click="$socket.emit('data', {event: event+'_stop'})"
              >Stop</button>
              <button class="btn" @click="inOut(row.out)">In-Out</button>
              <input v-model="row.out" type="number" style="width: 2em;" @keyup="
                $socket.emit('data', {event: event+'_update', data: currentRow})"
              > s
            </div>
          </td>
          <td><i class="icon icon-cross" @click="dataRows.splice(i,1)"></i></td>
        </tr>
        <tr>
          <td v-if="dataRows.length > 2" style="border: none"></td>
          <td colspan="8">
            <button class="btn" @click="addDataRow()" style="">New</button>
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
  props: ['event', 'placeholders', 'title'],
  data () {
    return {
      dataRows: [],
      current: -1
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

// .btn {
//   font-size: 0.8rem;
//   height: 1.4rem;
//   padding: 0.1rem 0.5rem;
// }

.action-btns {
  width: 250px;
  button, input {
    margin: 0 5px;
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
