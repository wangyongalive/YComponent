import { App } from 'vue'
import modalForm from './src/index.vue'


export default {
  install(app: App) {
    app.component('y-modal-form', modalForm);
  }
}