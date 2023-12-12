<script lang="ts" setup>
import { SingWrapper } from '@/shared/ui/';
</script>

<template>
  <footer class="r-footer">
    <ul class="info-list">
      <li class="info-list--item">
        <a title="characters" href="/api/character">
          <span>characters: 826</span>
        </a>
      </li>
      <li class="info-list--item">
        <a title="locations" href="/api/location">
          <span>locations: 126</span>
        </a>
      </li>

      <li class="info-list--item">
        <a title="episodes" href="/api/episode">
          <span>episodes: 51</span>
        </a>
      </li>
    </ul>

    <SingWrapper class="sing-wrapper" />
  </footer>
</template>

<style lang="scss" scoped>
.r-footer {
  position: relative;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding: 4.5rem 0px;
  min-height: calc(120px);
  width: 100%;
  background-color: var(--color-black-2);
  color: var(--color-gray-2);
}

.info-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin: 0px;
  padding: 0px;
  width: 100%;

  &--item {
    list-style-type: none;
    margin: 0;

    & a {
      text-decoration: none;
      color: var(--color-gray-2);
      border-bottom: none;
      transition: all 0.1s ease 0s;

      &:hover {
        color: var(--color-orange);
      }
    }

    & span {
      font-size: 0.75rem;
      text-transform: uppercase;
      text-align: center;
      font-weight: bold;
    }
  }
}

.sing-wrapper {
  margin-top: 1.25rem;
}
</style>
