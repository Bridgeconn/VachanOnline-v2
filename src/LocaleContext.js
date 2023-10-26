import { createContext } from "react";

const defaultValue = {
  locale: "en",
  setLocale: () => {},
};

export default createContext(defaultValue);
