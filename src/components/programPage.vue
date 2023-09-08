<template>
    <div class="program">
        <a-button @click="handlePushToFrontPage" :icon="h(LeftOutlined)">Back To Index</a-button>
        <!-- <a-button v-if="deviceBin&&deviceBin.device" @click="handleDisconnect" type="primary" danger style="float: right;">Erase</a-button> -->
        <a-button v-if="current === 1" @click="handleDisconnect" type="primary" danger
            style="float: right;">Disconnect</a-button>
        <br />
        <br />
        <a-steps :items="items"></a-steps>
        <div class="content" v-if="current === 0">
            <a-form :model="balrateFormState" name="basic" :label-col="{ span: 11 }" :wrapper-col="{ span: 24 }"
                autocomplete="off" @finish="onBaulrateFinish">
                <a-form-item label="Baulrate" name="baulrate"
                    :rules="[{ required: true, message: 'Please Select your baulrate!' }]">
                    <a-select @change="handleChangeBaulrate" :value="balrateFormState.baulrate" style="width: 120px"
                        :options="optionsBaulrate"></a-select>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 11, span: 24 }">
                    <a-button type="primary" html-type="submit" :loading="connectLoading">Connect</a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class="content" v-if="current === 1">
            <a-form @finish="onFileFinish" :model="fileFormState" name="file" :label-col="{ span: 11 }"
                :wrapper-col="{ span: 24 }">
                <a-form-item label="Address" name="address" :rules="[{ required: true, message: 'Please input address!' }]">
                    <a-input style="width: 120px" v-model:value="fileFormState.address" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 11, span: 24 }">
                    <a-upload accept=".bin" :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
                        <a-button>
                            Select File
                        </a-button>
                    </a-upload>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 11, span: 24 }">
                    <a-button type="primary" html-type="submit" :loading="writeLoading">Write</a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class="content" v-if="current === 2">
            <a-progress :percent="progress" />
        </div>
        <div class="content" v-if="current === 3">
            <a-result title="Great, Please Restart Your Device!">
                <template #icon>
                    <smile-twoTone />
                </template>
            </a-result>
        </div>
        <div v-show="showTerm" id="terminal"
            style="position: relative;height: 500px;background-color: #000; margin-top: 20px;overflow: scroll;padding: 0 16px;">
        </div>
    </div>
</template>
  
<script setup>
import { Select as ASelect, Button as AButton, Form as AForm, FormItem as AFormItem, Steps as ASteps, Upload as AUpload, message, Input as AInput, Progress as AProgress, Result as AResult, Modal } from 'ant-design-vue';
import { ref, reactive, h, watch, createVNode } from 'vue';
import {
    ApiOutlined,
    FileOutlined,
    SmileOutlined,
    SmileTwoTone,
    RedoOutlined,
    LeftOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import DeviceBin from "../writeBin/index";
import { useRouter } from 'vue-router'
const router = useRouter()
const deviceBin = ref(null)
const getContainer = () => {
  return document.querySelector(".app")
}
const handlePushToFrontPage = () => {
    if (showTerm.value === true) {
        Modal.confirm({
            getContainer: getContainer(),
            title: 'Confirm',
            icon: createVNode(ExclamationCircleOutlined),
            content: 'Programming is in process, are you sure to leave?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                window.location.href = '/'
            }
        });
    } else {
        if (!deviceBin.value || deviceBin.value.device === null) {
        router.push('/')
    } else {
        window.location.href = '/'
    }
    }
    
}
//steps
const current = ref(0);
const items = ref([
    {
        title: 'Connect Device',
        status: 'process',
        icon: h(ApiOutlined),
    },
    {
        title: 'Select File',
        status: 'wait',
        icon: h(FileOutlined),
    },
    {
        title: 'In Progress',
        status: 'wait',
        icon: h(RedoOutlined),
    },
    {
        title: 'Done',
        status: 'wait',
        icon: h(SmileOutlined),
    },
])
const setStep = () => {
    items.value.forEach((item, index) => {
        if (index === current.value) {
            item.status = 'process'
        } else {
            item.status = 'wait'
        }
    })
}
const showTerm = ref(false)
watch(current, setStep)
//baulrate
const connectLoading = ref(false)
const optionsBaulrate = ref([
    {
        value: '115200',
        label: '115200',
    },
    {
        value: '921600',
        label: '921600',
    },
    {
        value: '460800',
        label: '460800'
    },
    {
        value: '230400',
        label: '230400',
    },
]);
const balrateFormState = reactive({
    baulrate: '115200',
});
const handleChangeBaulrate = (e) => {
    balrateFormState.baulrate = e
}
const onBaulrateFinish = async (values) => {
    try {
        connectLoading.value = true
        deviceBin.value = new DeviceBin(values.baulrate, 'terminal');
        await deviceBin.value.connectDevice();
        current.value = 1
    } catch (e) {
        current.value = 0
        connectLoading.value = false
    }
};
//file
const fileList = ref([])
const writeLoading = ref(false)
const fileFormState = reactive({
    address: '0x0'
})
const progress = ref(0)
const fileData = ref(null)
const beforeUpload = file => {
    console.log(file)
    fileList.value = [file]
    const reader = new FileReader();
    reader.onload = (ev) => {
        fileData.value = ev.target.result
    }
    reader.readAsBinaryString(file);
    return false;
};
const handleRemove = () => {
    fileList.value = [];
}
const onFileFinish = (values) => {
    if (fileList.value.length === 0) {
        message.error('Please select file')
    } else {
        writeLoading.value = true
        current.value = 2
        showTerm.value = true
        const p = deviceBin.value.program([{ data: fileData.value, address: values.address }], (written, total) => {
            progress.value = Math.floor((written / total) * 100)
        });
        p.catch(() => {
            try {
                handleDisconnect()
            } catch (e) {
                current.value = 0
                connectLoading.value = false
                writeLoading.value = false
                showTerm.value = false
            }
            message.error('Something wrong with the device, please reconnect and try again')
        })
        p.finally(async () => {
            try {
                await deviceBin.value.disConnectDevice()
                current.value = 3
                showTerm.value = false
            } catch(e) {
                current.value = 0
                connectLoading.value = false
                writeLoading.value = false
                showTerm.value = false
            }
        })
    }
}
const handleDisconnect = async () => {
    await deviceBin.value.disConnectDevice()
    current.value = 0
    connectLoading.value = false
    writeLoading.value = false
    showTerm.value = false
}
</script>
  
<style>
.program {
    padding: 16px;
    position: absolute;
    top: 45%;
    left: 50%;
    width: 80%;
    height: 70%;
    transform: translate(-50%, -50%);
}

.content {
    background-color: #eee;
    padding: 16px;
    margin-top: 16px;
}

.xterm {
    padding-bottom: 40px;
}

.xterm-helper-textarea {
    display: none;
}

.xterm-viewport {
    display: none;
}
</style>
  