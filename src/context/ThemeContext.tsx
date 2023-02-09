import React, { createContext, ReactNode, useEffect, useState } from "react"

// Third-party dependencies
import { ThemeProvider } from "@mui/material"

// Current project dependencies
import dark from "../theme/dark"
import light from "../theme/light"
import { saveInLocalStorage } from "../utils/basic"

interface Props {
  children: ReactNode
}

export const DARK = "Dark theme"
export const LIGHT = "Light theme"

interface AppThemeContextInterface {
  handleChangeThemeApp: () => void,
  currentThemeName: string
}

export const appThemeContext = createContext<AppThemeContextInterface>({} as AppThemeContextInterface)

export const ThemeContextProvider = (props: Props) => {
  const [currentThemeName, setCurrentThemeName] = useState(DARK)
  const [currentTheme, setCurrentTheme] = useState(dark)

  /**
   * Change the app theme
   * @default Dark theme
   */
  const handleChangeThemeApp = () => {
    setCurrentThemeName(currentThemeName === DARK ? LIGHT : DARK)
    setCurrentTheme(currentThemeName === DARK ? light : dark)

    saveInLocalStorage("theme", currentThemeName === DARK ? LIGHT : DARK)
  }

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.palette.background.default
  }, [currentTheme])

  return (
    <appThemeContext.Provider
      value={{
        currentThemeName,
        handleChangeThemeApp
      }}
    >
      <ThemeProvider theme={currentTheme}>
        {props.children}
      </ThemeProvider>
    </appThemeContext.Provider>
  )
}
