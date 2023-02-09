import React from "react"

// Third-party dependencies
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

// Current project dependencies
import AppRoutes from "constants/app/routes"
import profileStyles from "styles/pages/profile"

export default function UserOptions() {
  const navigate = useNavigate()

  return (
    <>
      <Button
        variant="text"
        startIcon={<EditIcon />}
        onClick={() => navigate(AppRoutes.settings)}
        sx={profileStyles.optionButton}
      >
        Edit profile
      </Button>
    </>

  )
}
