import React from "react"
import ConnectionsList from "../../components/ConnectionsList"
import Grid from "@mui/material/Unstable_Grid2"

export default function Connections() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <ConnectionsList variant="large" />
        </Grid>
      </Grid>
    </>
  )
}
