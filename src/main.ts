import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Global error handler for unhandled errors
window.addEventListener('error', event => {
  console.error('Unhandled error:', event.error)
})

// Use Pinia and the router in the app
app.use(createPinia())
app.use(router)

// Mount the app
app.mount('#app')
