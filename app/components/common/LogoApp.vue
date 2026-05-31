<template>
  <a class="brand" href="#top" aria-label="Radiology App — главная">
    <CommonSvgLogo />
    <span class="brand-name">Radiology App</span>
  </a>
</template>

<style scoped>
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 700;
  letter-spacing: -0.04em;
}
.brand-name {
  font-size: var(--text-sm);
  font-weight: 700;
  font-family: var(--font-display);
}
</style>
