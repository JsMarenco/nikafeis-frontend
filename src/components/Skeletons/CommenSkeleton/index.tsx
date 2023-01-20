import React from "react"
import { Paper, Box, Skeleton } from "@mui/material"
import { global_flex, skeleton__animation, user__avatar } from "../../../styles"
import { comment__card_container } from "../../../styles/comment"

export default function CommenSkeleton() {
  return (
    <Paper
      elevation={3}
      sx={{
        ...comment__card_container,
        ...global_flex,
        justifyContent: "space-between",
        p: 2,
        borderRadius: "15px"
      }}
    >
      <Box sx={{ ...global_flex, justifyContent: "left", flexGrow: 1 }}>
        {/* user avatar */}
        <Skeleton animation={skeleton__animation} variant="circular" sx={user__avatar} />

        <Box>
          {/* user fullname */}
          <Skeleton animation={skeleton__animation} variant="text" sx={{ width: "120px" }} height={25} />
          {/* friend request time */}
          <Skeleton animation={skeleton__animation} variant="text" sx={{ width: "120px" }} height={25} />
        </Box>

      </Box>

      {/* show content */}
      <Skeleton animation={skeleton__animation} variant="circular" sx={{ ...user__avatar, width: 30, height: 30 }} />
    </Paper>
  )
}
