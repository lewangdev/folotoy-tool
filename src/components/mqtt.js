import Paho from 'paho-mqtt'
import { message } from 'ant-design-vue'
class Mqtt {
  constructor (mqttOptions, onMessageArrived) {
    this.mqttOptions = mqttOptions
    this.onMessageArrived = onMessageArrived
    this.client = null
    this.reconnect = null
    this.showFire = null
    this.hide = null
  }
  connectMqtt (success) {
    this.client = new Paho.Client(this.mqttOptions.host, Number(this.mqttOptions.port), this.mqttOptions.path, this.mqttOptions.clientId)
    this.client.startTrace()
    this.client.onConnectionLost = this.onConnectionLost.bind(this)
    this.client.onMessageArrived = this.onMessageArrived
    this.hide = message.loading('Connecting...')
    this.client.connect(
        {
          onSuccess: () => {
            clearInterval(this.reconnect)
            localStorage.setItem('folotoyWS', JSON.stringify(this.mqttOptions))
            this.hide()
            success()
            message.success('Connected Success')
            this.subscribe(this.mqttOptions.topic)
          },
          userName: this.mqttOptions.username,
          password: this.mqttOptions.password,
          useSSL: this.mqttOptions.useSSL,
          onFailure: (err) => {
            console.log(err)
            this.hide()
            message.error('Connected Failed')
          }
        })
  }
  disconnectMqtt() {
    this.client.disconnect()
  }
  subscribe(topic) {
    this.client.subscribe(topic, { qos: 0 })
  }
  unSubscribe(topic) {
    this.client.unSubscribe(topic, { qos: 0 })
  }
  onConnect () {
    console.log('Connect Success', this.mqttOptions.subscription)
    this.mqttOptions.subscription.forEach(item => {
      this.client.subscribe(item, { qos: 0 })
    })
  }
  onConnectionLost (responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage)
      const _this = this
      this.reconnect = setInterval(() => {
        console.log('reconnect...')
        _this.connectMqtt()
      }, 10000)
    }
  }
  send (topic, playload, qos) {
    try {
      this.client.send(topic, playload, qos)
    } catch(e) {
        this.connectMqtt()
    }
  }
}

export default Mqtt
