import React from "react"
import { Box, Typography } from "@mui/material"

interface Props {
  imgSrc: string,
  text: string
}

export default function NoContent(props: Props) {
  return (
    <Box flexGrow={1} sx={{ width: "90%", mx: "auto", py: 5 }}>
      <Box sx={{ width: "250px", height: "250px", mx: "auto" }}>
        <img
          src={props.imgSrc}
          alt="No content image"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

      <Typography
        variant="h6"
        color="text.primary"
        align="center"
      >
        {props.text}
      </Typography>
    </Box>
  )
}
