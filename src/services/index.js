import axios from "axios"
import appData from "./appData"
const services = ((axios) => {
  return {
    appData: appData(axios),
  }
})(axios)
export default services
