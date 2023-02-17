import React from "react"

// Third-party dependencies
import { Stack, Typography, Box, IconButton, Tooltip, CardMedia, CardContent, } from "@mui/material"
import Download from "@mui/icons-material/Download"

// Current project dependencies
import { downloadAndSaveImage } from "../../../utils/basic"
import cardStyles from "../../../styles/components/cards"
import postCardText from "../../../lang/en/components/postCard"
import { ICP } from "interface/post"

export default function ContentPost(props: ICP) {
  const {
    title = "",
    content = "",
    postImages = [],
    username = ""
  } = props

  return (
    <>
      <CardContent sx={{ px: 0 }}>
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
      </CardContent>

      <Stack spacing={2}>
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
                <Tooltip title={postCardText.downloadImageTooltip} arrow>
                  <IconButton
                    color="info"
                    sx={{ position: "absolute", botton: 0, right: 0, }}
                    onClick={() => downloadAndSaveImage(postImage)}
                  >
                    <Download />
                  </IconButton>
                </Tooltip>

                <CardMedia
                  component="img"
                  image={postImage}
                  alt={postCardText.postAltImage.replace("%username", username)}
                  sx={{ borderRadius: "15px" }}
                />
              </Box>
            )
          })
        }
      </Stack>
    </>
  )
}
