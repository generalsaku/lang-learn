<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  padding: 16px 32px 16px 32px;
  width: 100%;
}
</style>
