import React from "react"
import { Box, Divider, Paper, Skeleton } from "@mui/material"
import { skeleton__animation, user__avatar } from "../../../styles"
import { post__card_container, post__card_header, post__card_interfact__section } from "../../../styles/post"

export const PostSkeleton = () => {
  return (
    <Paper sx={post__card_container}>
      <Box sx={post__card_header}>
        {/* avatar */}
        <Skeleton animation={skeleton__animation} variant="circular" sx={user__avatar} />

        <Box sx={{ width: "100%" }}>
          {/* author fullname */}
          <Skeleton animation={skeleton__animation} variant="text" sx={{ width: "100%" }} height={25} />
          {/* post date */}
          <Skeleton animation={skeleton__animation} variant="text" sx={{ width: "100%" }} height={20} />
        </Box>
      </Box>

      {/* post title */}
      <Skeleton animation={skeleton__animation} variant="text" sx={{ width: "100%" }} height={20} />
      {/* post content */}
      <Skeleton animation={skeleton__animation} variant="text" sx={{ width: "100%", mb: 2 }} height={20} />

      {/* post image */}
      <Skeleton animation={skeleton__animation} variant="rectangular" sx={{ width: "100%" }} height={150} />

      <Divider sx={{ mb: 2, mt: 2 }} />

      <Box sx={post__card_interfact__section}>
        {/* like button */}
        <Skeleton
          animation={skeleton__animation}
          variant="text"
          sx={{ width: "80px", height: 20 }}
        />

        {/* comments button */}
        <Skeleton
          animation={skeleton__animation}
          variant="text"
          sx={{ width: "80px", height: 20 }}
        />

        {/* share button */}
        <Skeleton
          animation={skeleton__animation}
          variant="text"
          sx={{ width: "80px", height: 20 }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* comment section */}
      <Skeleton animation={skeleton__animation} variant="text" sx={{ width: "100%" }} height={20} />
    </Paper>
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
