import { createRouter, createWebHistory } from 'vue-router'

import breadcrumbs from '@/router/breadcrumbs'
import SideMenuLayout from '@/layouts/SideMenuLayout.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'


import { useAuthStore } from '@/stores/auth'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/auth/LoginView.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('@/views/auth/LogoutView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/',
            component: SideMenuLayout,
            children: [
                {
                    name: 'dashboard',
                    path: '/',
                    component: () => import('@/views/HomeView.vue'),
                    meta: {
                        breadcrumbs: breadcrumbs.dashboard,
                        requiresAuth: false
                    }
                },
                {
                    name: 'project',
                    path: '/project/:id',
                    component: () => import('@/views/ProjectView.vue'),
                    meta: {
                        breadcrumbs: breadcrumbs.dashboard,
                        requiresAuth: false
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


router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isLogged) {
        return {
            path: '/login',
        }
    }
})


export default router
