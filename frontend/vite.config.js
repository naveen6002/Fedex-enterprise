import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Keep 3000 so it matches backend CORS (and common CRA port)
    port: 3000
  }
});

