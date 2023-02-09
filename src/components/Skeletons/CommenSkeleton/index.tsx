import React from "react"

// Third-party dependencies
import { Paper, Box, Skeleton } from "@mui/material"

// Current project dependencies
import { comment__card_container } from "../../../styles/comment"
import stylesVars from "../../../styles/globals/vars"
import cardStyles from "../../../styles/components/cards"

export default function CommenSkeleton() {
  return (
    <Paper
      elevation={3}
      sx={{
        ...comment__card_container,
        ...stylesVars.centeredElements,
        justifyContent: "space-between",
        p: 2,
        borderRadius: "15px"
      }}
    >
      <Box sx={{ ...stylesVars.centeredElements, justifyContent: "left", flexGrow: 1 }}>
        {/* user avatar */}
        <Skeleton animation={stylesVars.skeletonAnimation} variant="circular" sx={cardStyles.userAvatar} />

        <Box>
          {/* user fullname */}
          <Skeleton animation={stylesVars.skeletonAnimation} variant="text" sx={{ width: "120px" }} height={25} />
          {/* friend request time */}
          <Skeleton animation={stylesVars.skeletonAnimation} variant="text" sx={{ width: "120px" }} height={25} />
        </Box>

      </Box>

      {/* show content */}
      <Skeleton animation={stylesVars.skeletonAnimation} variant="circular" sx={{ ...cardStyles.userAvatar, width: 30, height: 30 }} />
    </Paper>
  )
}
