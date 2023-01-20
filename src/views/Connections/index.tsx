import React from "react"
import { Box, Divider, } from "@mui/material"
import FriendRequestReceive from "../../components/FriendRequestReceive"
import ConnectionsList from "../../components/ConnectionsList"

export default function Connections() {
  return (
    <>

      <Box sx={{ pb: 5 }}>
        <FriendRequestReceive />

        <Divider orientation="horizontal" flexItem sx={{ m: 2 }} />

        <ConnectionsList />
      </Box>
    </>
  )
}
