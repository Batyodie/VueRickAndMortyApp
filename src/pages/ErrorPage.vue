<script lang="ts" setup>
import { HeroWrapper } from '@/shared/ui/';

export interface ErrorPageProps {
  errorMessage: string;
}

const props = withDefaults(defineProps<ErrorPageProps>(), {
  errorMessage: '',
});
</script>

<template>
  <div class="r-error-page">
    <HeroWrapper />

    <section class="section-error">
      <h1>Error</h1>
      <p>{{ props.errorMessage }}</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.r-error-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-error {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 400px;
  padding: 4.5rem 0;
  background-color: var(--color-black);
  color: var(--color-white);
}
</style>
