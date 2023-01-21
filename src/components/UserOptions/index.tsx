import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { SETTINGS_ROUTE } from "../../constants/routes"
import { profile_option__button } from "../../styles/profile"

export default function UserOptions() {
  const navigate = useNavigate()

  return (
    <>
      <Button
        variant="text"
        startIcon={<EditIcon />}
        onClick={() => navigate(SETTINGS_ROUTE)}
        sx={profile_option__button}
      >
        Edit profile
      </Button>
    </>

  )
}
