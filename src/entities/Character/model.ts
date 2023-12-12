import type { Character, CharacterFilter, Info } from 'rickmortyapi';

import { useGetMaxCharacters, useGetCharacters } from './api.ts';
import { SaveRouteParams } from '@/app/providers/router/queryValidator';
import { sleep } from '@/shared/lib/utils/sleep';
import { updateRouteQuery } from '@/shared/lib/utils/updateRouteParams';

export interface CharacterState {
  characters: Character[];
  characterInfo: Info<Character>['info'] | null;
  isError: boolean;
  isFetching: boolean;
  isFetched: boolean;
  messageError: string;
  page: number;
}

export type PaginationType = 'more-btn' | 'pagination' | 'scroll';

export const useCharacterStore = defineStore('character', () => {
  const character = reactive<CharacterState>({
    characters: [],
    characterInfo: null,
    isError: false,
    isFetching: false,
    isFetched: false,
    messageError: '',
    page: 1,
  });
  const router = useRouter();
  const route = useRoute();

  async function fetchCharacters(filters?: CharacterFilter, maxCharacters?: number) {
    character.isError = false;
    character.messageError = '';
    character.isFetched = false;
    character.isFetching = true;

    try {
      await sleep(1000);
      const resp = maxCharacters ? await useGetMaxCharacters(filters, maxCharacters) : await useGetCharacters(filters);

      return resp;
    } catch (err) {
      const error = err as unknown as Error;
      character.isError = true;
      character.messageError = 'Error to fetch characters ' + error.message;
      console.error(err);
    } finally {
      character.isFetching = false;
      character.isFetched = true;
    }
  }

  async function getCharacters(filters: CharacterFilter) {
    if (filters.page && character.page !== filters.page) {
      character.page = filters.page;
    }

    const response = await fetchCharacters(filters);

    if (response) {
      character.characters = response.results ?? [];
      character.characterInfo = response.info;

      router.push({
        query: updateRouteQuery(
          { status: filters['status'], gender: filters['gender'], page: filters['page'] },
          route.query,
        ),
      });
    }
  }

  async function updatePage(page: number, query: SaveRouteParams) {
    character.page = page;

    const params = {
      ...query,
      page: character.page,
    };

    const response = await fetchCharacters(params);

    if (response) {
      character.characters = [...character.characters, ...(response.results ?? [])];
      character.characterInfo = response.info;

      router.push({ query: updateRouteQuery(params, route.query) });
    }
  }

  async function initCharacters(filters: SaveRouteParams) {
    character.page = filters.page || 1;
    const maxCharacters = character.page > 1 ? 20 * character.page : 20;

    const response = await fetchCharacters(filters, maxCharacters);

    if (response) {
      character.characters = response.results ?? [];
      character.characterInfo = response.info;

      router.push({
        query: updateRouteQuery(
          { status: filters['status'], gender: filters['gender'], page: filters['page'] },
          route.query,
        ),
      });
    }
  }

  async function resetCharacters() {
    const response = await fetchCharacters();

    if (response && !character.isError) {
      character.characters = response.results ?? [];
      character.characterInfo = response.info;
      character.page = 1;

      router.push({ query: {} });
    }
  }

  return {
    character,
    getCharacters,
    resetCharacters,
    updatePage,
    initCharacters,
  };
});
