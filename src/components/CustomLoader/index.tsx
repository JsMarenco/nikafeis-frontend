import React from "react"
import { Box, CircularProgress, Typography } from "@mui/material"

export default function CustomLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "0 auto",
        height: "100%"
      }}
    >
      <CircularProgress size={50} />

      <Typography
        variant="h6"
        color="text.primary"
        mt={2}
      >
        Please wait while we process your request...
      </Typography>
    </Box>

  )
}
