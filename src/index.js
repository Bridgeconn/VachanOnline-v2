import React from "react";
import { render } from "react-dom";
import "./index.css";
import "./fonts/Gautami.ttf";
import "./fonts/GurbaniLipi.ttf";
import "./fonts/Kalinga.ttf";
import "./fonts/Kartika.ttf";
import "./fonts/Kedage.ttf";
import "./fonts/NotoSans.ttf";
import "./fonts/Latha.ttf";
import "./fonts/Mukti.ttf";
import "./fonts/Nikosh.ttf";
import "./fonts/NotoSerifDevanagari.ttf";
import "./fonts/NotoSerifMalayalam.ttf";
import "./fonts/NotoSerifTamil.ttf";
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
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import initFirebase from "./firebase/initFirebase";
import configureStore from "./firebase/store";
import { rrfConfig } from "./firebase/firebaseConfig";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

// Initialize firebase instance
initFirebase();
const store = configureStore({});

render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rrfConfig}
      dispatch={store.dispatch}
    >
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
