import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser( state, payload ) {
      state.user = payload;
    }
  },
  actions: {
    isSignedInUser( {commit}, payload ) {
      commit('setUser', payload);
    }
  },
  modules: {
  },
  getters: {
    user( state ) {
      return state.user
    }
  },
  plugins: [createPersistedState()],
})
