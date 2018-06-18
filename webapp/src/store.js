import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import app from "./reducers/appReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    app
  }),
  {},
  composeEnhancers(applyMiddleware(logger, thunk, promise()))
);
