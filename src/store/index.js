const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL
import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import agFilter from "./agFilter"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentToken: "",
    filterSelect: {
      multiSelectExample: {
        items: [
          { id: 1, name: "Nháp" },
          { id: 2, name: "Đã gửi" },
        ],
      },
    },
    currentFilter: {
      multiple: false,
      itemField: "multiSelectExample", // name of filter select
      items: [],
      itemText: "name",
      itemValue: "id",
    },
  },
  mutations: {
    setCurrentToken(state, payload) {
      localStorage.setItem("auth._token.local", payload)
      state.currentToken = payload
    },
    setCurrentFilter(state, payload) {
      const obj = { ...payload }
      obj.items = state.filterSelect[payload.itemsField]
        ? [...state.filterSelect[payload.itemsField]]
        : []
      state.currentFilter = { ...obj }
    },
  },
  actions: {
    resetToken({ commit }) {
      axios
        .post(`${VUE_APP_BASE_URL}/api/auth/login`, {
          login: "freelancer-0009",
          password: "1234567890",
        })
        .then((res) => {
          commit("setCurrentToken", res.data.data.token)
          console.log("token reset successfully")
        })
    },
  },
  modules: {
    agFilter,
  },
})
