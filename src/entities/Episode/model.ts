import type { Character, Episode } from 'rickmortyapi';
import { useGetEpisode } from './api';

export const useEpisodeStore = defineStore('episode', () => {
  const episodes = ref(new Map<number, Episode>());

  // Т.к базовый запрос на получение персонажей не отдает информацию по первому эпизоду,
  // а возвращает массив ссылок апи, приходится для каждой карточки получать отдельный эпизод и кешировать их
  async function fetchEpisode(id: number | number[]) {
    if (Array.isArray(id) && id.length === 0) return;
    if ((typeof id === 'number' && Number.isNaN(id)) || (typeof id === 'number' && episodes.value.has(id))) return;

    try {
      const newIds: number[] = [];
      if (Array.isArray(id)) {
        id.forEach((currentId) => (!episodes.value.has(currentId) ? newIds.push(currentId) : false));

        if (newIds.length) {
          const resp = await useGetEpisode(newIds);

          if (Array.isArray(resp))
            resp.forEach((episode) =>
              !episodes.value.has(episode.id) ? episodes.value.set(episode.id, episode) : false,
            );

          return;
        }

        return;
      }

      const resp = await useGetEpisode(id);

      if (Array.isArray(resp)) {
        resp.forEach((episode) => (!episodes.value.has(episode.id) ? episodes.value.set(episode.id, episode) : false));
        return;
      }

      if (!episodes.value.has(resp.id)) {
        episodes.value.set(resp.id, resp);
      }

      return;
    } catch (err) {
      console.error(err);
    }
  }

  function createEpisodeIdsFromCharacters(characters: Character[]) {
    if (characters.length === 0) return [];

    const setIds = new Set(characters.map(({ episode }) => findEpisodeIdFromEpisodeUrl(episode[0])));

    return Array.from(setIds).filter((id) => id !== null && !Number.isNaN(id)) as number[];
  }

  function findEpisodeIdFromEpisodeUrl(url: string) {
    const result = Number(url.split('/').pop());

    return Number.isNaN(result) ? null : result;
  }

  return {
    fetchEpisode,
    createEpisodeIdsFromCharacters,
    findEpisodeIdFromEpisodeUrl,
    episodes,
  };
});
