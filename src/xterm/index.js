import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import { throttle, debouce } from '../utils/utils'
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
    this.term = new Terminal({
      cols: 80,
      rows: 50,
      cursorBlink: true,
      cursorStyle: "underline",
      theme: {
        foreground: "yellow",
        background: "#060101",
      },
    });
    const fitAddon = new FitAddon();
    this.term.loadAddon(fitAddon);
    this.term.open(this.terminal);
    this.writeTermDebouce = debouce(this.term.write, this)
    this.writeTermThrottle = throttle(transport.write, transport)
  }
  writeTerm(data) {
    this.timer && clearTimeout(this.timer)
    this.timer = null
    this.writeTermDebouce(data)
  }
  disposeTerm() {
    this.term.dispose()
  }
}

export { MyTerm }