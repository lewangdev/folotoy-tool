<template>
  <div class="app">
    <div class="header">
      <h1 @click="handlePushToFrontPage"><img src="./assets/title.svg" alt=""> FoloToy Web Tool</h1>
      <a-select @change="handleChangeLang" :value="lang" style="margin-top: 6px;margin-right: 8px;width: 100px"
        :options="langSelection"></a-select>
      <!-- <img style="width: 40px;margin-right: 20px;cursor: pointer;;" @click="darkMode = !darkMode" :src="darkMode ? require('./assets/sun.svg') : require('./assets/moon.svg')" alt=""> -->
    </div>
    <router-view></router-view>
    <footer>
      <img style="width: 25px;position: relative;top: 7px;" src="./assets/rebuild.svg" alt=""> Created by<a-button @click="handlePushToFolotoy" style="padding: 0 4px" type="link" ghost>FoloToy.com</a-button>@ 2023
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Select as ASelect, Button as AButton } from 'ant-design-vue';
import {ref} from 'vue'
const router = useRouter()
const lang = ref(localStorage.getItem('preferLang') ? localStorage.getItem('preferLang')  : window.navigator.language)
const handlePushToFrontPage = () => {
  router.push('/')
}
const handlePushToFolotoy = () => {
  window.open('https://folotoy.com', '_blank')
}
const handleChangeLang = (e) => {
  localStorage.setItem('preferLang', e)
  lang.value = e
  location.reload()
}
const langSelection = [
    {
        value: 'zh-CN',
        label: '简体中文',
    },
    {
        value: 'zh-TW',
        label: '繁體中文',
    },
    {
        value: 'en-US',
        label: 'English',
    },
]
// const darkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
</script>

<style>
#app, .app {
  width: 100%;
  height: 100%;
}
footer {
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
}
.dark {
  background-color: #181a1b;
}

.dark .ant-steps-item-wait .ant-steps-item-title,
.dark .ant-steps-item-wait .ant-steps-icon {
  color: #c9c5c5 !important
}

.dark .ant-steps-item-process .ant-steps-item-title,
.dark .ant-steps-item-process .ant-steps-icon {
  color: #fff !important
}

.dark .content {
  background-color: #222426;
}

.dark .ant-btn-default {
  background-color: #aeaeae;
}

.dark .ant-form-item-required {
  color: #fff !important
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

.dark .ant-upload-list-item-name,
.dark .ant-upload-text-icon,
.dark .anticon-delete {
  color: #fff !important
}

.dark .ant-result-title {
  color: #fff
}

.dark .ant-modal-content {
  background-color: #181a1b !important
}

.dark .ant-modal-title,
.dark .ant-modal-confirm-title,
.dark .ant-modal-confirm-content {
  color: #fff !important;
  background-color: #181a1b !important;
}

.dark .ant-progress-text {
  color: #fff !important
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
  padding-left: 16px;
  cursor: pointer;
}

h1 img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}</style>
