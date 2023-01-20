import { ThemeProvider } from "@mui/material"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import dark from "../theme/dark"
import light from "../theme/light"
import { useDispatch, } from "react-redux"
import { setMainUserAppTheme } from "../features/users/userSlice"

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
  const dispatch = useDispatch()

  const handleChangeThemeApp = () => {
    setCurrentThemeName(currentThemeName === DARK ? LIGHT : DARK)
    setCurrentTheme(currentThemeName === DARK ? light : dark)
    dispatch(setMainUserAppTheme(currentThemeName === DARK ? LIGHT : DARK))
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
