import React from "react"
import { Avatar, Stack, Tooltip, Typography } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"

interface Props {
  src: string
}

export default function PreviewAvatar(props: Props) {
  const { src = "" } = props

  const state = useSelector((state: RootState) => state.user)

  return (
    <>
      {
        src && (
          <>
            <Typography
              variant="subtitle1"
              color="text.primary"
              align="center"
              mb={3}
            >
              Preview
            </Typography>

            <Stack
              spacing={2}
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              mb={3}
            >

              <Tooltip title="Your old avatar" arrow>
                <Avatar
                  src={state.user.avatarUrl}
                  alt={`${state.user.firstName}'s avatar`}
                  sx={{
                    width: "90px",
                    height: "90px",
                  }}
                />
              </Tooltip>

              <ArrowForwardIosIcon
                color="primary"
              />

              <Tooltip title="Your new avatar" arrow>
                <Avatar
                  src={src}
                  alt={`${state.user.firstName}'s avatar`}
                  sx={{
                    width: "90px",
                    height: "90px",
                  }}
                />
              </Tooltip>
            </Stack>
          </>
        )
      }
    </>
  )
}
