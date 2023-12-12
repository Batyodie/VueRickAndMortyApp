import { Character } from 'rickmortyapi';
import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export interface SaveRouteParams {
  status?: Character['status'];
  gender?: Character['gender'];
  page?: number;
}

export function validateHandler(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  const { page, status, gender } = to.query;

  // Validate 'page' - it should be a number
  if (page !== undefined && (Array.isArray(page) || isNaN(Number(page)))) {
    return next({ name: 'ErrorPage', query: { message: 'Invalid page number' } });
  }

  // Validate 'status' - it should be 'Dead', 'Alive', or 'unknown'
  if (status && (Array.isArray(status) || !['Dead', 'Alive', 'unknown'].includes(status))) {
    return next({ name: 'ErrorPage', query: { message: 'Invalid status' } });
  }

  // Validate 'gender' - it should be 'Female', 'Male', 'Genderless', or 'unknown'
  if (gender && (Array.isArray(gender) || !['Female', 'Male', 'Genderless', 'unknown'].includes(gender as string))) {
    return next({ name: 'ErrorPage', query: { message: 'Invalid gender' } });
  }

  next();
}

export function useQueryValidator(router: Router) {
  router.beforeEach((to, from, next) => validateHandler(to, from, next));
  router;
}
