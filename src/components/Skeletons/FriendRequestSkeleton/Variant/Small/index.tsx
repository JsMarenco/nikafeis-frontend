import React from "react"
import { Stack, Box, Skeleton } from "@mui/material"
import { global_flex, skeleton__animation, user__avatar } from "../../../../../styles"
import { friend_request__card_container } from "../../../../../styles/friendRequest"
import { profile_option__button_v2 } from "../../../../../styles/profile"

export default function FriendRequestSkeletonSmall() {
  return (
    <Stack
      sx={{ ...friend_request__card_container, p: 0 }}
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box sx={{ ...global_flex, justifyContent: "initial", width: "100%" }}>
        {/* user avatar */}
        <Skeleton animation={skeleton__animation} variant="circular" sx={user__avatar} />

        <Box flexGrow={1}>
          {/* user fullname */}
          <Skeleton animation={skeleton__animation} variant="text" width="90%" height={25} />

          {/* time ago */}
          <Skeleton animation={skeleton__animation} variant="text" width="70%" height={25} />
        </Box>
      </Box>


      <Stack
        sx={{ width: "100%", mt: 1 }}
        spacing={1}
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
      >
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
    </Stack>
  )
}

export const FriendRequestSkeletonSmallList = () => {
  return (
    <Stack spacing={2}>
      <FriendRequestSkeletonSmall />
      <FriendRequestSkeletonSmall />
      <FriendRequestSkeletonSmall />
    </Stack>
  )
}
