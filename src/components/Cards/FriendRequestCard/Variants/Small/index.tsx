import React from "react"

// Third-party dependencies
import { Avatar, Box, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

// Current project dependencies
import { FRBaseProps } from "../../../../../interface/friends"
import { convertDate } from "../../../../../utils/basic"
import cardStyles from "../../../../../styles/components/cards"
import stylesVars from "../../../../../styles/globals/vars"
import AppRoutes from "../../../../../constants/app/routes"

export default function FriendRequestCardSmall(props: FRBaseProps) {
  const navigate = useNavigate()
  const { avatarUrl, fullName, timeAgo, username, children } = props

  return (
    <Stack
      sx={cardStyles.container}
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box sx={{ ...stylesVars.centeredElements, justifyContent: "initial", width: "100%", mb: 2 }}>
        <Avatar
          src={avatarUrl}
          alt={`${fullName}'s avatar`}
          sx={cardStyles.userAvatar}
        >
          {fullName.charAt(0)}
        </Avatar>

        <Box>
          <Typography
            variant="body1"
            color="text.primary"
            align="left"
            onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
            sx={cardStyles.profileLink}
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
