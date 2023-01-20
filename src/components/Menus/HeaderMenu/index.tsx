import React from "react"
import { Box, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { FRIENDS_SECTION_ROUTE, VIDEOS_SECTION_ROUTE } from "../../../constants/routes"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"

export default function HeaderMenu() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <IconButton
        aria-label="Friends"
        sx={{ m: 0.5, p: 1 }}
        onClick={() => navigate(FRIENDS_SECTION_ROUTE)}
      >
        <PeopleAltIcon />
      </IconButton>

      <IconButton
        aria-label="Videos"
        sx={{ m: 0.5, p: 1 }}
        onClick={() => navigate(VIDEOS_SECTION_ROUTE)}
      >
        <VideoLibraryIcon />
      </IconButton>
    </Box>
  )
}
