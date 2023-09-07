<template>
  <div class="app">
    <h1 @click="handlePushToFrontPage"><img src="./assets/favicon.svg" alt=""> FoloToy Web Tool</h1>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const handlePushToFrontPage = () => {
  router.push('/')
}
</script>

<style>
#app,
.app {
  width: 100%;
  height: 100%;
}

h1 {
  background-color: #000;
  margin: 0;
  padding: 0;
  color: #fff;
  line-height: 50px;
  padding-left: 16px;
  cursor: pointer;
}

h1 img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
</style>
