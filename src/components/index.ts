import { App } from 'vue'
import chooseArea from './chooseArea/index'
import chooseIcon from './chooseIcon/index'
import trend from './trend/index'
import notification from './notification/index'
import list from './list/index'
import menu from './menu/index'
import progress from './progress/index'
import chooseTime from './chooseTime/index'
import chooseDate from './chooseDate/index'
const components = [chooseArea, chooseIcon, trend, notification, list, menu, progress, chooseTime, chooseDate]

export default {
  install(app: App) {
    components.forEach(component => {
      app.use(component)
    })
  }
}