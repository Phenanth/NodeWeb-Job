<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>

html {
  height: 100%;
}
a{ 
  text-decoration: none;
}
a,input{ 
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  /*ios android去除自带阴影的样式*/
}
input{
  outline: 0px; 
}
body{
  background:#f1f1f1; 
  margin: 0; 
  overflow-y: hidden;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    margin-top: 10vh;
}

.logo {
    position: relative;
    width: 10%;
    margin-bottom: 40px;
}
.container{
  padding-top: 40px;
  width:100%;
  margin: 0 auto; 
  padding-bottom: 0px; 
  overflow: hidden;
}

/* transition animate */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.slide-leave-active {
  /* transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
}
.slide-enter, .slide-leave-active {
  transform: translateX(10px);
  opacity: 0;
}

</style>
