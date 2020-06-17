<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
html {
  overflow: hidden;
}
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
  overflow: hidden;
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
