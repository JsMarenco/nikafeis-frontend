import React from "react"
import { Download } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { downloadAndSaveImage } from "../../../utils/basic"

interface Props { url: string }

export default function DownloadImageButton(props: Props) {
  return (
    <Tooltip title="Download the image" arrow>
      <IconButton
        color="info"
        sx={{ position: "absolute", botton: 0, right: 0, }}
        onClick={() => downloadAndSaveImage(props.url)}
      >
        <Download />
      </IconButton>
    </Tooltip>
  )
}
