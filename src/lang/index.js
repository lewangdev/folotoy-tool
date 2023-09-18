import { createI18n } from 'vue-i18n'
const getLang = (lang) => {
    if (lang === 'zh-TW' || lang === 'zh-HK') {
        return 'zh-TW'
    } else if (lang === 'zh-CN') {
        return 'zh-CN'
    } else {
        return 'en-US'
    }
}
export default createI18n({ 
  legacy: false, // 让 setup 函数可以通过 t 访问
  globalInjection: true, // 让 template 可以像 vue2 那样使用 $t 来访问
  locale: localStorage.getItem('preferLang') ? localStorage.getItem('preferLang')  : getLang(window.navigator.language),
  messages: {
    'zh-CN': {
      index: {
        disconnect: '断开链接',
        program: '刷机',
        console: '日志'
      },
      console: {
        restart: '重启'
      },
      program: {
        backToIndex: '返回首页',
        connect: '连接设备',
        baulrate: '波特率',
        selectBaulrate: '请选择波特率',
        inputAddress: '请输入地址',
        address: '地址',
        selectFile: '选择文件',
        write: '写入',
        success:'成功！请重启设备',
        inProcessTip: '正在写入中，是否要断开连接？',
        confirm: '确定',
        cancle: '取消',
        stepConnect: '连接设备',
        inProcess: '写入中',
        done: '完成',
        pleaseSelectFile: '请选择文件',
        disconnectError: '设备出错，请重新连接再试',
        erase: '抹除',
        eraseSuccess: '设备已被成功抹除',
        eraseError: '抹除设备失败',
        confirmErase: '确定抹除设备'
      }
    },
    'zh-TW': {
        index: {
            disconnect: '斷開連結',
            program: '刷機',
            console: '日誌'
          },
          console: {
            restart: '重啟'
          },
          program: {
            backToIndex: '返回首頁',
            connect: '連結設備',
            baulrate: '波特率',
            selectBaulrate: '請選擇波特率',
            inputAddress: '請輸入地址',
            address: '地址',
            selectFile: '選擇文件',
            write: '寫入',
            success:'成功！請重啟設備',
            inProcessTip: '正在寫入中，是否要斷開設備？',
            confirm: '確定',
            cancle: '取消',
            stepConnect: '連接設備',
            inProcess: '寫入中',
            done: '完成',
            pleaseSelectFile: '請選擇文件',
            disconnectError: '設備出錯，請重新連後重試',
            erase: '抹除',
            eraseSuccess: '設備已被成功抹除',
            eraseError: '抹除設備失敗',
            confirmErase: '確定抹除設備'
          }
    },
    'en-US': {
      index: {
        disconnect: 'Disconnect',
        program: 'Program',
        console: 'Console'
      },
      console: {
        restart: 'Restart'
      },
      program: {
        backToIndex: 'Back To Index',
        connect: 'Connect',
        baulrate: 'Baulrate',
        selectBaulrate: 'Please select baulrate',
        inputAddress: 'Please input address',
        address: 'Address',
        selectFile: 'Select File',
        write: 'Write',
        success: 'Great, Please Restart Your Device!',
        inProcessTip: 'Programming is in process, are you sure to leave?',
        confirm: 'Confirm',
        cancle: 'Cancle',
        stepConnect: 'Connect Device',
        inProcess: 'In Process',
        done: 'Done',
        pleaseSelectFile: 'Please Select File',
        disconnectError: 'Something wrong with the device, please reconnect and try again',
        erase: 'Erase',
        eraseSuccess: 'Device has been erased successfully',
        eraseError: 'Something wrong with the device, please reconnect and try again',
        confirmErase: 'Are you sure to erase device?'
      }
    },
  }
})