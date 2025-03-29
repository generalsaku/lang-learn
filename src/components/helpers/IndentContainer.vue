<template>
  <div class="indent-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.indent-container {
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  padding: 0px 32px 16px 32px;
  width: 100%;
  box-sizing: border-box;

  &.top {
    padding-top: 16px;
  }
}
</style>
