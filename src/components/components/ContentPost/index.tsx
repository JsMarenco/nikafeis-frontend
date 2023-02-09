import React from "react"

// Third-party dependencies
import { Stack, Typography, Box, IconButton, Tooltip, } from "@mui/material"
import Download from "@mui/icons-material/Download"

// Current project dependencies
import { ContentPostInterface } from "../../../interface/post"
import { downloadAndSaveImage } from "../../../utils/basic"
import cardStyles from "../../../styles/components/cards"
import postCardText from "../../../lang/en/components/postCard"

export default function ContentPost(props: ContentPostInterface) {
  const {
    title = "",
    content = "",
    postImages = [],
    username = ""
  } = props

  return (
    <Stack spacing={2}>
      <Typography
        variant="subtitle1"
        color="text.primary"
        sx={cardStyles.title}
      >
        {title}
      </Typography>

      <Typography
        variant="caption"
        color="text.primary"
        sx={cardStyles.text}
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
                alt={postCardText.postAltImage.replace("%username", username)}
              />

              <Tooltip title={postCardText.downloadImageTooltip} arrow>
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
