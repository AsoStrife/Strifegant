import { createRouter, createWebHistory } from 'vue-router'
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
                    component: () => import('@/views/HomeView.vue')
                }
            ]
        }
    ]
})

export default router
