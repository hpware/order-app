import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/Tabs.vue';
import login from '@/pages/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/app/login'
    },
    {
        path: '/test',
        redirect: '/app/testlogin'
    },
    {
        path: '/app/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/app/login'
            },
            {
                path: 'login',
                component: () => import('@/pages/LoginPage.vue')
            },
            {
                path: 'testlogin',
                component: () => import('@/pages/TestLoginPage.vue')
            },
            {
                path: 'home',
                component: () => import('@/pages/Home.vue')
            },
            {
                path: 'management',
                component: () => import('@/pages/ManagementPage.vue')
            },
            {
                path: '充值',
                component: () => import('@/pages/RechargePage.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/app/404'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
