import Vue from 'vue'
import Vuex from 'vuex'
import config from '../../config/app.config'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: {
      center: [config.defaultMapCenter.lon, config.defaultMapCenter.lat],
      zoomlevel: config.defaultMapZoom
    },
    notifications: [],
    notification_max_id: 0,
  },
  actions: actions,
  mutations: mutations,
  getters: getters,
})
