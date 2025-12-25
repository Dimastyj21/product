import { createRouter, createWebHistory } from "vue-router"
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFoundView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router