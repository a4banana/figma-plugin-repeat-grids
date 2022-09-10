import { defineConfig } from "vite";
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile";
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  root: "./ui-src",
  plugins: [react({ jsxRuntime: 'classic' }), viteSingleFile(), svgr()],
  resolve: {
    alias: {
      '@': resolve( __dirname, './ui-src' ),
      'components': resolve( __dirname, './ui-src/components' ),
      'utils': resolve( __dirname, './ui-src/utils' ),
      "styles" : resolve( __dirname, './ui-src/styles' ),
      "assets" : resolve( __dirname, './ui-src/assets' )
    }
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: "../dist",
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: () => "everything.js",
      },
    },
  },
});
