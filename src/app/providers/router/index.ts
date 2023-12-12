import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './pages';
import { useQueryValidator } from './queryValidator';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

useQueryValidator(router);
