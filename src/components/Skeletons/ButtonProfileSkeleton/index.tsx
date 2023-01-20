import React from "react"
import { Skeleton } from "@mui/material"
import { skeleton__animation } from "../../../styles"
import { profile_option__button } from "../../../styles/profile"

export default function ButtonProfileSkeleton() {
  return (
    <Skeleton
      animation={skeleton__animation}
      variant="rectangular"
      sx={{
        ...profile_option__button,
        width: "70%",
        height: 30,
        mb: .5,
        maxWidth: "150px"
      }}
    />
  )
}
