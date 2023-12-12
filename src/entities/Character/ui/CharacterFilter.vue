<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { Character } from 'rickmortyapi';

interface CharacterFilterProps {
  currentStatus: Character['status'] | null;
  currentGender: Character['gender'] | null;
  page: number;
  isLoading: boolean;
}
type ModelStatus = Record<'name', Character['status']>;
type ModelGender = Record<'name', Character['gender']>;
export type SubmitStatusEvent = Character['status'] | undefined;
export type SubmitGenderEvent = Character['gender'] | undefined;

const props = defineProps<CharacterFilterProps>();
const emit = defineEmits<{
  changeFilter: [status: SubmitStatusEvent, gender: SubmitGenderEvent];
  resetFilter: [];
}>();

const statuses: ModelStatus[] = [{ name: 'Dead' }, { name: 'Alive' }, { name: 'unknown' }];
const genders: ModelGender[] = [{ name: 'Female' }, { name: 'Male' }, { name: 'Genderless' }, { name: 'unknown' }];
const selectedStatus = ref(props.currentStatus ? { name: props.currentStatus } : null);
const selectedGender = ref(props.currentGender ? { name: props.currentGender } : null);

const handleSubmit = () => {
  emit('changeFilter', selectedStatus.value?.name, selectedGender.value?.name);
};

const resetFilter = () => {
  emit('resetFilter');
};

const isDisabledResetBtn = computed(() => {
  return props.isLoading || (props.page === 1 && props.currentStatus === null && props.currentGender === null);
});

const isDisabledMoreBtn = computed(() => {
  return (
    props.isLoading ||
    (props.currentStatus === selectedStatus.value?.name && props.currentGender === selectedGender.value?.name)
  );
});

watch(
  () => props.currentStatus,
  (newVal) => {
    if (newVal === null) {
      selectedStatus.value = null;
    } else if (newVal !== selectedStatus.value?.name) {
      selectedStatus.value = { name: newVal };
    }
  },
);

watch(
  () => props.currentGender,
  (newVal) => {
    if (newVal === null) {
      selectedGender.value = null;
    } else if (newVal !== selectedGender.value?.name) {
      selectedGender.value = { name: newVal };
    }
  },
);
</script>

<template>
  <div class="r-character-filter">
    <Dropdown
      v-model="selectedStatus"
      :options="statuses"
      :disabled="isLoading"
      optionLabel="name"
      placeholder="Select a status character"
      class="status-dropdown"
    />

    <Dropdown
      v-model="selectedGender"
      :options="genders"
      :disabled="isLoading"
      optionLabel="name"
      placeholder="Select a gender character"
      class="status-dropdown"
    />

    <Button class="btn" label="Saved" severity="secondary" :disabled="isDisabledMoreBtn" @click="handleSubmit" />

    <Button class="btn" label="Reset" severity="secondary" :disabled="isDisabledResetBtn" @click="resetFilter" />
  </div>
</template>

<style lang="scss" scoped>
.r-character-filter {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  justify-content: center;
}

.status-dropdown {
  width: 20rem;
}

.btn {
  width: 10rem;
}

@include tablet-landscape-only {
  .r-character-filter {
    gap: 40px;
  }
}

@include tablet-only {
  .r-character-filter {
    gap: 30px;
  }
}

@include phone-only {
  .r-character-filter {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .btn {
    width: 100%;
  }

  .status-dropdown {
    width: 100%;
  }
}
</style>
