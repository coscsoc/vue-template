const { pageSize } = require("../../config.json")

const state = {
  pageSize,
}

const getters = {
  pageSize: state => state.pageSize,
}

const actions = {
}

const mutations = {
  SAVE_PAGE_SIZE(state, { pageSize }) {
    state.pageSize = pageSize
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
