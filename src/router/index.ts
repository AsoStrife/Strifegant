import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
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
                    component: HomeView
                },
                // {
                //     name: 'secondPage',
                //     path: '/second_page',
                //     component: HomeView
                // }
            ]
        }
    ]
})

export default router
