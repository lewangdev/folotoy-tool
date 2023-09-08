import { Transport } from "esptool-js";
import { MyTerm } from "../xterm/index";
// 连接按钮
export default class Deviceconsole {
  device = null
  transport = null
  isConsoleClosed = true;
  deviceInfo = null
  constructor(terminal) {
   this.terminalName = terminal
  }
  startConnection = async () => {
    // 避免重复点击
    if (this.device === null) {
      this.device = await navigator.serial.requestPort({
        usbVendorId: '1A86',
        usbProductId: '7523'
      });
      this.transport = new Transport(this.device);
    }
    await this.transport.connect();
  };
  startWriting = async () => {
    this.term = new MyTerm(this.terminalName)
    this.deviceInfo = this.transport.get_info();
    this.isConsoleClosed = false;
    this.term.setTerm(this.transport);
    this.term.writeTerm(' success: ' + this.deviceInfo)
    this.term.prompt()
    while (!this.isConsoleClosed) {
      let val = await this.transport.rawRead();
      if (typeof val !== "undefined") {
        this.term.writeTerm(val);
      } else {
        break;
      }
    }
    console.log("quitting console");
  }
  stopConnection = async () => {
    console.log("stop");
    // location.reload();
    // 关闭有问题 TODO...
    if (this.device !== null) {
      await this.transport.disconnect();
      await this.transport.waitForUnlock(1500);
      this.isConsoleClosed = true;
    }
  };
  resetDevice = async () => {
    if (this.device === null) {
      this.device = await navigator.serial.requestPort({});
      this.transport = new Transport(this.device);
    }
    await this.transport.setDTR(false);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await this.transport.setDTR(true);
  };
}

