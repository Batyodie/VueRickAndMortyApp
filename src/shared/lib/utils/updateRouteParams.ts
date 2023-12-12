import { LocationQueryRaw } from 'vue-router';

export function updateRouteQuery(params: LocationQueryRaw, routeQuery: LocationQueryRaw): LocationQueryRaw {
  const updatedQuery: LocationQueryRaw = { ...routeQuery };

  for (const key in params) {
    if (params[key] !== routeQuery[key]) {
      updatedQuery[key] = params[key];
    }
  }

  return updatedQuery;
}
