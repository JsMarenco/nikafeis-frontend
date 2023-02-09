import React from "react"

// Third-party dependencies
import { Skeleton } from "@mui/material"

// Current project dependencies
import stylesVars from "styles/globals/vars"
import profileStyles from "styles/pages/profile"

const ButtonProfileSkeleton = () => {
  return (
    <Skeleton
      animation={stylesVars.skeletonAnimation}
      variant="rectangular"
      sx={{
        ...profileStyles.optionButton,
        width: "70%",
        height: 30,
        mb: .5,
        maxWidth: "150px"
      }}
    />
  )
}

export default function ButtonProfileSkeletonList() {
  return (
    <>
      <ButtonProfileSkeleton />
      <ButtonProfileSkeleton />
      <ButtonProfileSkeleton />
      <ButtonProfileSkeleton />
    </>
  )
}
