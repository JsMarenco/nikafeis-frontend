import React from "react"

// Third-party dependencies
import { Grid, Skeleton, Stack, } from "@mui/material"

// Current project dependencies
import cardStyles from "styles/components/cards"
import stylesVars from "styles/globals/vars"
import profileStyles from "styles/pages/profile"

export default function FriendRequestSkeletonLarge() {
  return (
    <Stack
      sx={cardStyles.container}
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {/* user avatar */}
      <Skeleton
        animation={stylesVars.skeletonAnimation}
        variant="circular"
        sx={{ ...cardStyles.userAvatarCenter, mb: 2 }}
      />

      {/* user fullname */}
      <Skeleton animation={stylesVars.skeletonAnimation} variant="text" width="90%" height={25} />

      {/* user username */}
      <Skeleton animation={stylesVars.skeletonAnimation} variant="text" width="65%" height={20} />

      {/* accept button */}
      <Skeleton
        animation={stylesVars.skeletonAnimation}
        variant="rectangular"
        sx={{ ...profileStyles.optionButton , height: 35, mb: .5, }}
      />

      {/* reject button */}
      <Skeleton
        animation={stylesVars.skeletonAnimation}
        variant="rectangular"
        sx={{ ...profileStyles.optionButton, height: 35, mb: .5 }}
      />
    </Stack>
  )
}

export const FriendRequestSkeletonLargeList = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton animation={stylesVars.skeletonAnimation} variant="rectangular" sx={{ width: "70%", height: 30 }} />
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
