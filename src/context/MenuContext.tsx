import React, { createContext, ReactNode, useState } from "react"

interface MenuContextInterface {
  open: boolean
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void
}

export const MenuContext = createContext<MenuContextInterface>({} as MenuContextInterface)

interface Props {
  children: ReactNode
}

export const MenuContextProvider = (props: Props) => {
  const [open, setOpen] = useState(false)

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <MenuContext.Provider
      value={{ open, handleClose }}
    >
      {props.children}
    </MenuContext.Provider>
  )
}
