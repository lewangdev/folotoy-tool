<template>
    <div class="console">
        <a-button @click="onRestart" type="primary" html-type="submit">{{ t('console.restart') }}</a-button>
        <div id="terminal" style="position: relative;height: 500px; margin-top: 20px;">
        </div>
        <!-- <div
            style="display: flex;justify-content: flex-start;position: absolute;bottom: 56px;border: 0;width: 94.2%;background-color: #000;z-index: 1000">
            <span style="color: #fff"> Folotoy $:</span>
            <input type="text"
                style="background-color: #000;color: #fff;width: 50%; border:none; text-indent: 10px;outline: none;z-index: 1000;"
                autofocus @keydown="handleKeyDown">
        </div> -->
    </div>
</template>
  
<script setup>
import { Button as AButton } from 'ant-design-vue';
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({
    deviceconsole: {
        required: true
    }
})
const onRestart = () => {
    props.deviceconsole.resetDevice()
}
// const handleKeyDown = (event, ev) => {
//     console.log(event, ev)
//     if (event.key === "Enter") {
//         // 处理回车事件
//         console.log("回车键已按下！");
//         props.deviceconsole.term.writeTermDebouce('Folotoy $: ' + event.target.value + '\r\n')
//         const encoder = new TextEncoder();
//         const uint8Array = encoder.encode(event.target.value);
//         props.deviceconsole.transport.write(uint8Array)
//         console.log(uint8Array)
//         event.target.value = ''

//     }
// }
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



.xterm-viewport {
    display: none;
} */
.xterm-helper-textarea,
.xterm-cursor,
.xterm-cursor-outline {
    display: none !important
}</style>
  