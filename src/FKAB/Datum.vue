<template>
  <dir class="datum" :class="{ active }">
    <div class="bricka">
      <div class="text">
        <strong v-html="f0" v-if="f0"></strong>
        <span v-if="f0 && f1">, </span>
        <span v-html="f1" v-if="f1"></span>
      </div>
    </div>
  </dir>
</template>
<script>
const convert = require('xml-js');

export default {
  data() {
    return {
      comp: 'FKABdatum',
      f0: 'Uppsala',
      f1: '13 maj 2019',
      active: false
    }
  },
  methods: {
    play() {
      this.active = true
      console.log('Datum')
    },
    stop() {
      this.active = false
    },
    next() {
      console.log(this)
    },
    update(data) {
      if (typeof data == 'object') {
        if (data.f0) this.f0 = data.f0
        if (data.f1) this.f1 = data.f1
        if (data.f2) this.f2 = data.f2
      } else {
        let parsed = convert.xml2js(data);
        parsed.elements[0].elements.map(d=>{
          if (d.attributes.id == 'f0') this.f0 = d.elements[0].attributes.value
          if (d.attributes.id == 'f1') this.f1 = d.elements[0].attributes.value
          if (d.attributes.id == 'f2') this.f2 = d.elements[0].attributes.value
        })
      }
    }
  },
  created() {
    window.play   = this.play
    window.stop   = this.stop
    window.next   = this.next
    window.update = this.update
  },
  sockets: {
    data: function({event, data}) {
      if (event == this.comp+'_play') this.play()
      if (event == this.comp+'_stop') this.stop()
      if (event == this.comp+'_next') this.next()
      if (event == this.comp+'_update') this.update(data)
    }
  }
}

</script>

<style lang="scss" scoped>

// @font-face {
//   font-family: Gotham Ultra;
//   src: url(../fonts/Gotham/Gotham-Ultra.otf);
// }

@font-face {
  font-family: Lato;
  src: url(../fonts/Lato/Lato-Regular.ttf);
}

.datum {
  color: #262626;
  font-family: Lato;
  font-size: 30px;

  strong {
    // font-family: Lato;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
}

$fadetime: 0ms;
$slidetime: 700ms;

.datum {
  height: 54px;
  width: auto;
  position: absolute;
  bottom: 5%;
  right: 5%;
  overflow: hidden;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; 

  transition: $fadetime $slidetime;
  opacity: 0;

  .bricka {
    height: 54px;
    width: auto;
    background: #fafafa;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    transition: $slidetime cubic-bezier(0.9,0,0.1,1) 0ms;
    transform: translateX(100%);

    .text {
      margin: 24px;
      // height: 30px;
    }
  } 
}

.active {
  transition-delay: 0ms; 
  opacity: 1;
  .bricka {
    transform: translateX(0);
    transition-delay: ($fadetime / 2); 
  }
}

</style>
