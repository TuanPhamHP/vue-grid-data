import store from "."
let uuid = 0;
class ToastMessage {
  constructor(type, msg, duration) {
    this.type = type;
    this.msg = msg;
    this.duration = duration || 3000;
    this.uuid = uuid++;
    this.timer = setTimeout(() => {
      this.remove()
    }, this.duration)
  }
  remove() {
    store.commit("remove", this)
  }
}
const toast = {
  state: () => ({
    messages: []
  }),
  mutations: {
    push(state, msg) {
      console.log(msg)
      state.messages.push(msg)
    },
    remove(state, msg) {
      const index = state.messages.findIndex((o) => o.uuid === msg.uuid)
      state.messages.splice(index, 1)
    },
    "toast/getInfo"(state, message, duration) {
      store.commit("push", new ToastMessage('info', message, duration))
    },
    "toast/getSuccess"(state, message, duration) {
      store.commit("push", new ToastMessage('success', message, duration))
    },
    "toast/getError"(state, message, duration) {
      store.commit("push", new ToastMessage('error', message, duration))
    },
    "toast/getWarning"(state, message, duration) {
      store.commit("push", new ToastMessage('warning', message, duration))
    }
  },
  actions: {},
  getters: {},
}
export default toast