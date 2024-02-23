import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts/Gautami.ttf";
import "./fonts/GurbaniLipi.ttf";
import "./fonts/Kalinga.ttf";
import "./fonts/Kartika.ttf";
import "./fonts/Kedage.ttf";
import "./fonts/NotoSans.ttf";
import "./fonts/Mukti.ttf";
import "./fonts/Nikosh.ttf";
import "./fonts/NotoSerifDevanagari.ttf";
import "./fonts/NotoSerifMalayalam.ttf";
import "./fonts/NotoSerifTelugu.ttf";
import "./fonts/Raavi.ttf";
import "./fonts/Rekha.ttf";
import "./fonts/BalooBhaina2.ttf";
import "./fonts/Shruti.ttf";
import "./fonts/Tunga.ttf";
import "./fonts/Samarkan.ttf";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/database";
import initFirebase from "./firebase/initFirebase";
import configureStore from "./firebase/store";
import { rrfConfig } from "./firebase/firebaseConfig";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

// Initialize firebase instance
initFirebase();
const store = configureStore({});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rrfConfig}
      dispatch={store.dispatch}
    >
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
