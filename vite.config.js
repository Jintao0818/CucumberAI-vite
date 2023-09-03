import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  VarletUIResolver,
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VarletUIResolver(),
        AntDesignVueResolver({ resolveIcons: true })
      ]
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        { '@/stores': ['settingStore', 'dataStore'] }
      ],
      resolvers: [VarletUIResolver(), AntDesignVueResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
