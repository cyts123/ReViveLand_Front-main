import Vue from 'vue'
import Vuex from 'vuex'
import state from './modules/state'
import actions from './modules/actions'
import mutations from './modules/mutations'
import getters from './modules/getters'
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})