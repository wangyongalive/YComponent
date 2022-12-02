import { App } from 'vue'
import chooseArea from './chooseArea/index'
import chooseIcon from './chooseIcon/index'
const components = [chooseArea, chooseIcon]

export default {
  install(app: App) {
    components.forEach(component => {
      app.use(component)
    })
  }
}