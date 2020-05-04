import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { getFirebase, firebaseReducer } from "react-redux-firebase";
import reducer from "../store/reducer";

export default function configureStore(initialState, history) {
  //Combine the local reducer with firebase
  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    local: reducer,
  });
  const middleware = [thunk.withExtraArgument({ getFirebase })];
  const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

  return store;
}
