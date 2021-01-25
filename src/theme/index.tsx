import React, { createContext, useState, ReactNode } from "react"

export interface Themes {
  [themeName: string]: Theme
}

export interface Theme {
  color?: Colors
}

export interface Colors {
  primary: {
    main: string
    light: string
    dark: string
  }
  secondary: {
    main: string
    light: string
    dark: string
  }
  error: {
    main: string
    light: string
    dark: string
  }
  warning: {
    main: string
    light: string
    dark: string
  }
  info: {
    main: string
    light: string
    dark: string
  }
  success: {
    main: string
    light: string
    dark: string
  }
}

export type ColorType = keyof Colors

interface ThemeProviderProps {
  children: ReactNode
  themes: Themes
}

interface ThemeContextDefaultValue {
  theme: Theme
  themeName: keyof Themes
  setThemeName: (theme: keyof Themes) => void
}

export const ThemeContext = createContext<ThemeContextDefaultValue>({
  theme: {},
  themeName: "Dark",
  setThemeName: () => {}
})
ThemeContext.displayName = "Theme"

const ThemeProvider = (props: ThemeProviderProps) => {
  const [themeName, setThemeName] = useState<keyof Themes>("default")

  return (
    <ThemeContext.Provider
      value={{
        theme: props.themes[themeName],
        themeName,
        setThemeName
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
