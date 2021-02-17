import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import counterReducer from "./count"
import appStateReducer from "./appState"

const reducer = {
  counterReducer,
  appStateReducer
}

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production"
})
