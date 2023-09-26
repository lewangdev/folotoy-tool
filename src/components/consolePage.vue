<template>
    <div class="console">
        <a-button @click="onRestart" type="primary" html-type="submit">{{ t('console.restart') }}</a-button>
        <div id="terminal"
            style="position: relative;height: 500px; margin-top: 20px;overflow: scroll;padding: 0 16px;">
        </div>
    </div>
</template>
  
<script setup>
import { Button as AButton } from 'ant-design-vue';
import { defineProps, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({
    deviceconsole: {
        required: true
    }
})
onMounted(async () => {
    await props.deviceconsole.startWriting()
})
const onRestart = () => {
    props.deviceconsole.resetDevice()
}
//console
</script>
  
<style>
.console {}

.consoleContent {
    background-color: #eee;
    padding: 16px;
    margin-top: 16px;
    text-align: center;
}

/* .xterm {
    padding-bottom: 40px;
}

.xterm-helper-textarea {
    display: none;
}

.xterm-viewport {
    display: none;
} */
</style>
  