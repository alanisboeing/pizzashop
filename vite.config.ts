import { defineConfig } from 'vite'
import path from "node:path"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  //permite que as importações iniciem com @
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
