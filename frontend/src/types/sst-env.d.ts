/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_GRAPHQL_URL: string
  readonly REACT_APP_REGION: string
  readonly REACT_APP_USER_POOL_ID: string
  readonly REACT_APP_IDENTITY_POOL_ID: string
  readonly REACT_APP_USER_POOL_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}