import React from "react"
import FriendRequestReceive from "../../components/FriendRequestReceive"
import ConnectionsList from "../../components/ConnectionsList"
import Grid from "@mui/material/Unstable_Grid2"

export default function Connections() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <FriendRequestReceive variant="large" />
        </Grid>

        <Grid xs={12}>
          <ConnectionsList variant="large" />
        </Grid>
      </Grid>
    </>
  )
}
