import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import { throttle, debouce } from '../utils/utils'
import 'xterm/css/xterm.css';
class MyTerm {
  constructor(terminal) {
    this.terminal = document.getElementById(terminal)
    this.term = '';
    this.timer = null;
    this.writeTermDebouce = null;
    this.writeTermThrottle = null
  }
  prompt() {
    this.term && this.term.write('\r\n');
  }
  stringToUint8Array(str) {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
      arr.push(str.charCodeAt(i));
    }
    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array;
  }
  setTerm(transport) {
    console.log('setTerm')
    this.term = new Terminal({
      convertEol: true,
      disableStdin: true,
      rows: 40,
      cols: 100,
      cursorBlink: true,
      cursorStyle: "underline",
      theme: {
        foreground: "yellow",
        background: "#000",
      },
    });
    const fitAddon = new FitAddon();
    this.term.loadAddon(fitAddon);
    this.term.open(this.terminal);
    this.writeTermDebouce = debouce(this.term.write, this)
    this.writeTermThrottle = throttle(transport.write, transport)
    fitAddon.fit();
  }
  trim(str) {

    return str.replace(/(^\s*)|(\s*$)/g, "");

  }
  Uint8ArrayToString(fileData) {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
    return this.trim(dataString)
  }
  writeTerm(data) {
    // console.log(this.Uint8ArrayToString(data))
    this.timer && clearTimeout(this.timer)
    this.timer = null
    this.writeTermDebouce(this.Uint8ArrayToString(data))
  }
  disposeTerm() {
    this.term.dispose()
  }
}

export { MyTerm }
