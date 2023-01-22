import React from "react"
import { Stack } from "@mui/material"
import CreatePost from "../../CreatePost"
import PostsLst from "../../PostsLst"
import Grid from "@mui/material/Unstable_Grid2"
import FriendRequestReceive from "../../FriendRequestReceive"
import ConnectionsList from "../../ConnectionsList"

export default function HomeSection() {
  return (
    <>
      <Grid container spacing={2} disableEqualOverflow>
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
