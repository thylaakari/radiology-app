export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Syne:wght@700;800&display=swap',
        },
      ],
    },
  },
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
        'lucide',
        'zod',
      ],
    },
  },
})
