import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000/v1/";
export const API = axios.create({ baseURL: baseURL, timeout: 15000 });
export const CancelToken = axios.CancelToken;
