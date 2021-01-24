import "reflect-metadata"
import registerRootComponent from "expo/build/launch/registerRootComponent"
// eslint-disable-next-line no-unused-vars
import { debugContextDevtool } from "react-context-devtool"

import App from "./src/App"

registerRootComponent(App)

debugContextDevtool(document.getElementById("root"), {})
