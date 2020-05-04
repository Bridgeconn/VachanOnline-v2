import firebase from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // make sure you add this for firestore

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
