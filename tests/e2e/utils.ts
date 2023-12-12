export const API_URL = process.env.API_URL || 'https://rickandmortyapi.com/api/';

export function capitalizeFirstChar(str: string) {
  if (!str || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
