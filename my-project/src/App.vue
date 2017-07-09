<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <router-view></router-view>
    <router-link :to="{path:'/apple'}">to apple</router-link>
    <router-link :to="{path:'/banana'}">to banana</router-link>
    <router-link :to="{path:'/apple/red'}">to red</router-link>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
