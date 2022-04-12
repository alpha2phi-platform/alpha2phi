import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include:['**/*.{test,vit}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'] 
  },
});
