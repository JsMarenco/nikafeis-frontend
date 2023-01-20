import React from "react"
import { user__card_container } from "../../../styles/userCard"
import { Avatar, Box, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { global_flex, user__avatar } from "../../../styles"

export default function UserHomeCard() {
  const state = useSelector((state: RootState) => state.user)

  return (
    <>
      <Stack
        direction="column"
        sx={user__card_container}
      >
        <Box sx={{ ...global_flex, justifyItems: "initial" }} >
          <Avatar
            src={state.user.avatarUrl}
            alt={`${state.user.firstName} ${state.user.lastName} avatar's`}
            sx={user__avatar}
          >
            {state.user.firstName.charAt(0)}
          </Avatar>

          <Box>
            <Typography
              variant="subtitle1"
              color="text.primary"
            >
              {`${state.user.firstName} ${state.user.lastName}`}
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontSize: 12, }}
            >
              {`@${state.user.username}`}
            </Typography>
          </Box>
        </Box>

        {/* <Box>
          <Typography
            variant="subtitle1"
            color="text.primary"
            sx={{ fontSize: 12, }}
          >
            {`Friends ${state.friends.length}`}
          </Typography>
        </Box> */}
      </Stack>
    </>
  )
}
