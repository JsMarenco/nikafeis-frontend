import { Avatar, Box, Stack, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { PROFILE_ROUTE } from "../../../../../constants/routes"
import { FRBaseProps } from "../../../../../interface/friends"
import { global_flex, user__avatar, user__fullName_link } from "../../../../../styles"
import { friend_request__card_container } from "../../../../../styles/friendRequest"
import { convertDate } from "../../../../../utils/basic"

export default function FriendRequestCardSmall(props: FRBaseProps) {
  const navigate = useNavigate()
  const { avatarUrl, fullName, timeAgo, username, children } = props

  return (
    <Stack
      sx={{ ...friend_request__card_container, p: 1, bgcolor: "background.default" }}
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box sx={{ ...global_flex, justifyContent: "initial", width: "100%", mb: 2 }}>
        <Avatar
          src={avatarUrl}
          alt={`${fullName}'s avatar`}
          sx={user__avatar}
        >
          {fullName.charAt(0)}
        </Avatar>

        <Box>
          <Typography
            variant="body1"
            color="text.primary"
            align="left"
            onClick={() => navigate(`${PROFILE_ROUTE}/${username}`)}
            sx={{
              ...user__fullName_link,
            }}
          >
            {fullName}
          </Typography>

          {
            timeAgo && (
              <Typography
                variant="body1"
                sx={{ fontWeight: "300" }}
                color="text.primary"
                align="left"
              >
                {convertDate(timeAgo || "")}
              </Typography>
            )
          }
        </Box>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        {children}
      </Stack>
    </Stack>
  )
}
