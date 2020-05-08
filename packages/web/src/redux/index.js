import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reducer from "./reducer";
import { isProduction } from "../utils/functions";

const defaultMiddleware = getDefaultMiddleware({ serializableCheck: false });
const middleware = isProduction()
  ? [...defaultMiddleware]
  : [...defaultMiddleware, logger];

export default configureStore({
  reducer,
  middleware,
  devTools: !isProduction()
});
