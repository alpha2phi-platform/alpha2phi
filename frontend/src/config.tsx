const config = {
  graphql: {
    REGION: process.env.VITE_REGION,
    URL: process.env.VITE_GRAPHQL_URL,
  },
  cognito: {
    REGION: process.env.VITE_REGION,
    USER_POOL_ID: process.env.VITE_USER_POOL_ID,
    APP_CLIENT_ID: process.env.VITE_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.VITe_IDENTITY_POOL_ID,
  },
};

export default config;
