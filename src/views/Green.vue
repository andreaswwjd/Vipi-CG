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
    
    <FKABDatum/>
    <FKABNamnskylt/>
    <FKABNotis/>
    <FKABTitle/>
  </div>
</template>
<script>
import Datum from '@/EFS/Datum.vue';
import LivsvagTitle from '@/EFS/LivsvagTitle.vue';
import LowerThird from '@/EFS/LowerThird.vue';
import Namnskylt from '@/EFS/Namnskylt.vue';
import Notis from '@/EFS/Notis.vue';
import Swish from '@/EFS/Swish.vue';
import Tema from '@/EFS/Tema.vue';
import Title from '@/EFS/Title.vue';
import Bibelord from '@/EFS/Bibelord.vue';
import Sangplatta from '@/EFS/Sangplatta.vue';

import FKABDatum from '@/FKAB/Datum.vue';
import FKABNamnskylt from '@/FKAB/Namnskylt.vue';
import FKABNotis from '@/FKAB/Notis.vue';
import FKABTitle from '@/FKAB/Title.vue';

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
    FKABDatum,
    FKABNamnskylt,
    FKABNotis,
    FKABTitle,
  },
  data: ()=>({
    bg: ''
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
  /* background-image: url(../assets/testscreen.png); */
  background-color: #0F0;
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
