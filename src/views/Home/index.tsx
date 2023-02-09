import React from "react"

// Third-party dependencies
import { Stack } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Current project dependencies
import ConnectionsList from "components/ConnectionsList"
import CreatePost from "components/CreatePost"
import FriendRequestReceive from "components/FriendRequestReceive"
import PostsLst from "components/PostsLst"

export default function Home() {
  return (
    <>
      <Grid container spacing={2} disableEqualOverflow >
        <Grid xs={12} md={8}>
          <Stack spacing={2} sx={{ width: "100%", }}>
            <CreatePost />

            <PostsLst />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <Stack spacing={2}>
            <FriendRequestReceive variant="small" />

            <ConnectionsList variant="small" />
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
