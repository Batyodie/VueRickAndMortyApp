<script lang="ts" setup>
import { HeroWrapper } from '@/shared/ui/';

import { ShowCase } from '@/widgets/ShowCase/';
</script>

<template>
  <div class="r-main-page">
    <HeroWrapper />
    <ShowCase />
  </div>
</template>

<style lang="scss" scoped>
.r-main-page {
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
