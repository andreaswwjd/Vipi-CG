<template>
  <div style="position: initial; height: 100%; width: 100%; overflow: hidden;">
    <div class="meta" :style="{transform: style.metaTransform || 'translate(192px, 756px)'}">
      <div class="titel" v-html="f0" v-if="f0 && !style.hideTitle" :style="{
        opacity: hide, 
        fontSize: style.fontSize*0.7+'px' || '35px', 
        fontFamily: style.fontFamily ? style.fontFamily + ', Josefin SemiBold' : 'Josefin SemiBold',
        color: style.color || 'white'
      }"></div>
      <div class="av" v-html="f1" v-if="f1 && !style.hideRights" :style="{
        opacity: hide, 
        fontSize: style.fontSize*0.7+'px' || '35px',
        fontFamily: style.fontFamily ? style.fontFamily + ', Josefin Sans' : 'Josefin Sans',
        color: style.color || 'white'
      }"></div>
    </div>
    <div class="sangplatta" :class="{ active }" :style="{
      fontFamily: style.fontFamily ? style.fontFamily + ', Josefin Sans' : 'Josefin Sans',
      fontSize: style.fontSize ? style.fontSize+'px' : '50px',
      color: style.color || 'white',
      background: style.background || 'radial-gradient(rgba(0,0,0,0.40), rgba(0,0,0,0.15))', 
      bottom: style.bottom || '5%',
      left: style.left || '0%',
      right: style.right || '0%',
      height: style.height ? (15+15+style.height*2)+'px' : '150px' 
    }">
      <div class="bricka" :style="{ 
        transform: 'translateY('+(count*-(style.height||60))+'px)',
        height: style.height ? (15+15+style.height*2)+'px' : '150px',
        paddingLeft: style.centrera ? false : style.paddingLeft
      }">
        <div class="line" v-for="(line,i) in lines" :key="i" v-html="line" :style="{
          opacity: (count == i || count+1 == i)*1, 
          height: style.height ? style.height+'px' : '60px',
          justifyContent: style.centrera ? 'center' : 'flex-start'  
        }"></div>
      </div>
    </div>
  </div>
</template>
<script>
const convert = require('xml-js');

