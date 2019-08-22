import axios from "axios";
export default axios.create({
  baseURL: "https://stagingapi.autographamt.com/v1/",
  timeout: 5000
});
