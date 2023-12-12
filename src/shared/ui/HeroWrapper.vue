<template>
  <section class="r-hero">
    <h1 class="title">The Rick and Morty Vue Test App</h1>
  </section>
</template>

<style lang="scss" scoped>
.r-hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(50vh - 60px);
  text-align: center;
}

.title {
  position: relative;
  margin: 0px;
  color: var(--color-black-2);
  border: none;
  font-weight: 900;
  font-size: 5.625rem;
}

@include mobile-only {
  .title {
    font-size: 3.75rem;
  }
}

@include phone-small-only {
  .r-hero {
    padding: 0px 1.25rem;
  }
  .title {
    font-size: 2.125rem;
  }
}
</style>
