<template>
  <article class="r-base-card">
    <div class="img-wrapper">
      <slot name="card-image"> </slot>
    </div>
    <div class="content-wrapper">
      <div class="section">
        <slot name="char-name"> </slot>
        <slot name="info"></slot>
      </div>
      <div class="section">
        <slot name="location"> </slot>
      </div>
      <div class="section">
        <slot name="episode"> </slot>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.r-base-card {
  width: 600px;
  max-height: 400px;
  display: flex;
  overflow: hidden;
  background: var(--color-black-4);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.img-wrapper {
  flex: 2 1 0%;
  width: 100%;
}

.img {
  width: 100%;
  height: 100%;
  margin: 0px;
  opacity: 1;
  transition: opacity 0.5s ease 0s;
  object-position: center center;
  object-fit: cover;
}

.content-wrapper {
  position: relative;
  flex: 3 1 0%;
  padding: 0.75rem;
  color: var(--color-white);
  display: flex;
  flex-direction: column;
}

.section {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:first-child {
    justify-content: flex-start;
  }
}

@include phone-only {
  .r-base-card {
    flex-direction: column;
    height: initial;
    width: 100%;
    max-height: initial;
  }

  .img {
    height: 300px;
  }

  .content-wrapper {
    pointer-events: none;
    gap: 1.25rem;
  }
}
</style>
