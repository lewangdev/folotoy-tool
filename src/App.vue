<template>
  <div :class="darkMode ? 'app dark' : 'app'">
    <div class="header"> 
      <h1 @click="handlePushToFrontPage"><img src="./assets/title.svg" alt=""> FoloToy Web Tool</h1>
      <img style="width: 40px;margin-right: 20px;cursor: pointer;;" @click="darkMode = !darkMode" :src="darkMode ? require('./assets/sun.svg') : require('./assets/moon.svg')" alt="">
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
const router = useRouter()
const handlePushToFrontPage = () => {
  router.push('/')
}
const darkMode = ref(true)
</script>

<style>
#app,
.app {
  width: 100%;
  height: 100%;
}
.dark {
  background-color: #181a1b;
}
.dark .ant-steps-item-wait .ant-steps-item-title, .dark .ant-steps-item-wait .ant-steps-icon {
  color: #c9c5c5 !important
}
.dark .ant-steps-item-process .ant-steps-item-title, .dark .ant-steps-item-process .ant-steps-icon {
  color: #fff !important
}
.dark .content {
  background-color: #222426;
}
.dark .ant-btn-default {
  background-color: #aeaeae;
}
.dark .ant-form-item-required {
  color:#fff !important
}
.dark .ant-select-selector {
  background-color: #181a1b !important
}
.dark .ant-select-selection-item {
  color: #fff !important
}
.dark .ant-input {
  background-color: #181a1b !important;
  color: #fff !important
}
.dark .ant-upload-list-item-name, .dark .ant-upload-text-icon, .dark .anticon-delete {
  color: #fff !important
}
.dark .ant-result-title {
  color: #fff
}
.dark .ant-modal-content {
  background-color: #181a1b !important
}
.dark .ant-modal-title, .dark .ant-modal-confirm-title, .dark .ant-modal-confirm-content {
  color: #fff  !important;
  background-color: #181a1b !important;
}
.dark .ant-progress-text {
  color: #fff  !important
}
.dark .ant-progress-inner {
  background-color: #fff !important;
}
.header {
  background-color: #000;
  display: flex;
  justify-content: space-between;
}
h1 {
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
