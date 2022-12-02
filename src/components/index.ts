import { App } from 'vue'
import chooseArea from './chooseArea/index'
import chooseIcon from './chooseIcon/index'
import trend from './trend/index'
const components = [chooseArea, chooseIcon, trend]

export default {
  install(app: App) {
    components.forEach(component => {
      app.use(component)
    })
  }
}