import React from "react"
import { Box, Typography } from "@mui/material"
import CreatePost from "../../CreatePost"
import PostsLst from "../../PostsLst"

export default function HomeSection() {
  return (
    <>
      <Box sx={{ mb: 5 }}>
        <CreatePost />

        <Typography variant="subtitle1" color="text.primary">Suggestion for you</Typography>

        <PostsLst />
      </Box>
    </>
  )
}
