<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <p>{{ this.$router.params }}</p> -->
    <button v-on:click="getParam">get Param</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'JX: apple'
    }
  },
  methods: {
    getParam () {
      console.log(this.$router.params);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>