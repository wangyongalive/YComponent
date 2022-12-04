import { App } from 'vue'
import progress from './src/index.vue'

export default {
  install(app: App) {
    app.component('y-progress', progress)
  }
}