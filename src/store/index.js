import Vue from 'vue'
import Vuex from 'vuex'

import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')

Vue.use(Vuex)

const state = {
  setting: {
    start_date: dayjs().subtract(1, 'w').format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
    kokoro_level: [2],
    monster_level: [5],
    radius: 80
  }
}

const mutations = {
  save_setting (state, { setting }) {
    state.setting = { ...setting }
    delete setting.start_date
    delete setting.end_date
    localStorage.setItem('setting', JSON.stringify(setting))
  },
  load_setting (state) {
    const setting = JSON.parse(localStorage.getItem('setting'))
    if (setting) {
      state.setting = Object.assign(state.setting, setting)
    }
  }
}

const actions = {
  save_setting ({ commit }, { setting }) {
    commit('save_setting', { setting })
  },
  load_setting ({ commit }) {
    commit('load_setting')
  }
}

const getters = {

}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store