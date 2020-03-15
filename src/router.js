import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
// import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/index',
        title: 'index',
        component: () => import('./views/report/index'),
        hidden: true
    },

]

export const asyncRoutes = [

]

const createRouter = () => new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes
})

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

const router = createRouter()
router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
    next()
})

export default router