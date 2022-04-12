/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL: string
  readonly VITE_GRAPHQL_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}