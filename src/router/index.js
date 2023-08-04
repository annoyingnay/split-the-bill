import { createRouter, createWebHistory } from 'vue-router'
import PeoplePage from '/src/components/PeoplePage.vue'
import FoodPage from '/src/components/FoodPage.vue'
import PayPage from '/src/components/PayPage.vue'

const routes = [
    {
        path: '/',
        name: 'PeoplePage',
        component: PeoplePage,
    },
    {
        path: '/food',
        name: 'FoodPage',
        component: FoodPage,
    },
    {
        path: '/pay',
        name: 'PayPage',
        component: PayPage,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router