export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ssr: false,
  ui: {
    fonts: false,
  },
  vite: {
    optimizeDeps: {
      include: [
        '@tanstack/vue-table',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@tauri-apps/api/webviewWindow',
        '@tauri-apps/api/window',
        'zod',
        'dexie',
      ],
    },
  },
})
