import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import App from './App.vue'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({ payload: 'removeLoading' }, '*')

    // Use contextBridge
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      console.log(message)
    })
  })
