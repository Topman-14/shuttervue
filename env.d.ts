/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_UNSPLASH_ACCESS_KEY: string
  // Add more environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
