import { LinearProgress, Stack } from "@mui/material"
import React from "react"

export default function LoadMore() {
  return (
    <Stack
      sx={{ p: 2, borderRadius: "15px", bgcolor: "background.paper" }}
      spacing={1}
    >
      <LinearProgress color="success" />
      <LinearProgress color="success" />
      <LinearProgress color="success" />
      <LinearProgress color="success" />
    </Stack>
  )
}
