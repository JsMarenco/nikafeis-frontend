import React, { ReactNode } from "react"
import { Stack, Avatar, Tooltip, Typography, Box } from "@mui/material"
import { PROFILE_ROUTE } from "../../../constants/routes"
import { user__fullName_link } from "../../../styles"
import { friend_request__card_container, friend_request__card_avatar } from "../../../styles/friendRequest"
import { useNavigate } from "react-router-dom"

interface Props {
  avatarUrl: string
  username: string
  fullName: string
  children: ReactNode
}

export default function FriendRequestCard(props: Props) {
  const { avatarUrl, username, fullName, children } = props

  const navigate = useNavigate()

  return (
    <Stack spacing={2} sx={friend_request__card_container}>
      <Avatar
        src={avatarUrl}
        alt={fullName}
        sx={friend_request__card_avatar}
        onClick={() => navigate(`${PROFILE_ROUTE}/${username}`)}
        variant="circular"
      >
        {fullName.charAt(0)}
      </Avatar>

      <Box>
        <Tooltip title="View Profile" arrow>
          <Typography
            sx={user__fullName_link}
            variant="subtitle1"
            color="text.primary"
            onClick={() => navigate(`${PROFILE_ROUTE}/${username}`)}
          >
            {fullName}
          </Typography>
        </Tooltip>

        <Typography variant="body1" sx={{ fontWeight: "300" }} color="text.primary">{`@${username}`}</Typography>
      </Box>

      <Box>
        {children}
      </Box>
    </Stack>
  )
}
