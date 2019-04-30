import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      page: 'index'
    },
    mutations: {
      updatePage(state, pageName) {
        state.page = pageName
        console.log(pageName);
      }
    }
  })
}

export default createStore