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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchPage.vue')
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
    {
      path: '/message/:id',
      name: 'message',
      component: () => import('../views/MessagePage.vue')
    }
  ]
})

const DEFAULT_TITLE = 'You Play'

router.afterEach((to) => {
  const title = useTitle()
  title.value = `${DEFAULT_TITLE} | ${to.meta.title}`
})

export default router
