import { createRouter, createWebHistory } from 'vue-router'
import { useTitle } from '@vueuse/core'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchPage.vue')
    },
    {
      path: '/searchDetaille',
      name: 'searchDetaille',
      component: () => import('../views/SearchDetaillePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
  ]
})

const DEFAULT_TITLE = 'You Play'

router.afterEach((to) => {
  const title = useTitle()
  title.value = `${DEFAULT_TITLE} | ${to.meta.title}`
})

export default router
