// Redux
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import * as Reducers from "../reducers";

export default class Store {
  static create() {
    const composeEnhancers =
      typeof window === "object" &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
    return createStore(
      combineReducers(Reducers),
      composeEnhancers(applyMiddleware(thunk)),
    );
  }
}
