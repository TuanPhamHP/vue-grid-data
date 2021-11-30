const agFilter = {
  state: () => ({
    defaultFilter: {
      filterWithSideBar_status: null,
      filterWithSideBarSingle_status: null
    },
    currentTable: "",
    currentFilter: {}
  }),
  mutations: {
    "agFilter/setDefaultFilter"(state, payload) {
      state.defaultFilter = {
        ...(state.defaultFilter || {}),
        ...payload,
      }
    },
    "agFilter/setCurrentTable"(state, tableName) {
      state.currentTable = tableName
    },
    "agFilter/setCurrentFilter"(state, payload) {
      state.currentFilter = {
        ...(state.currentFilter || {}),
        ...payload,
      }
    },
  },
  actions: {},
  getters: {},
}
export default agFilter
