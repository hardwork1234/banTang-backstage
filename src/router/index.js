import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login'
const Home = () =>
    import ('../pages/home')
const NotFound = () =>
    import ("../pages/errorPage/404.vue")
const Forbidden = () =>
    import ("../pages/errorPage/403.vue")
const Layout = () =>
    import ("../pages/layout")
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
]

const router = new VueRouter({
    routes
})

export default router