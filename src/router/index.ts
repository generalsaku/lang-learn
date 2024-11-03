import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

import LangLearn from '@/components/LangLearn.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/lang-learn' },
  { path: '/lang-learn', component: LangLearn },
  { path: '/:catchAll(.*)', redirect: '/' }, // Catch-all route
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
