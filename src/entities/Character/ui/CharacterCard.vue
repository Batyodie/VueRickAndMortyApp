<script lang="ts" setup>
import { useEpisodeStore } from '@/entities/Episode/model';
import { BaseCard } from '@/shared/ui/';
import type { Character } from 'rickmortyapi';

export interface BaseCardProps {
  character: Character;
}

const props = defineProps<BaseCardProps>();

const { image, name, location, status, species, gender } = props.character;
const { episodes, findEpisodeIdFromEpisodeUrl } = useEpisodeStore();

const statusIcon = computed(() => ({
  'status-icon--dead': status === 'Dead',
  'status-icon--alive': status === 'Alive',
  'status-icon--unknown': status === 'unknown',
}));
const firstEpisodeId = computed(() =>
  props.character.episode[0] ? findEpisodeIdFromEpisodeUrl(props.character.episode[0]) : null,
);
const episodeInfo = computed(() => episodes.get(firstEpisodeId.value ?? 0));
</script>

<template>
  <BaseCard v-if="character" data-testid="character-card" class="r-character-card">
    <template v-if="image" #card-image>
      <img class="char-image" :src="image" />
    </template>

    <template v-if="name" #char-name>
      <a :href="character.url" class="link" rel="noopener noreferrer" target="_blank">
        <h2>{{ name }}</h2>
      </a>
    </template>

    <template v-if="episodeInfo" #episode>
      <span class="description">First seen in:</span>
      <div class="episode-info">
        <a :href="episodeInfo.url" rel="noopener noreferrer" class="link"> {{ episodeInfo.name }} </a>
        <p>{{ episodeInfo.air_date }}</p>
        <p>{{ episodeInfo.episode }}</p>
      </div>
    </template>

    <template v-if="location" #location>
      <span class="description">Last known location:</span>
      <a :href="location.url" class="link" rel="noopener noreferrer" target="_blank">
        <p>{{ location.name }}</p>
      </a>
    </template>

    <template #info>
      <div data-testid="info-card" class="info">
        <span v-if="status" :class="statusIcon" class="status-icon"></span>
        <p>
          <template v-if="status"> {{ status }} - </template>
          <template v-if="species"> {{ species }} - </template>
          <template v-if="gender">{{ gender }}</template>
        </p>
      </div>
    </template>
  </BaseCard>
</template>

<style lang="scss" scoped>
.r-character-card {
  margin: 0;
  & h2 {
    font-size: 1.5rem;
    margin: 0px;
    padding: 0px;
  }

  & p {
    margin: 0;
    padding: 0;
  }
}

.char-image {
  width: 100%;
  height: 100%;
  margin: 0px;
  opacity: 1;
  transition: opacity 0.5s ease 0s;
  object-position: center center;
  object-fit: cover;
}

.link {
  color: var(--color-gray-1);
  text-decoration: none;

  &:hover {
    color: var(--color-orange);
  }
}

.info {
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  text-transform: capitalize;
}

.description {
  color: var(--color-gray-2);
  font-size: 16px;
  font-weight: 500;
}

.status-icon {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  border-radius: 50%;

  &--alive {
    background-color: var(--color-green);
  }

  &--unknown {
    background-color: var(--color-gray-2);
  }

  &--dead {
    background-color: var(--color-red);
  }
}

.episode-info {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
</style>
