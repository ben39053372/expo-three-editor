import React, { createContext, useState, ReactNode, useEffect } from "react"
import { LightTheme } from "./themes"

export const ThemeContext = createContext({})
ThemeContext.displayName = "Theme"

interface theme {}

interface ThemeProviderProps {
  children: ReactNode
  theme: theme
}

const ThemeProvider = (props: ThemeProviderProps) => {
  useEffect(() => {
    setTheme(props.theme)
  }, [props.theme])
  const [theme, setTheme] = useState<theme>()
  return (
    <ThemeContext.Provider value={theme || LightTheme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
