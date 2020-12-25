import Vue from 'vue'
import Router from 'vue-router'
//@等价于/src这个目录
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Home from '@/components/Home'
import LibraryIndex from "@/components/library/LibraryIndex";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[
        // {
        //     path: '/',
        //     redirect: '/login'
        // },
        {
            path:'/home',
            name:'Home',
            component:Home,
            redirect:'/index',
            children:[
                {
                    path: '/index',
                    name: 'AppIndex',
                    component: AppIndex,
                    meta: {
                        //表示进入这个路由是需要登录的
                        requireAuth: true
                    }
                },
                {
                    path: '/library',
                    name: 'Library',
                    component: LibraryIndex,
                    meta: {
                        //表示进入这个路由是需要登录的
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        }
    ]
})

