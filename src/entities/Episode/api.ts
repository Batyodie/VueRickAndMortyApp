import { getEpisode } from 'rickmortyapi';

export async function useGetEpisode(id: number | number[]) {
  const resp = await getEpisode(id);

  if (resp && resp.data) {
    return resp.data;
  }

  throw new Error('Error to fetch episode, not found data');
}
