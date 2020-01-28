(function(t){function e(e){for(var o,s,c=e[0],r=e[1],u=e[2],d=0,p=[];d<c.length;d++)s=c[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&p.push(a[s][0]),a[s]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);l&&l(e);while(p.length)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,c=1;c<n.length;c++){var r=n[c];0!==a[r]&&(o=!1)}o&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var o={},a={control:0},i=[];function s(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(){return Promise.resolve()},s.m=t,s.c=o,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var l=r;i.push([4,"chunk-vendors","chunk-common"]),n()})({"036a":function(t,e,n){"use strict";var o=n("8b75"),a=n.n(o);a.a},"092c":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._l(t.blocks,(function(e){return n("div",{key:e.event,staticClass:"block"},[n("TableView",t._b({},"TableView",e,!1),[n(e.component,{tag:"component",class:{active:t.tick}})],1)],1)})),n("div",{staticClass:"buttons"},[n("div",[n("h4",[t._v("Screen")]),n("div",{staticClass:"btn-group btn-group-block"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.bg,expression:"bg"}],staticClass:"input",domProps:{value:t.bg},on:{input:function(e){e.target.composing||(t.bg=e.target.value)}}}),n("div",{staticStyle:{width:"30px",height:"30px","border-radius":"50%"},style:{background:t.bg}}),n("button",{staticClass:"btn btn-sm",on:{click:function(e){return t.setBg(t.bg)}}},[t._v("Set color")])])]),n("div",[n("h4",[t._v("INTRO")]),n("div",{staticClass:"btn-group btn-group-block"},[n("button",{staticClass:"btn btn-sm",on:{click:function(e){return t.intro()}}},[t._v("Play")])])]),n("div",[n("h4",[t._v("Stop All")]),n("div",{staticClass:"btn-group btn-group-block"},[n("button",{staticClass:"btn btn-sm",on:{click:function(e){return t.stopAll()}}},[t._v("Stop all")])])])])],2)},i=[],s=n("5118"),c=n("128c"),r=n("f509"),u=n("ab29"),l=n("7c5a"),d=n("dcec"),p=n("d4cc"),f=n("6185"),v=n("4b2d"),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("button",{staticClass:"btn btn-sm",on:{click:function(e){return t.addDataRow()}}},[t._v("Ny skylt")]),n("table",{staticClass:"table"},[n("tbody",t._l(t.dataRows,(function(e,o){return n("tr",{key:o,class:{active:e.active}},[!o||o>=3?n("td",{staticStyle:{background:"white"},attrs:{rowspan:o?1:3}},[n("h4",[t._v(t._s(t.title))]),0==o?n("div",{staticClass:"thumbnail"},[n("div",{staticClass:"scaler"},[t._t("default")],2)]):t._e()]):t._e(),n("td",[n("div",{staticClass:"form-group"},[n("label",{staticClass:"form-switch"},[n("input",{attrs:{type:"radio"},domProps:{checked:e.active},on:{input:function(n){e.active=!0,t.dataRows.map((function(t,e){return t.active=o==e})),t.$socket.emit("data",{event:t.event+"_update",data:t.currentRow}),t.$socket.emit("saveSession",t.dbSet)}}}),n("i",{staticClass:"form-icon"})])])]),t._l(t.dataKeys,(function(o){return n("td",{key:o},[n("input",{directives:[{name:"model",rawName:"v-model",value:e[o],expression:"row[key]"}],staticClass:"form-input",attrs:{type:"text",placeholder:t.placeholders[o]},domProps:{value:e[o]},on:{keyup:function(e){return t.$socket.emit("data",{event:t.event+"_update",data:t.currentRow})},blur:function(e){return t.$socket.emit("saveSession",t.dbSet)},input:function(n){n.target.composing||t.$set(e,o,n.target.value)}}})])})),n("td",[e.active?n("button",{staticClass:"btn btn-sm btn-success",on:{click:function(e){return t.$socket.emit("data",{event:t.event+"_play"})}}},[t._v("Play")]):t._e()]),n("td",[e.active?n("button",{staticClass:"btn btn-sm btn-error",on:{click:function(e){return t.$socket.emit("data",{event:t.event+"_stop"})}}},[t._v("Stop")]):t._e()]),n("td",[e.active?n("div",[n("button",{staticClass:"btn btn-sm",on:{click:function(n){return t.inOut(e.out)}}},[t._v("In-Out")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.out,expression:"row.out"}],staticStyle:{width:"2em"},attrs:{type:"number"},domProps:{value:e.out},on:{keyup:function(e){return t.$socket.emit("data",{event:t.event+"_update",data:t.currentRow})},input:function(n){n.target.composing||t.$set(e,"out",n.target.value)}}}),t._v(" s\n          ")]):t._e()]),n("td",[n("i",{staticClass:"icon icon-cross",on:{click:function(e){return t.dataRows.splice(o,1)}}})])],2)})),0)])])},b=[],h=(n("8e6e"),n("ac6a"),n("456d"),n("7514"),n("bd86"));function y(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?y(Object(n),!0).forEach((function(e){Object(h["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var w={name:"tableview",props:["event","placeholders","title"],data:function(){return{dataRows:[],current:-1}},created:function(){this.addDataRow()},methods:{addDataRow:function(){this.dataRows.push(k({},this.emptyDataObject,{active:!1,out:6}))},inOut:function(t){var e=this;this.$socket.emit("data",{event:this.event+"_play"}),Object(s["setTimeout"])((function(){e.$socket.emit("data",{event:e.event+"_stop"})}),1e3*t)}},computed:{currentRow:function(){var t=this.dataRows.find((function(t){return t.active}));return t||this.emptyDataObject},dataKeys:function(){return Object.keys(this.placeholders)},emptyDataObject:function(){var t={};return this.dataKeys.map((function(e){t[e]=""})),t},dbSet:function(){return{key:this.event,value:this.dataRows}}},sockets:{lastSession:function(t){t[this.event]&&(this.dataRows=t[this.event],this.$socket.emit("data",{event:this.event+"_update",data:this.currentRow}))}}},g=w,_=(n("8565"),n("2877")),O=Object(_["a"])(g,m,b,!1,null,"07ebf295",null),j=O.exports,T={name:"remote",components:{Datum:c["default"],LivsvagTitle:r["default"],LowerThird:u["default"],Namnskylt:l["default"],Notis:d["default"],Swish:p["default"],Tema:f["default"],Title:v["default"],TableView:j},data:function(){return{tick:!0,bg:"transparent",db:{title:[],tema:[],datum:[],namnskylt:[],lowerthird:[],titlesmall:[]},blocks:[{placeholders:{f0:"Rubrik",f1:"Talare",f2:"etc.",f3:"Tema"},event:"lowerthird",title:"Titel (Lower third)",component:"LowerThird"},{placeholders:{f0:"Namn",f1:"Titel"},event:"namnskylt",title:"Namnskylt",component:"Namnskylt"},{placeholders:{f0:"Rubrik",f1:"Tema",f2:"etc."},event:"title",title:"Titel (fullskärm)",component:"Title"},{placeholders:{f0:"Plats",f1:"Tidpunkt"},event:"datum",title:"Datum",component:"Datum"},{placeholders:{f0:"Tema/Sammanhang"},event:"tema",title:"Tema",component:"Tema"},{placeholders:{f0:"i",f1:"Typ (fet stil)",f2:"Notis"},event:"notis",title:"Notis",component:"Notis"},{placeholders:{f0:"Swish",f1:"Bg",f2:"Hemsida"},event:"swish",title:"Swish",component:"Swish"},{placeholders:{f0:"Rubrik",f1:"Tema",f2:"etc."},event:"livsvag_title",title:"Titel (Livsväg)",component:"LivsvagTitle"}],compositions:[[{component:"title",play:0,stop:3},{component:"namnskylt",play:3,stop:0}]]}},created:function(){var t=this;Object(s["setTimeout"])((function(){t.tick=!0}),0),Object(s["setInterval"])((function(){t.tick=!1,Object(s["setTimeout"])((function(){t.tick=!0}),1500)}),7e3),this.$socket.emit("ready")},methods:{intro:function(){var t=this;this.$socket.emit("data",{event:"lowerthird_play"}),Object(s["setTimeout"])((function(){t.$socket.emit("data",{event:"lowerthird_stop"})}),5e3),Object(s["setTimeout"])((function(){t.$socket.emit("data",{event:"datum_play"}),t.$socket.emit("data",{event:"tema_play"})}),6e3),Object(s["setTimeout"])((function(){t.$socket.emit("data",{event:"datum_stop"})}),1e4)},setBg:function(){this.$socket.emit("data",{event:"background",data:this.bg})},playKeyframes:function(t){var e=this;t.map((function(t){Object(s["setTimeout"])((function(){e.$socket.emit("data",{event:t.component+"_play"})}),1e3*t.play),t.stop&&Object(s["setTimeout"])((function(){e.$socket.emit("data",{event:t.component+"_stop"})}),1e3*t.stop)}))},stopAll:function(){var t=this;this.blocks.map((function(e){t.$socket.emit("data",{event:e.event+"_stop"})}))}},sockets:{}},S=T,$=(n("036a"),n("0b58"),n("be2d"),n("d3f3"),Object(_["a"])(S,a,i,!1,null,null,null)),P=$.exports,C=n("5132"),R=n.n(C);console.log("Origin:",window.location.origin),o["a"].config.productionTip=!1,o["a"].use(new R.a({debug:!0,connection:window.location.origin})),new o["a"]({render:function(t){return t(P)}}).$mount("#app")},"0b58":function(t,e,n){"use strict";var o=n("129d"),a=n.n(o);a.a},"129d":function(t,e,n){},"27ca":function(t,e,n){},3671:function(t,e,n){},4:function(t,e,n){t.exports=n("092c")},8565:function(t,e,n){"use strict";var o=n("3671"),a=n.n(o);a.a},"8b75":function(t,e,n){},be2d:function(t,e,n){"use strict";var o=n("27ca"),a=n.n(o);a.a},d3f3:function(t,e,n){"use strict";var o=n("ebf3"),a=n.n(o);a.a},ebf3:function(t,e,n){}});
//# sourceMappingURL=control.c427f459.js.map