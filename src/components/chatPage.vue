<template>
    <div style="flex: 1; overflow-y: auto; overflow-x: hidden;    display: flex;
    flex-direction: column;">
        <div :class="item.identifier === 'recording_transcribed' ? 'user' : 'message'"
            v-for="(item, index) in renderedMmessages" :key="index">
            <div>
                <div>{{ item.ts }} {{ item.order ? 'Current Order: ' + item.order : '' }}
                </div>
                <div style=" word-wrap: break-word;">{{ item.text }}</div>
                <voice-component :key="index" v-if="item.url" :src="item.url"></voice-component>
            </div>

        </div>
    </div>
    <div style="width: 100%;box-sizing: border-box;padding: 8px">
        <a-input-search v-model:value="inputText" enter-button="Send" size="large" @search="onSearch"
            @pressEnter="onSearch" />
    </div>
</template>
  
<script setup>
import { defineProps, watch, ref, onMounted, defineEmits, computed } from 'vue';
import voiceComponent from './voice.vue'
import { InputSearch as AInputSearch } from 'ant-design-vue'
import moment from 'moment';
const emit = defineEmits(['handleSendMqtt'])
const inputText = ref('')
const onSearch = (e) => {
    const msg = {
        "msgId": 1,
        "identifier": "iwantplay",
        "inputParams": {

        }
    }
    if (e.indexOf('http') >= 0) {
        msg.inputParams.url = e
    } else {
        msg.inputParams.text = e
    }
    const data = JSON.stringify(msg)
    countStart += 10
    messages.value[countStart] = {
        identifier: 'recording_transcribed',
        ts: moment().format('YYYY-MM-DD HH:mm:ss'),
        text: e,
    }
    emit('handleSendMqtt', data)
    inputText.value = ''
}
const props = defineProps({
    messages: Array,
})
const messages = ref([])
const lastProcessedIndex = ref(0);
// const recordsMap = ref({});
onMounted(() => {
    manageMessage(props.messages)
})
watch(
    () => props.messages.length,
    (newLength, oldLength) => {
        if (oldLength !== undefined && newLength > oldLength) {
            const newItems = props.messages.slice(lastProcessedIndex.value);
            manageMessage(newItems)
            lastProcessedIndex.value = newLength;
        }
    },
    { immediate: false }
);
const manageMessage = (newItems) => {
    newItems.forEach(item => {
        if (item.data && item.data.inputParams) {
            if (item.data.inputParams.voiceUrl || item.data.inputParams.recordingUrl) {
                manageVoiceMsg(item)
            }
        }

    });
}
let currentRecordingId = 0
let countStart = 0
const manageVoiceMsg = (item) => {
    const newItem = {}
    const recordingId = item.data.inputParams.recordingId
    const order = item.data.inputParams.order || 0
    //如果不是相同recordingId，说明是新的
    if (recordingId !== currentRecordingId) {
        countStart += 10
    }
    currentRecordingId = recordingId
    newItem.url = item.data.inputParams.voiceUrl || item.data.inputParams.recordingUrl
    newItem.text = item.data.inputParams.recordingText || item.data.inputParams.voiceText
    newItem.order = item.data.inputParams.order || 0
    newItem.ts = item.ts
    newItem.identifier = item.data.identifier
    messages.value[countStart + order] = newItem
}
const filterEmpty = (arr) => {
    return arr.filter((element) => {
        return element !== "" && element !== null && element !== undefined;
    });
}
const renderedMmessages = computed(() => {
    return filterEmpty(messages.value)
});
</script>
  
<style scoped>
.message {
    position: relative;
    align-self: flex-start;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
    background-color: #e9e9e9;
    max-width: 70%;
}

.message::before {
    content: "";
    position: absolute;
    top: 10px;
    left: -17px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #e9e9e9 transparent transparent;
}

.user {
    position: relative;
    align-self: flex-end;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
    max-width: 70%;
    background-color: #28b561;
}

.user::before {
    content: "";
    position: absolute;
    top: 10px;
    right: -17px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #28b561;
}
</style>
  