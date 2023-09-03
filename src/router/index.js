import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main',
      component: () => import('@/views/main/MainPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/mobile/MobilePage.vue'),
      redirect: '/mobile/home',
      children: [
        {
          path: '/mobile/home',
          component: () => import('@/views/mobile/components/MobileHome.vue')
        },
        {
          path: '/mobile/settings',
          component: () =>
            import('@/views/mobile/components/MobileSettings.vue')
        },
        {
          path: '/mobile/instruction',
          component: () =>
            import('@/views/mobile/components/MobileInstruction.vue')
        },
        {
          path: '/mobile/result',
          component: () => import('@/views/mobile/components/MobileResult.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/notfound/NotFound.vue')
    }
  ]
})

export default router
