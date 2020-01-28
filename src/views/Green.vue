<template>
  <div class="container" :style="{background: bg}">
    <Datum/>
    <LivsvagTitle/>
    <LowerThird/>
    <Namnskylt/>
    <Notis/>
    <Swish/>
    <Tema/>
    <Title/>
    <Bibelord/>
    <Sangplatta/>
  </div>
</template>
<script>
import Datum from '@/templates/Datum.vue';
import LivsvagTitle from '@/templates/LivsvagTitle.vue';
import LowerThird from '@/templates/LowerThird.vue';
import Namnskylt from '@/templates/Namnskylt.vue';
import Notis from '@/templates/Notis.vue';
import Swish from '@/templates/Swish.vue';
import Tema from '@/templates/Tema.vue';
import Title from '@/templates/Title.vue';
import Bibelord from '@/templates/Bibelord.vue';
import Sangplatta from '@/templates/Sangplatta.vue';

export default {
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
    Sangplatta,
  },
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
<style>
body {
  color: #262626;
  position: relative;
  margin: 0;
  width: 100vw;
  height: 56.25vw;
  max-width: 100vw;
  max-height: 100vh;
  /* background-image: url(./assets/testscreen.png); */
  /* background-color: #0F0; */
  background-repeat: no-repeat;
  background-size: cover; 
}
#app {
  font-family: Campton Book, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  position: absolute;
  bottom: 0; 
  top: 0; 
  left: 0; 
  right: 0; 
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0; 
  top: 0; 
  left: 0; 
  right: 0; 
}

.actionsafe {
  top: 5%;
  left: 5%;
  bottom: 5%;
  right: 5%;
}
</style>
