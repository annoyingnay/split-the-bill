import { createRouter, createWebHistory } from 'vue-router'
import PeoplePage from '/src/components/PeoplePage.vue'
import FoodPage from '/src/components/FoodPage.vue'
//import ResultPage from '/src/components/ResultPage.vue'
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
    },
    // {
    //     path: '/result',
    //     component: ResultPage
    // }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router