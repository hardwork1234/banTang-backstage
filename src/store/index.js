import Vuex from 'vuex'
import Vue from 'vue'


const actions = {

}
const mutations = {
    PassName(state, value) {
        state.brname = value

    },
    ChangeData(state, value) {

        state.brname += value
    }

}
const state = {
    brname: "vuex -我是测试组件"

}
Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    mutations,
    state,
})