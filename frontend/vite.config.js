import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      config(env) {
        dotenv.config({ path: '/.env.local' });
        return {
          // configurações adicionais do Vite...
        };
      },
    },

  ],
  
  
})
