const agFilter = {
  state: () => ({
    defaultFilter: {
      filterWithSideBar_status: null,
      filterWithSideBarSingle_status: null
    },
    currentTable: "",
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
  },
  actions: {},
  getters: {},
}
export default agFilter
