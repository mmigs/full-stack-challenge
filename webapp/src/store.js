import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import app from "./reducers/appReducer";

export default createStore(
  combineReducers({
    app
  }),
  {},
  applyMiddleware(logger, thunk, promise())
);
