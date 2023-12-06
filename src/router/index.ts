import { createRouter, createWebHistory } from 'vue-router'

import breadcrumbs from '@/router/breadcrumbs'

import SideMenuLayout from '@/layouts/SideMenuLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: SideMenuLayout,
            children: [
                {
                    name: 'dashboard',
                    path: '/',
                    component: () => import('@/views/HomeView.vue'),
                    meta: {
                        breadcrumbs: breadcrumbs.dashboard
                    }
                }
            ]
        }
    ]
})

export default router
