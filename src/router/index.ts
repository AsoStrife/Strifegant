import { createRouter, createWebHistory } from 'vue-router'

import breadcrumbs from '@/router/breadcrumbs'

import SideMenuLayout from '@/layouts/SideMenuLayout.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

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
                },
                {
                    name: 'project',
                    path: '/project/:id',
                    component: () => import('@/views/ProjectView.vue'),
                    meta: {
                        breadcrumbs: breadcrumbs.dashboard
                    }
                }
            ]
        },
        {
            name: 'Error404',
            path: '/:pathMatch(.*)*',
            component: NotFoundPage,
        }
    ]
})

export default router
