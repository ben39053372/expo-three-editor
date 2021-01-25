import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import counter from "./count"

const reducer = {
  counter
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production"
})

export default store
