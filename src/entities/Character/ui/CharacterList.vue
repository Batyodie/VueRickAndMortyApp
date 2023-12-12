<script lang="ts" setup>
import { Character } from 'rickmortyapi';
import CharacterCard from './CharacterCard.vue';

export interface CharacterListProps {
  characters: Character[];
  isLoaded: boolean;
}

const props = defineProps<CharacterListProps>();
</script>

<template>
  <div class="r-character-list">
    <p v-if="props.characters.length === 0 && !props.isLoaded" class="not-found-title">
      No character information found
    </p>

    <CharacterCard v-for="character of props.characters" :key="character.id" :character="character" />
  </div>
</template>

<style lang="scss" scoped>
.r-character-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
}

.not-found-title {
  color: var(--color-gray-1);
  font-size: 4rem;
}
</style>
