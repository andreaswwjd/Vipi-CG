<template>
  <div class="container">
    <component v-for="comp_name in comp_names" :is="comp_name" :key="comp_name"></component>
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
<style scoped>
body {
  background-image: url(../assets/testscreen.png);
  /* background-color: #0F0; */
}
</style>
