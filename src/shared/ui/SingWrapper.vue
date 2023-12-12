<template>
  <div class="r-sing-wrapper">
    <span>
      ❮❯ by
      <a class="r-sing-wrapper--link" href="https://github.com/afuh"> Semyon Nemtyrev </a>
    </span>
    <span>2023</span>
  </div>
</template>

<style lang="scss" scoped>
.r-sing-wrapper {
  &--link {
    font-weight: bold;
    transition: color 0.2s ease 0s;
    color: var(--color-gray-1);
    border-bottom: 1px solid var(--color-orange);
    text-decoration: none;
    transition: all 0.1s ease 0s;

    &:hover {
      color: var(--color-orange);
      border-bottom: none;
    }
  }

  & span {
    font-size: 0.75rem;
  }
}
</style>
