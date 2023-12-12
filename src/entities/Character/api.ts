import type { Character, CharacterFilter, Info } from 'rickmortyapi';
import * as rickmortyapi from 'rickmortyapi';

export async function useGetCharacters(filters?: CharacterFilter) {
  const response = await rickmortyapi.getCharacters(filters);

  if (response && response.data) {
    return response.data;
  }

  throw new Error('Error to fetch characters, not found response data');
}

// Т.к для запроса `rickmortyapi.getCharacters` есть лимиты(максимум 20 персонажей),
// чтоб это обойти, делаю несколько запросов
export async function useGetMaxCharacters(filters?: CharacterFilter, maxCharacters: number = 20) {
  let characters: Character[] = [];
  let info: Info<Character[]>['info'] | null | undefined = null;
  let page = 1;

  while (characters.length < maxCharacters) {
    try {
      const response = await rickmortyapi.getCharacters({ ...(filters ?? {}), page });
      if (response) {
        characters = characters.concat(response.data.results ?? []);
        info = response.data.info;

        if (characters.length >= maxCharacters || !response.data.info?.next) {
          break;
        }

        page++;
      }
    } catch (error) {
      console.error('Error to fetch max characters, ', error);
    }
  }

  return {
    results: characters.slice(0, maxCharacters),
    info,
  };
}
