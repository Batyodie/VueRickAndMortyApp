<script setup lang="ts">
import 'primevue/resources/themes/lara-light-green/theme.css';
import './styles/index.scss';

import { MainLayout } from '@/shared/ui/layouts';

import { TheHeader } from '@/widgets/TheHeader';
import { TheFooter } from '@/widgets/TheFooter';
</script>

<template>
  <MainLayout>
    <template #header>
      <TheHeader />
    </template>

    <template #footer>
      <TheFooter />
    </template>
  </MainLayout>
</template>
