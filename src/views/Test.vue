<template>
  <div class="container columns wrap row">
    <div class="column col-7 columns list" style="position: relative; min-width: 700px; flex-basis: 700px;">
      <div class="thumbnail" style="height: 360px; width: 640px; position: fixed; margin: 0em;">
        <div class="scaler" style="transform: scale(0.33)">
          <component v-for="comp_name in comp_names" :is="comp_name" :key="comp_name"></component>
        </div>
      </div>
    </div>

    <div class="column columns" style="min-width: 300px; flex-basis: 300px;">
      <div class="column col-6 list">
        <div v-for="comp_name in comp_names" :key="'_'+comp_name">
          <h2 class="title">{{ comp_name }}</h2>
          <button class="play big-btn box shadow" @click="$socket.emit('data', {event: comp_name+'_play'})">Play</button>
          <button class="stop big-btn box shadow" @click="$socket.emit('data', {event: comp_name+'_stop'})">Stop</button>
        </div>  
      </div>
    </div>
<!-- 
    <div class="column columns" style="min-width: 300px; flex-basis: 300px;">
      <div class="column col-6 list">
        <div v-for="event in [
'session_create',
'session_list',
'session_save',
'session_load',
'session_rename',
'session_delete',
'session_change']" :key="'_'+event">
          <button class="play big-btn box shadow" @click="$socket.emit(event)">{{ event }}</button>
        </div>  
      </div>
    </div>

    <div class="column columns" style="min-width: 300px; flex-basis: 300px;">
      <div class="column col-6 list">
        <div v-for="event in [
'library_create',
'library_list',
'library_save',
'library_load',
'library_rename',
'library_delete',
'library_change']" :key="'_'+event">
          <button class="play big-btn box shadow" @click="$socket.emit(event)">{{ event }}</button>
        </div>  
      </div>
    </div> -->

  </div>
</template>
<script>
import components from './_components';

export default {
  components,
  data: ()=>({
    comp_names: Object.keys(components),
  })
}
</script>
<style lang="scss">

@import "../assets/style/global";


</style>
