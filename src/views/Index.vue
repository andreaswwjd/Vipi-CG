<template>
  <div class="routes">
    <router-link class="box shadow" to="/control">
      <img src="../assets/img/Control.png" style="width: 80px;">
      <h1 style="margin-top: 0.4em">Control</h1>
    </router-link>
    <router-link class="box shadow" to="/songs">
      <img src="../assets/img/Texts.png" style="width: 80px;">
      <h1 style="margin-top: 0.4em">Texts</h1>
    </router-link>
    <router-link class="box shadow" to="/test">
      <img src="../assets/img/Develop.png" style="width: 80px;">
      <h1 style="margin-top: 0.4em">Develop</h1>
    </router-link>
    <router-link class="box shadow" to="/screen">
      <img src="../assets/img/Screen.png" style="width: 80px;">
      <h1 style="margin-top: 0.4em">Screen</h1>
    </router-link>
    <router-link class="box shadow" to="/green">
      <img src="../assets/img/Green.png" style="width: 80px;">
      <h1 style="margin-top: 0.4em">Green</h1>
    </router-link>
    <!-- <h1><router-link class="box shadow" to="/screen">Screen</router-link></h1> -->
    <!-- <h1><router-link class="box shadow" to="/green">Green</router-link></h1> -->
    <!-- <h1><router-link class="box shadow" to="/songs">Songs</router-link></h1> -->
    <!-- <h1><router-link class="box shadow" to="/test">Test</router-link></h1> -->

    <!-- TODO: Common settings:              -->
    <!--    • PI-ADDRESS of current computer -->
    <!--    • Caspar CG connection?          -->
    <!--    • Caspar CG PI-ADDRESS and PORT  -->
  </div>
</template>
<script>

export default {
  data: ()=>({
    bg: '#0F0'
  }),
  sockets: {
    data({event, data}){
      if(event == 'background'){
        this.bg = data
      }
    }
  }
}
</script>
<style lang="scss" scoped>

@import '../assets/style/global';

.routes{
  background: #fcfcfc;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: rows;
  justify-content: center;
  align-items: center;

}

a {
  color: black;

}

.box {
  box-shadow: 0 2.8px 2.2px rgba(100, 100, 100, 0.034);

  padding: 15px;
  margin: 10px;
  background: white;
  border-radius: 5px;
  min-width: 200px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 500ms;
  background: white;
  cursor: pointer;
  &:hover {
    transition: 200ms;
    background: lightblue;
    box-shadow:
      0 2.8px 2.2px rgba(100, 100, 100, 0.034),
      0 6.7px 5.3px rgba(100, 100, 100, 0.048),
      0 22.3px 17.9px rgba(100, 100, 100, 0.072);
  }
}

.shadow {
  box-shadow:
    0 2.8px 2.2px rgba(100, 100, 100, 0.034),
    0 6.7px 5.3px rgba(100, 100, 100, 0.048),
    0 22.3px 17.9px rgba(100, 100, 100, 0.072);

}

</style>
