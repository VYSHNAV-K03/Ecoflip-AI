import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update service worker
      devOptions: {
        enabled: true, // Enable PWA in development
      },
      manifest: {
        name: 'MiniMall',
        short_name: 'MiniMall',
        description: 'A Progressive Web App for MiniMall',
        theme_color: '#00B98E', // Matches your preferred theme color
        background_color: '#EFFDF5', // Matches your preferred background color
        display: 'standalone', // Ensures the app works like a native app
        start_url: '/', // The app's starting URL
        icons: [
          {
            src: '/logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist', // Ensure the output folder matches Capacitor's default
  },
});
