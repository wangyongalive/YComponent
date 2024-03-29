import { App } from "vue";
import chooseArea from "./chooseArea/index";
import chooseIcon from "./chooseIcon/index";
import chooseIcon2 from "./chooseIcon2/index";
import trend from "./trend/index";
import notification from "./notification/index";
import list from "./list/index";
import menu from "./menu/index";
import progress from "./progress/index";
import chooseTime from "./chooseTime/index";
import chooseDate from "./chooseDate/index";
import chooseCity from "./chooseCity/index";
import form from "./form/index";
import modalForm from "./modalForm/index";
import table from "./table/index";
import "./styles/base.scss";
import "./styles/ui.scss";

const components = [
  chooseArea,
  chooseIcon2,
  chooseIcon,
  trend,
  notification,
  list,
  menu,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
  form,
  modalForm,
  table,
];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
export {
  chooseArea,
  chooseIcon2,
  chooseIcon,
  trend,
  notification,
  list,
  menu,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
  form,
  modalForm,
  table,
};
