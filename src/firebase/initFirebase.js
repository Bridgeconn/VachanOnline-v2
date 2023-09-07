import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig";
import "firebase/compat/auth";
import "firebase/compat/database";

let firebaseInstance;
export default function initFirebase(initialState, history) {
  if (firebaseInstance) {
    return firebaseInstance;
  }
  // Initialize firebase instance if it doesn't already exist
  if (!firebaseInstance) {
    // Initialize Firebase instance
    firebase.initializeApp(firebaseConfig);
    firebaseInstance = firebase;
  }

  return firebaseInstance;
}
