import React, { createContext, ReactNode, useState } from "react"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { Slide, SlideProps } from "@mui/material"

interface messageContextInterface {
  handleMessage: (message: string) => void
}

export const messageContext = createContext<messageContextInterface>({
  handleMessage: () => console.log("🚀 ~ file: MessageContext.tsx:12 ~ handleMessage is not defined")
})

interface Props {
  children: ReactNode
}

type TransitionProps = Omit<SlideProps, "direction">

export const MessageProvider = (props: Props) => {
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)
  // const [messageOrigin, setMessageOrigin] = useState("up")

  const handleMessage = (message: string) => {
    setMessage(message)
    setOpen(true)

    setTimeout(() => { setOpen(false) }, 5000)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <>
      <messageContext.Provider
        value={{ handleMessage }}
      >
        {props.children}
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={message}
          action={action}
          color="background.paper"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          TransitionComponent={TransitionUp}
          sx={{
            ".MuiSnackbar-root": {
              borderRadius: "30px",
            }
          }}
        />
      </messageContext.Provider>
    </>
  )
}
