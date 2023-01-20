import React, { ReactNode, useContext, useEffect } from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "../app/store"
import { RECONNECTED_MESSAGE, LOST_CONNECTION_MESSAGE } from "../constants/messages"
import IsAuthenticated from "./IsAuthenticated"
import { messageContext } from "./MessageContext"
import { ThemeContextProvider } from "./ThemeContext"

interface GlobalComponentProps {
  children: ReactNode
}

export default function GlobalComponent(props: GlobalComponentProps) {
  const { handleMessage } = useContext(messageContext)

  useEffect(() => {
    function handleConnectionChange() {
      if (navigator.onLine) {
        handleMessage(RECONNECTED_MESSAGE)
      } else {
        handleMessage(LOST_CONNECTION_MESSAGE)
      }
    }

    window.addEventListener("online", handleConnectionChange)
    window.addEventListener("offline", handleConnectionChange)

    return () => {
      window.removeEventListener("online", handleConnectionChange)
      window.removeEventListener("offline", handleConnectionChange)
    }
  }, [])

  return (
    <>
      <Provider store={store}>
        <ThemeContextProvider>
          <BrowserRouter>
            <IsAuthenticated>
              {props.children}
            </IsAuthenticated>
          </BrowserRouter>
        </ThemeContextProvider>
      </Provider>
    </>
  )
}
