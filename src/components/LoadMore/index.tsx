import { LinearProgress, Stack } from "@mui/material"
import React from "react"

export default function LoadMore() {
  return (
    <Stack spacing={1}>
      <LinearProgress color="success" />
      <LinearProgress color="success" />
      <LinearProgress color="success" />
      <LinearProgress color="success" />
    </Stack>
  )
}
