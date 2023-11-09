<template>
    <div :class="item && item.data.identifier === 'recording_transcribed' ? 'user' : 'message'"
        v-for="(item, index) in messages" :key="index">
        <div v-if="item">
            <div>{{ item.ts }} {{ item.data.inputParams.order ? 'Current Order: ' + item.data.inputParams.order : '' }}
            </div>
            <div>{{ item.data.inputParams.recordingText ? item.data.inputParams.recordingText :
                item.data.inputParams.voiceText
            }}</div>
            <voice-component :key="index"
                v-if="item.data && item.data.inputParams && (item.data.inputParams.voiceUrl || item.data.inputParams.recordingUrl)"
                :src="item.data.inputParams.voiceUrl ? item.data.inputParams.voiceUrl : item.data.inputParams.recordingUrl"></voice-component>
        </div>

    </div>
</template>
  
<script setup>
import { computed, defineProps, watch, ref, onMounted } from 'vue';
import voiceComponent from './voice.vue'

const props = defineProps({
    messages: Array,
})
// const messages = computed(() => {
//     const recordsMap = {}
//     props.messages.forEach(item => {
//         if (item.data && item.data.inputParams && (item.data.inputParams.voiceUrl || item.data.inputParams.recordingUrl)) {
//             const recordingId = item.data.inputParams.recordingId
//             const order = item.data.inputParams.order || 0
//             recordsMap[recordingId] = recordsMap[recordingId] || []
//             recordsMap[recordingId][order] = item
//         }
//     })
//     const ms = Object.values(recordsMap).flat()
//     console.log(ms)
//     return ms;
// })
const lastProcessedIndex = ref(0);
const recordsMap = ref({});
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
// const formatRecordsMap = (len) => {
//     recordsMap.value = Object.keys(recordsMap.value).reduce((newData, key) => {
//         newData[parseInt(key) - len] = recordsMap.value[key];
//         return newData;
//     }, {});
//     console.log(recordsMap.value)
// }
let ajust = 0
const manageMessage = (newItems) => {
    newItems.forEach(item => {
        if (item.data && item.data.inputParams && (item.data.inputParams.voiceUrl || item.data.inputParams.recordingUrl)) {
            const recordingId = item.data.inputParams.recordingId
            if (recordingId === 0 && Object.keys(recordsMap.value).length > 2) {
                //  五条为期限,超过五条修改keys
                const len = Object.keys(recordsMap.value).length
                ajust += len
            }
            const order = item.data.inputParams.order || 0
            recordsMap.value[recordingId + ajust] = recordsMap.value[recordingId + ajust] || []
            recordsMap.value[recordingId + ajust][order] = item
        }
    });
}
const messages = computed(() => {
    return Object.values(recordsMap.value).flat();
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
  