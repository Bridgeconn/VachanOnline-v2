import axios from "axios";
export default axios.create({
  baseURL: "https://api.vachanonline.net/v1",
  timeout: 15000
});
