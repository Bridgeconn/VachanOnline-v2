import axios from "axios";
export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000/v1/",
  timeout: 15000
});
