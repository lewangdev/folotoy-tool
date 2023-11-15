<template>
    <div :class="isMobile ? 'wrap mobile' : 'wrap'">
        <div v-if="!isMobile" @click="handlePush('program')">
            <img src="../assets/programming.svg" alt="">
            <h2>{{ t('index.program') }}</h2>
        </div>
        <div  v-if="!isMobile" @click="handlePush('console')">
            <img src="../assets/console.svg" alt="">
            <h2>{{ t('index.console') }}</h2>
        </div>
        <div  @click="handlePush('dialogue')">
            <img src="../assets/mqtt.svg" alt="">
            <h2>{{ t('index.mqtt') }}</h2>
        </div>
        <a-modal :getContainer="getContainer" v-model:open="showTerm" style="width: 80%;" :title="t('index.console')"
            @ok="handleOk" @cancel="handleOk">
            <template #footer>
                <a-button key="submit" type="primary" danger @click="handleOk">{{ t('index.disconnect') }}</a-button>
            </template>
            <console-page :deviceconsole="deviceconsole"></console-page>
        </a-modal>
    </div>
</template>
  
<script setup>
import { Button as AButton, message } from 'ant-design-vue';
import { useRouter } from 'vue-router'
import consolePage from './consolePage.vue'
import { nextTick, onMounted, ref } from 'vue'
import Deviceconsole from "../console/index";
import { Modal as AModal } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()
const deviceconsole = ref(null)
const showTerm = ref(false)
const handleOk = () => {
    location.reload()
};
const isMobile = ref(false)
onMounted(() => {
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        // 当前设备是移动设备
        isMobile.value = true
    }
})
const onConnect = async () => {
    deviceconsole.value = new Deviceconsole('terminal');
    try {
        await deviceconsole.value.startConnection();
        showTerm.value = true
        nextTick(startWriting)
    } catch (e) {
        console.log(e)
        showTerm.value = false
    }
};
const startWriting = async () => {
    try {
        await deviceconsole.value.startWriting()
    } catch (e) {
        console.log(e)
        message.error(t('program.disconnectError'))
    }
}
const handlePush = (type) => {
    if (!type) return
    if (type === 'program') {
        router.push('/program')
    }
    if (type === 'dialogue') {
        router.push('/dialogue')
    }
    if (type === 'console') {
        onConnect()
    }
}
const getContainer = () => {
    return document.querySelector(".app")
}
</script>
  
<style>
.wrap {
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
}
.mobile {
    width: 100%;
    display: flex;
    justify-content:center;
}
.wrap>div {
    border-radius: 8px;
    text-align: center;
    padding: 16px;
    background-color: #35363A;
    cursor: pointer;
    color: #eee
}

.wrap>div:hover {
    background-color: #202124;

}

.wrap h2 {
    margin: 0;
    padding: 0
}
</style>
  