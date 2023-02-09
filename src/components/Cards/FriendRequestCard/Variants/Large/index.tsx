import React from "react"

// Third-party dependencies
import { Stack, Avatar, Tooltip, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

// Current project dependencies
import { FRBaseProps } from "../../../../../interface/friends"
import AppRoutes from "../../../../../constants/app/routes"
import cardStyles from "../../../../../styles/components/cards"
import globalsTexts from "../../../../../lang/en/globals"

export default function FriendRequestCardLarge(props: FRBaseProps) {
  const { avatarUrl, username, fullName, children } = props

  const navigate = useNavigate()

  return (
    <Stack spacing={2} sx={cardStyles.container}>
      <Avatar
        src={avatarUrl}
        alt={fullName}
        sx={cardStyles.userAvatarCenter}
        onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
        variant="circular"
      >
        {fullName.charAt(0)}
      </Avatar>

      <Box>
        <Tooltip title={globalsTexts.viewProfile} arrow>
          <Typography
            sx={cardStyles.profileLink}
            variant="subtitle1"
            color="text.primary"
            fontWeight={400}
          >
            {fullName}
          </Typography>
        </Tooltip>

        <Typography variant="body1" fontWeight={300} color="text.primary">{`@${username}`}</Typography>
      </Box>

      <Stack
        spacing={1}
      >
        {children}
      </Stack>
    </Stack>
  )
}
