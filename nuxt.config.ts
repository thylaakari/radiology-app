export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  ssr: false,
  ui: {
    fonts: false,
  },
  vite: {
    optimizeDeps: {
      include: [
        '@internationalized/date',
        '@tanstack/vue-table',
        '@tauri-apps/api/webviewWindow',
        '@tauri-apps/api/window',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'dexie',
        'zod',
      ],
    },
  },
})
