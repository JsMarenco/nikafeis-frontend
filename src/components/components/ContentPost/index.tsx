import React from "react"
import { Stack, Typography, Box, IconButton, Tooltip, } from "@mui/material"
import { ContentPostInterface } from "../../../interface/post"
import { downloadAndSaveImage } from "../../../utils/basic"
import Download from "@mui/icons-material/Download"

export default function ContentPost(props: ContentPostInterface) {
  const {
    title = "",
    content = "",
    postImages = [],
  } = props

  return (
    <Stack spacing={2}>
      <Typography
        variant="subtitle1"
        color="text.primary"
      >
        {title}
      </Typography>

      <Typography
        variant="caption"
        color="text.primary"
      >
        {content}
      </Typography>

      {
        postImages.map((postImage, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
                position: "relative"
              }}
            >
              <img
                src={postImage}
                alt={"This is a post in nikafeis"}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "15px"
                }}
              />

              <Tooltip title="Download the image" arrow>
                <IconButton
                  color="info"
                  sx={{ position: "absolute", botton: 0, right: 0, }}
                  onClick={() => downloadAndSaveImage(postImage)}
                >
                  <Download />
                </IconButton>
              </Tooltip>
            </Box>
          )
        })
      }
    </Stack>
  )
}
