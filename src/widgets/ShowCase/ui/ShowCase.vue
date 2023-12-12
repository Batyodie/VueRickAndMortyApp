<script lang="ts" setup>
import { validateHandler } from '@/app/providers/router/queryValidator';
import { CharacterList, CharacterFilter, CharacterMore } from '@/entities/Character/';
import ScrollPanel from 'primevue/scrollpanel';
import ScrollTop from 'primevue/scrolltop';

import { useShowCase } from '../model';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const {
  character,
  currentStatus,
  currentGender,
  initBaseUrlQuery,
  handleChangeFilter,
  handleChangePage,
  handleResetFilter,
} = useShowCase();

const toast = useToast();

watch(
  () => character.isError,
  (newVal) => {
    if (newVal) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: character.messageError || 'Wrong error...',
        life: 5000,
      });
    }
  },
);

onBeforeMount(initBaseUrlQuery);
onBeforeRouteUpdate((to, from, next) => validateHandler(to, from, next));
</script>

<template>
  <section class="show-case">
    <div class="show-case--wrapper">
      <CharacterFilter
        :currentStatus="currentStatus"
        :currentGender="currentGender"
        :isLoading="character.isFetching"
        :page="character.page"
        @changeFilter="handleChangeFilter"
        @resetFilter="handleResetFilter"
      />

      <ScrollPanel class="show-case-content">
        <CharacterMore
          :page="character.page"
          :isLoading="character.isFetching"
          :hasNextPage="Boolean(character.characterInfo?.next)"
          @changePage="handleChangePage"
        >
          <CharacterList
            :isLoaded="character.isFetching"
            :isError="character.isError"
            :characters="character.characters"
          />
        </CharacterMore>

        <ScrollTop />
      </ScrollPanel>

      <Toast />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.show-case {
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 400px;
  padding: 4.5rem 0;
  background-color: var(--color-black);

  &--wrapper {
    max-width: 1900px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 60px;
  }
}

.show-case-content {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

@include phone-only {
  .show-case {
    padding: 1.5rem;
  }
}

@include phone-small-only {
  .show-case {
    padding: 0.75rem;
  }
}
</style>
