<template>
    <div class="program">
        <div style="display: flex; justify-content: space-between;margin-bottom: 8px;">
            <a-button @click="handlePushToFrontPage" :icon="h(LeftOutlined)">{{ t('program.backToIndex') }}</a-button>
            <a-radio-group v-model:value="logType" v-if="mqttConnected">
                <a-radio-button value="chat">{{ t('index.mqtt') }}</a-radio-button>
                <a-radio-button value="log">{{ t('index.console') }}</a-radio-button>
            </a-radio-group>
            <a-button v-if="mqttConnected" type="primary" @click="disconnectMqtt" danger html-type="submit">{{
                t('index.disconnect')
            }}</a-button>
        </div>

        <h2 style="text-align: center;" v-if="!mqttConnected">{{ t('mqtt.connectMqtt') }}</h2>
        <a-form :model="form" @finish="handleSubmit" v-bind="formItemLayout" v-if="!mqttConnected">
            <!-- <a-form-item :label="t('mqtt.name')" name="name" :rules="[{ required: true, message: t('mqtt.inputName') }]">
                <a-input :placeholder="t('mqtt.inputName')" v-model:value="form.name" />
            </a-form-item> -->
            <a-form-item :label="t('mqtt.clientId')" name="clientId"
                :rules="[{ required: true, message: t('mqtt.inputClientId') }]">
                <a-input :placeholder="t('mqtt.inputClientId')" v-model:value="form.clientId" />
            </a-form-item>

            <a-form-item :label="t('mqtt.host')" name="host" :rules="[{ required: true, message: t('mqtt.inputHost') }]">
                <a-input :placeholder="t('mqtt.inputHost')" v-model:value="form.host" />
            </a-form-item>

            <a-form-item :label="t('mqtt.port')" name="port" :rules="[{ required: true, message: t('mqtt.inputPort') }]">
                <a-input-number :placeholder="t('mqtt.inputPort')" style="width: 100%;" v-model:value="form.port" />
            </a-form-item>
            <a-form-item :label="t('mqtt.deviceKey')" name="deviceKey"
                :rules="[{ required: true, message: t('mqtt.inputDeviceKey') }]">
                <a-input :placeholder="t('mqtt.inputDeviceKey')" v-model:value="form.deviceKey" />
            </a-form-item>
            <a-form-item :label="t('mqtt.username')" name="username"
                :rules="[{ required: true, message: t('mqtt.inputUsername') }]">
                <a-input :placeholder="t('mqtt.inputUsername')" v-model:value="form.username" />
            </a-form-item>

            <a-form-item :label="t('mqtt.password')" name="password"
                :rules="[{ required: true, message: t('mqtt.inputPassword') }]">
                <a-input-password :placeholder="t('mqtt.inputPassword')" v-model:value="form.password" />
            </a-form-item>
            <a-form-item :label="t('mqtt.useSSL')" name="useSSL">
                <a-switch v-model:checked="form.useSSL" />
            </a-form-item>
            <a-form-item style="text-align: center; width: 100%;">
                <a-button type="primary" html-type="submit">{{ t('program.connect')
                }}</a-button>
            </a-form-item>
        </a-form>


        <div id="message" v-else style="height: 90%;border: 1px solid #000; border-radius: 10px;padding: 8px;overflow-y: auto; overflow-x: hidden; display: flex;
  flex-direction: column;">
            <log-component :messages="messages" v-if="logType === 'log'"></log-component>
            <chat-component :messages="messages" v-else></chat-component>
        </div>
    </div>
</template>
  
<script setup>
import { Form as AForm, FormItem as AFormItem, Button as AButton, Input as AInput, InputNumber as AInputNumber, InputPassword as AInputPassword, Switch as ASwitch, RadioGroup as ARadioGroup, RadioButton as ARadioButton } from 'ant-design-vue';
import { onMounted, ref, h, nextTick } from 'vue';
import logComponent from './logPage'
import chatComponent from './chatPage'

// import chatComponent from './chat.vue'
import {
    LeftOutlined,
} from '@ant-design/icons-vue';
import moment from 'moment'
import Mqtt from './mqtt'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()
// const getContainer = () => {
//     return document.querySelector(".app")
// }
const mqttConnected = ref(false)
const logType = ref('chat')
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const form = ref({
    name: '',
    clientId: '',
    host: '',
    port: 8083,
    username: '',
    password: '',
    useSSL: false,
    deviceKey: '',
    path: '/mqtt'
});
const messages = ref([])
onMounted(() => {
    if (localStorage.getItem('folotoyWS')) {
        form.value = JSON.parse(localStorage.getItem('folotoyWS'))
    }
})
const mqttServer = ref(null)
let a = []
const handleSubmit = () => {
    console.log(form.value);
    form.value.topic = `/user/folotoy/${form.value.deviceKey}/integration/event/post`
    mqttServer.value = new Mqtt(form.value, (e) => {
        messages.value.push({ ts: moment().format('YYYY-MM-DD HH:mm:ss'), data: JSON.parse(e.payloadString) })
        a.push({ ts: moment().format('YYYY-MM-DD HH:mm:ss'), data: JSON.parse(e.payloadString) })
        console.log(a)
        nextTick(() => {
            const element = document.getElementById("message");
            // 滚动到底部
            element.scrollTop = element.scrollHeight;
        })
    })
    mqttServer.value.connectMqtt(() => { mqttConnected.value = true })
};
const handlePushToFrontPage = () => {
    mqttServer.value && disconnectMqtt()
    router.push('/')
}
// const messagePush = (messages, message) =>  {

// }
const disconnectMqtt = () => {
    mqttServer.value.disconnectMqtt()
    messages.value = []
    mqttConnected.value = false
}
</script>
  
<style>
.program {
    padding: 16px;
    height: 80%;
    overflow-y: auto;
    /* position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%, -50%);
     */
}

.content {
    background-color: #eee;
    padding: 16px;
    margin-top: 16px;
}</style>
  