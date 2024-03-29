import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login'
const Roles = () =>
    import ("../pages/power/Roles")
const Rights = () =>
    import ("../pages/power/Rights")
const User = () =>
    import ("../pages/user/User")
const Welcome = () =>
    import ("../pages/home/Welcome")
const Home = () =>
    import ('../pages/home')
const Params = () =>
    import ("../pages/goods/Params")
const Report = () =>
    import ("../pages/report/Report")

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login',

    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: User },
            { path: '/rights', component: Rights },
            { path: '/roles', component: Roles },
            { path: '/params', component: Params },
            { path: '/reports', component: Report },


        ]
    }
]

const router = new VueRouter({
    routes
});
console.log(router);
// 下面是关于登录权限验证的
router.beforeEach((to, from, next) => {
    // 如果去往的路径是/login就放行让他跳到login界面
    if (to.path === '/login') return next();
    // 如果token是空的就调回login
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
        // 如果有token就放行想去哪就去哪？
    next()


})
export default router