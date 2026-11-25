import { defineConfig } from "vite"

const src = new URL("../src/index.ts", import.meta.url)

export default defineConfig({
  base: "./",
  resolve: {
    alias: { "react-rails-form-helpers": decodeURIComponent(src.pathname) },
  },
})
