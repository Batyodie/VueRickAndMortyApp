<template>
  <slot name="header" />
  <main class="main">
    <router-view />
  </main>
  <slot name="footer" />
  <slot />
</template>

<style lang="scss" scoped>
.main {
  flex: 1 0 auto;
  min-height: calc(40vh - 60px);
}
</style>
