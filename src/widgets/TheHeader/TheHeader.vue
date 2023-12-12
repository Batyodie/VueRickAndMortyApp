<script lang="ts" setup>
import HeaderIcon from '@/shared/icons/header-icon.svg';
</script>

<template>
  <header class="header">
    <nav class="header--menu">
      <a aria-current="page" aria-label="api page" href="https://rickandmortyapi.com/">
        <HeaderIcon class="header-icon" />
      </a>

      <ul class="header--list">
        <li class="header--list-item">
          <a aria-current="page" aria-label="docs api page" href="https://rickandmortyapi.com/"> Docs </a>
        </li>
        <li class="header--list-item">
          <a aria-current="page" aria-label="author github page" href="https://github.com/Batyodie"> Github </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  flex: 0 0 auto;

  &-icon {
    fill: rgb(51, 51, 51);
    width: 40px;
    height: 40px;
  }

  &--inner {
    display: flex;
    justify-content: space-between;
  }

  &--menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    min-height: 60px;
  }

  &--list {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  &--list-item {
    list-style: none;
    margin-right: 20px;

    & a {
      text-decoration: none;
      font-weight: 700;
      font-size: 18px;
      color: var(--color-black-3);
      transition: all 0.1s ease 0s;

      &:hover {
        color: var(--color-orange);
      }
    }
  }
}
</style>
