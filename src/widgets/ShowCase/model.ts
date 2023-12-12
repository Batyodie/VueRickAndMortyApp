import { useCharacterStore } from '@/entities/Character';
import { SubmitStatusEvent, SubmitGenderEvent } from '@/entities/Character/ui/CharacterFilter.vue';
import { Character } from 'rickmortyapi';

export function useShowCase() {
  const currentStatus: Ref<Character['status'] | null> = ref(null);
  const currentGender: Ref<Character['gender'] | null> = ref(null);
  const route = useRoute();

  const { getCharacters, updatePage, character, resetCharacters, initCharacters } = useCharacterStore();

  async function handleChangeFilter(status: SubmitStatusEvent, gender: SubmitGenderEvent) {
    const isResetPage = character.page > 1 && (status !== currentStatus.value || gender !== currentGender.value);

    const filters = {
      ...(status && {
        status,
      }),
      ...(gender && {
        gender,
      }),
      ...(isResetPage && {
        page: 1,
      }),
      ...(!isResetPage &&
        character.page > 1 && {
          page: character.page,
        }),
    };

    await getCharacters(filters);

    if (!character.isError) {
      if (filters.status) currentStatus.value = filters.status;
      if (filters.gender) currentGender.value = filters.gender;
    }
  }

  async function handleResetFilter() {
    await resetCharacters();

    if (!character.isError) {
      currentStatus.value = null;
      currentGender.value = null;
    }
  }

  async function handleChangePage(page: number) {
    const params = {
      ...(currentStatus.value && {
        status: currentStatus.value,
      }),
      ...(currentGender.value && {
        gender: currentGender.value,
      }),
    };

    await updatePage(page, params);
  }

  function initBaseUrlQuery() {
    const page = Number(route.query['page']);
    const status = route.query['status'];
    const gender = route.query['gender'];

    const query = {
      ...(page && {
        page,
      }),
      ...(status && {
        status: status as Character['status'],
      }),
      ...(gender && {
        gender: gender as Character['gender'],
      }),
    };

    if (query.page) character.page = query.page;

    initCharacters(query).then(() => {
      if (!character.isError) {
        currentStatus.value = query.status || null;
        currentGender.value = query.gender || null;
      }
    });
  }

  return {
    character,
    currentStatus,
    currentGender,
    handleChangeFilter,
    handleResetFilter,
    handleChangePage,
    initBaseUrlQuery,
  };
}
