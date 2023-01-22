import React from "react"
import { Grid, Skeleton, Stack, } from "@mui/material"
import { friend_request__card_avatar, friend_request__card_container } from "../../../../../styles/friendRequest"
import { skeleton__animation } from "../../../../../styles"
import { profile_option__button_v2 } from "../../../../../styles/profile"

export default function FriendRequestSkeletonLarge() {
  return (
    <Stack
      sx={friend_request__card_container}
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {/* user avatar */}
      <Skeleton
        animation={skeleton__animation}
        variant="circular"
        sx={{ ...friend_request__card_avatar, mb: 2 }}
      />

      {/* user fullname */}
      <Skeleton animation={skeleton__animation} variant="text" width="90%" height={25} />

      {/* user username */}
      <Skeleton animation={skeleton__animation} variant="text" width="65%" height={20} />

      {/* accept button */}
      <Skeleton
        animation={skeleton__animation}
        variant="rectangular"
        sx={{ ...profile_option__button_v2, height: 35, mb: .5, }}
      />

      {/* reject button */}
      <Skeleton
        animation={skeleton__animation}
        variant="rectangular"
        sx={{ ...profile_option__button_v2, height: 35, mb: .5 }}
      />
    </Stack>
  )
}

export const FriendRequestSkeletonLargeList = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton animation={skeleton__animation} variant="rectangular" sx={{ width: "70%", height: 30 }} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}><FriendRequestSkeletonLarge /></Grid>
        <Grid item xs={12} sm={6} md={3}><FriendRequestSkeletonLarge /></Grid>
        <Grid item xs={12} sm={6} md={3}><FriendRequestSkeletonLarge /></Grid>
        <Grid item xs={12} sm={6} md={3}><FriendRequestSkeletonLarge /></Grid>
        <Grid item xs={12} sm={6} md={3}><FriendRequestSkeletonLarge /></Grid>
        <Grid item xs={12} sm={6} md={3}><FriendRequestSkeletonLarge /></Grid>
        <Grid item xs={12} sm={6} md={3}><FriendRequestSkeletonLarge /></Grid>
        <Grid item xs={12} sm={6} md={3}><FriendRequestSkeletonLarge /></Grid>
      </Grid>
    </>
  )
}
