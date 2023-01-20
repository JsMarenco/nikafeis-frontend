import React from "react"
import { Button } from "@mui/material"

interface Props {
  userId: string
  connectionId: string
}

export default function SendFriendRequest(props: Props) {
  return (
    <>
      <Button  color="primary">
        Send request
      </Button>

      <Button  color="primary">
        Delete
      </Button>
    </>
  )
}
