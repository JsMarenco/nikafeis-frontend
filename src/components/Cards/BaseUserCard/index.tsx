import React from "react"

// Third-party dependencies
import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import MessageIcon from "@mui/icons-material/Message"

// Current project dependencies
import { BasicUserInterface } from "../../../interface/user"
import cardStyles from "../../../styles/components/cards"
import AppRoutes from "../../../constants/app/routes"

export default function UserCard(props: BasicUserInterface) {
  const { firstName = "", lastName = "", username = "", avatarUrl = "", } = props

  const navigate = useNavigate()

  const handleMessage = async () => {
    navigate(AppRoutes.newChat)
  }

  return (
    <Stack direction="row" spacing={2} sx={cardStyles.container}>
      <Avatar
        src={avatarUrl}
        alt={`${firstName} ${lastName}`}
        sx={{ ...cardStyles.userAvatar, mr: 0 }}
      >
        {firstName.charAt(0)}
      </Avatar>

      <Box flexGrow={1}>
        <Tooltip title="View profile" arrow>
          <Typography
            variant="subtitle1"
            color="text.primary"
            onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
            sx={cardStyles.profileLink}
          >
            {`${firstName} ${lastName}`}
          </Typography>
        </Tooltip>
      </Box>

      <IconButton onClick={handleMessage}>
        <MessageIcon />
      </IconButton>
    </Stack>
  )
}
