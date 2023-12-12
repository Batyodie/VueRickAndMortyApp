import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    name: 'MainPage',
    path: '/',
    component: () => import('@/pages/MainPage.vue'),
  },
  {
    name: 'ErrorPage',
    path: '/error',
    component: () => import('@/pages/ErrorPage.vue'),
    props: (route) => ({ errorMessage: route.query.message }),
  },
];
