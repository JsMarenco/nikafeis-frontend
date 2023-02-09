import React from "react"

// Third-party dependencies
import { Avatar, Box, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"

// Current project dependencies
import { RootState } from "../../../app/store"
import cardStyles from "../../../styles/components/cards"
import stylesVars from "../../../styles/globals/vars"

export default function UserHomeCard() {
  const state = useSelector((state: RootState) => state.user)

  return (
    <>
      <Stack direction="column" sx={cardStyles.container}>
        <Box sx={{ ...stylesVars.centeredElements, justifyItems: "initial" }} >
          <Avatar
            src={state.user.avatarUrl}
            alt={`${state.user.firstName} ${state.user.lastName} avatar's`}
            sx={cardStyles.userAvatar}
          >
            {state.user.firstName.charAt(0)}
          </Avatar>

          <Box>
            <Typography
              variant="subtitle1"
              sx={cardStyles.title}
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
      </Stack>
    </>
  )
}
