import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { PROFILE_ROUTE } from "../../../constants/routes"
import { BasicUserInterface } from "../../../interface/user"
import { userCardContainer } from "./styles"

export default function UserCard(props: BasicUserInterface) {
  const { firstName = "", lastName = "", username = "", avatarUrl = "", } = props

  const navigate = useNavigate()

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={userCardContainer}
    >
      <Avatar
        src={avatarUrl}
        alt={`${firstName} ${lastName}`}
      />

      <Box
        flexGrow={1}
      >
        <Tooltip title="View profile" arrow>
          <Typography
            variant="subtitle1"
            color="text.primary"
            onClick={() => navigate(`${PROFILE_ROUTE}/${username}`)}
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              display: "inline-block",
            }}
          >
            {`${name} ${lastName}`}
          </Typography>
        </Tooltip>
      </Box>

      <Stack
        spacing={0.5}
        direction="row"
        flexWrap="wrap"
      >
        <IconButton>
          {/* <MessageIcon /> */}
        </IconButton>
      </Stack>
    </Stack>
  )
}
