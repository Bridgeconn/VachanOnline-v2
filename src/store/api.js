import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000/v1/";
export const API = axios.create({ baseURL: baseURL, timeout: 15000 });
export const readingPlanAPI = axios.create({
  baseURL: process.env.REACT_APP_BIBLE_PLANS_URL,
});
export const signBibleAPI = axios.create({
  baseURL: process.env.REACT_APP_SIGNBIBLE_URL,
});
export const chapterVideoAPI = axios.create({
  baseURL: process.env.REACT_APP_CHAPTER_VIDEOS,
});
export const languageDataAPI = axios.create({
  baseURL: process.env.REACT_APP_LANGUAGE_DATA,
});
export const obsDataAPI = axios.create({
  baseURL: process.env.REACT_APP_BIBLE_STORIES_URL,
});
export const CancelToken = axios.CancelToken;
