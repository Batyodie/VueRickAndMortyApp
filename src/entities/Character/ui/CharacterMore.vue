<script lang="ts" setup>
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/ProgressSpinner';

export interface CharacterPaginatorProps {
  page: number;
  hasNextPage: boolean;
  isLoading: boolean;
}

const props = withDefaults(defineProps<CharacterPaginatorProps>(), {
  page: 1,
  hasNextPage: false,
  isLoading: false,
});

const emit = defineEmits<{
  changePage: [page: number];
}>();

const arrayMods = computed(() => ({
  'r-character-more--loading': props.isLoading,
}));

const isDisabledMoreBtn = computed(() => {
  return props.isLoading;
});

function handleChangePage() {
  emit('changePage', props.page + 1);
}
</script>

<template>
  <div class="r-character-more" :class="arrayMods">
    <div v-if="isLoading" class="progress-spinner">
      <ProgressSpinner />
    </div>
    <slot></slot>

    <Button
      v-if="props.hasNextPage"
      :loading="isLoading"
      :disabled="isDisabledMoreBtn"
      label="Show more"
      severity="secondary"
      class="more-btn"
      @click="handleChangePage"
    />
  </div>
</template>

<style lang="scss" scoped>
.r-character-more {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;

  &--loading {
    opacity: 0.4;
    pointer-events: none;
  }
}

.progress-spinner {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
}

.more-btn {
  width: 13rem;
}
</style>