export default {
  data() {
    return {
      comp: 'sangplatta',
      count: 0,
      hide: 1,
      f0: '', // Titel
      f1: '', // Sångtext
      f2: '', // Text & Musik
      // f0: `Stockholm i mitt hjärta`, // Titel
      // f1: `Stockholm i mitt hjärta
      // låt mig besjunga dig nu
      // åldrad i ungdomlig grönska
      // öarnas stad, det är du!
      // Av städer jag känner i världen
      // är du den stad som fått allt.
      // Genom Mälarens kärlek till havet
      // en blandning av sött och salt.

      // Solljuset stiger ur havet
      // spelar i koppar och glas
      // Stockholm i gryningen strålar
      // som var hon en gyllene vas
      // med blommor från Östersjöns länder
      // med ängsört från ekarnas sal
      // en skönhet på urbergets stränder
      // Mälarens ljuva vestal.

      // Stockholm i mitt hjärta
      // låt mig besjunga dig nu
      // åldrad i ungdomlig grönska
      // öarnas stad, det är du!
      // Av städer jag känner i världen
      // är du den stad som fått allt.
      // Genom Mälarens kärlek till havet
      // en blandning av sött och salt.

      // Solljuset dansar på fjärden
      // det glittrar för stort och för smått
      // för träkåken uppe på Söder
      // men även för Konungens slott.
      // Det porlar i fiskrika strömmar
      // det valsar i Mälarens famn
      // det skymmer och skänker oss drömmar
      // sjungandes sjöstadens namn.

      // Stockholm i mitt hjärta
      // låt mig besjunga dig nu
      // åldrad i ungdomlig grönska
      // öarnas stad, det är du!
      // Av städer jag känner i världen
      // är du den stad som fått allt.
      // Genom Mälarens kärlek till havet
      // en blandning av sött och salt.

      // Skymningen kom i en smekning
      // av kvällsbrisens skälvande hand.
      // Nu rodnar solen i fönstren
      // på Söder och Norr Mälarstrand.
      // Säj, hör du musiken och skratten
      // från Djurgården och Gröna Lund
      // en lovsång till Stockholm i natten
      // från skärgårdens vikar och sund.

      // Stockholm i mitt hjärta
      // låt mig besjunga dig nu
      // åldrad i ungdomlig grönska
      // öarnas stad, det är du!
      // Av städer jag känner i världen
      // är du den stad som fått allt.
      // Genom Mälarens kärlek till havet
      // en blandning av sött och salt.`, // Text
      // f2: 'Text & musik: Lars Berghagen', // Text & musik
      active: false,
      // d: ''
      style: {}
    }
  },
  computed: {
    lines(){
      return this.f2.split(/\n|\r|\/\//)
    }
  },
  methods: {
    play() {
      // this.count = 0
      this.active = true
      console.log('Play: sangplatta')

      this.hide = 1
      setTimeout(()=>{
        this.hide = 0
      },4000)
      console.log('setTimeout: sangplatta')
    },
    stop() {
      this.active = false
    },
    next() {
      this.count +=1
      if (!this.lines[this.count]) this.count +=1
      if (!this.lines[this.count]) this.count +=1
    },
    update(data) {
      console.log('1:', typeof data)
      if (typeof data == 'string'){
        console.log('2:', data.charAt(0))
        if (data.charAt(0) == '<') {
          let parsed = convert.xml2js(data);
          parsed.elements[0].elements.map(d=>{
            if (d.attributes.id == 'f0') this.f0 = d.elements[0].attributes.value
            if (d.attributes.id == 'f1') this.f1 = d.elements[0].attributes.value
            if (d.attributes.id == 'f2') this.f2 = d.elements[0].attributes.value
          })
          console.log('2a:', this.f2)
          return 
        }
        if (data.charAt(0) == '{') {
          console.log('2b before:', data)
          data = JSON.parse(data)
          console.log('2b after:', data)
        }
      }

      if (typeof data == 'object') {
        console.log('3:', data)
        if (data.f0) this.f0 = data.f0
        if (data.f1) this.f1 = data.f1
        if (data.f2) this.f2 = data.f2
        if (data.style) this.style = data.style
        if (data.selected != undefined) this.count = data.selected
      } 
      console.log('4:', this.f2)

      /*
      <templateData>
        <componentData id="f0">
          <data id="text" value="Bla bla bla"/>
        </componentData>
        <componentData id="f1">
          <data id="text" value="Bla bla bla"/>
        </componentData>
        <componentData id="f2">
          <data id="text" value="Bla bla bla"/>
        </componentData>
      </templateData>


      <templateData><componentData id="f0"><data id="text" value="Bla bla bla"/></componentData><componentData id="f1"><data id="text" value="Bla bla bla"/></componentData><componentData id="f2"><data id="text" value="Bla bla bla"/></componentData></templateData>
      */
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
//   font-family: Campton Semibold;
//   src: url(../fonts/Campton/Rene.Bieder_Campton.SemiBold.otf);
// }
// @font-face {
//   font-family: Campton Book;
//   src: url(../fonts/Campton/Rene.Bieder_Campton.Book.otf);
// }
@font-face {
  font-family: Josefin Sans;
  src: url(../fonts/JosefinSans/JosefinSans-Regular.ttf);
}
@font-face {
  font-family: Josefin SemiBold;
  src: url(../fonts/JosefinSans/JosefinSans-BoldItalic.ttf);
}

$fadetime: 1s;
$slidetime: 700ms;

.titel {
  color: white;
  font-family: Josefin SemiBold;
  font-weight: bold;
  font-size: 35px;
  font-style: italic;
  transform: translateY(25px);
  position: absolute;
  // right: 5%;
  text-transform: uppercase;
  transition: opacity $fadetime;
}


.av {
  color: white;
  font-family: Josefin Sans;
  font-size: 35px;
  position: absolute;
  transform: translateY(70px);
  // right: 5%;
  transition: opacity $fadetime;
}
.sangplatta {
  color: white;
  font-family: Josefin Sans;
  font-size: 50px;

}

.sangplatta {
  height: 150px; // 60+60+15+15 style.height||60
  // background: radial-gradient(black, rgba(0,0,0,0.15));
  background-size: 2920px 1020px;
  background-position: center top;

  overflow: hidden;

  width: auto;
  position: absolute;
  // bottom: 5%;
  // left: 0;
  // right: 0;
  margin: 0;
  padding: 0;

  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-direction: row; 

  transition: $fadetime $slidetime;
  opacity: 0;

  .bricka {
    height: 150px; // 60+60+15+15 style.height||60
    width: auto;

    // display: flex;
    // align-items: flex-start;
    // justify-content: center;
    // flex-direction: column;


    transition: $slidetime;
    // transition: $slidetime cubic-bezier(0.9,0,0.1,1) 0ms;
    transform: translateY(100%);

    padding: 15px 15%; // 60+60+15+15 style.height||60
    // font-size: 50px;

    .line {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 60px; // style.height||60
      opacity: 0;
      transition: ($fadetime / 2);
    }
  } 
}

.active {
  transition-delay: 0ms; 
  opacity: 1;
  .bricka {
    transform: translateY(0);
    // transition-delay: ($fadetime / 2); 
  }
}

</style>
