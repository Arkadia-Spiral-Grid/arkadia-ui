// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Ensure path is imported

// ESM equivalent of __dirname and __filename
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Correctly resolve aliases using the ESM-compatible __dirname
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  // If you have a server proxy or other server options, include them here
  server: {
    proxy: {
      // Example proxy if your frontend needs to talk to a backend server
      // '/api': {
      //   target: 'http://localhost:3001', // Your backend server URL
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
    },
    // Explicitly configure HMR to prevent "getaddrinfo ENOTFOUND ."
    hmr: {
      protocol: 'ws', // Use 'ws' for unencrypted WebSocket for local dev
      host: 'localhost', // Or '127.0.0.1' if 'localhost' doesn't resolve in Termux
      port: 5173, // Ensure this matches your server.port
    },
    // Ensure your server starts on a specific port for Termux access
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173, // Or your preferred port
  },
});
