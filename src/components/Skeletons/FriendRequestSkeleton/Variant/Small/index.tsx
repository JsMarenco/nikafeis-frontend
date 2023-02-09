import React from "react"

// Third-party dependencies
import { Stack, Box, Skeleton } from "@mui/material"

// Current project dependencies
import cardStyles from "styles/components/cards"
import stylesVars from "styles/globals/vars"
import profileStyles from "styles/pages/profile"

export default function FriendRequestSkeletonSmall() {
  return (
    <Stack
      sx={{ ...cardStyles.container , p: 0 }}
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box sx={{ ...stylesVars.centeredElements, justifyContent: "initial", width: "100%" }}>
        {/* user avatar */}
        <Skeleton animation={stylesVars.skeletonAnimation} variant="circular" sx={cardStyles.userAvatar} />

        <Box flexGrow={1}>
          {/* user fullname */}
          <Skeleton animation={stylesVars.skeletonAnimation} variant="text" width="90%" height={25} />

          {/* time ago */}
          <Skeleton animation={stylesVars.skeletonAnimation} variant="text" width="70%" height={25} />
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
          animation={stylesVars.skeletonAnimation}
          variant="rectangular"
          sx={{ ...profileStyles.optionButton, height: 35, mb: .5, }}
        />

        {/* reject button */}
        <Skeleton
          animation={stylesVars.skeletonAnimation}
          variant="rectangular"
          sx={{ ...profileStyles.optionButton, height: 35, mb: .5 }}
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
