import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import First from '@/components/views/first'
import Second from '@/components/views/second'
import Login from '@/components/views/login'
import Register from '@/components/views/register'
import Main from '@/components/views/main'
import DataSync from '@/components/views/data_sync'
import Advice from '@/components/views/advice'
import UserInfo from '@/components/views/user_info'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            redirect: '/login'
        },
        {
            path: '/first',
            name: 'First',
            component: First
        },
        {
            path: '/second',
            name: 'Second',
            component: Second
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/main',
            name: 'main',
            component: Main,
            children: [{
                    path: 'data_sync',
                    name: 'DataSync',
                    component: DataSync,
                },
                {
                    path: 'advice',
                    name: 'advice',
                    component: Advice,
                },
                {
                    path: 'user_info',
                    name: 'UserInfo',
                    component: UserInfo,
                }
            ],
        }
    ]

})