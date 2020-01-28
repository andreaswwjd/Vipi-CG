<template>
  <div>
    <button class="btn btn-sm" @click="addDataRow()">Ny skylt</button>
    <table class="table">
      <tbody>
        <tr :class="{active: row.active}" v-for="(row,i) in dataRows" :key="i">
          <td :rowspan="!i?3:1" v-if="!i||i>=3" style="background: white;">
            <h4>{{ title }}</h4>
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
              </label>
            </div>
          </td>
          <td v-for="key in dataKeys" :key="key">
            <input class="form-input" type="text" :placeholder="placeholders[key]" v-model="row[key]" @keyup="
              $socket.emit('data', {event: event+'_update', data: currentRow})"
              @blur="$socket.emit('saveSession', dbSet);"
            >
          </td>
          <td>
            <button v-if="row.active" 
              class="btn btn-sm btn-success" 
              @click="$socket.emit('data', {event: event+'_play'})"
            >Play</button>
          </td>
          <td>
            <button v-if="row.active" 
              class="btn btn-sm btn-error" 
              @click="$socket.emit('data', {event: event+'_stop'})"
            >Stop</button>
          </td>
          <td>
            <div v-if="row.active">
              <button class="btn btn-sm" @click="inOut(row.out)">In-Out</button>
              <input v-model="row.out" type="number" style="width: 2em;" @keyup="
                $socket.emit('data', {event: event+'_update', data: currentRow})"
              > s
            </div>
          </td>
          <td><i class="icon icon-cross" @click="dataRows.splice(i,1)"></i></td>
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

<style scoped>
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
