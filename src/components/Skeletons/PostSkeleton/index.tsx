import React from "react"

// Third-party dependencies
import { Box, Divider, Skeleton } from "@mui/material"
// Current project dependencies

import cardStyles from "styles/components/cards"
import stylesVars from "styles/globals/vars"

export const PostSkeleton = () => {
  return (
    <Box sx={cardStyles.container}>
      <Box sx={cardStyles.headerContainer}>
        {/* avatar */}
        <Skeleton animation={stylesVars.skeletonAnimation} variant="circular" sx={cardStyles.userAvatar} />

        <Box sx={{ width: "100%" }}>
          {/* author fullname */}
          <Skeleton animation={stylesVars.skeletonAnimation} variant="text" sx={{ width: "100%" }} height={25} />
          {/* post date */}
          <Skeleton animation={stylesVars.skeletonAnimation} variant="text" sx={{ width: "100%" }} height={20} />
        </Box>
      </Box>

      {/* post title */}
      <Skeleton animation={stylesVars.skeletonAnimation} variant="text" sx={{ width: "100%" }} height={20} />
      {/* post content */}
      <Skeleton animation={stylesVars.skeletonAnimation} variant="text" sx={{ width: "100%", mb: 2 }} height={20} />

      {/* post image */}
      <Skeleton animation={stylesVars.skeletonAnimation} variant="rectangular" sx={{ width: "100%" }} height={150} />

      <Divider sx={{ mb: 2, mt: 2 }} />

      <Box sx={cardStyles.interactContainer}>
        {/* like button */}
        <Skeleton
          animation={stylesVars.skeletonAnimation}
          variant="text"
          sx={{ width: "80px", height: 20 }}
        />

        {/* comments button */}
        <Skeleton
          animation={stylesVars.skeletonAnimation}
          variant="text"
          sx={{ width: "80px", height: 20 }}
        />

        {/* share button */}
        <Skeleton
          animation={stylesVars.skeletonAnimation}
          variant="text"
          sx={{ width: "80px", height: 20 }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* comment section */}
      <Skeleton animation={stylesVars.skeletonAnimation} variant="text" sx={{ width: "100%" }} height={20} />
    </Box>
  )
}

export default function PostSkeletonList() {
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  )
}
