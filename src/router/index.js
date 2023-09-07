import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('@/components/indexPage.vue'),
            },
            {
                path: 'program',
                name: 'program',
                component: () => import('@/components/programPage.vue'),
            },
            {
                path: 'console',
                name: 'console',
                component: () => import('@/components/consolePage.vue'),
            }
        ]
      },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router