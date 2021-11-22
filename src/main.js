import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import '../src/assets/css/global.css'
import '../src/assets/fonts/iconfont.css'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    // 给请求头设置一个Authorization属性会携带token
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
        // 必须return出去这个config否则会被拦截
    return config

})
Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')