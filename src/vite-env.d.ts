/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ACCUWEATHER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
