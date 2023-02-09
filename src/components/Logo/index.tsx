import React from "react"

// Third-party dependencies
import { useNavigate } from "react-router-dom"
import FacebookIcon from "@mui/icons-material/Facebook"
import { IconButton } from "@mui/material"

// Current project dependencies
import AppRoutes from "constants/app/routes"

export default function Logo() {
  const navigate = useNavigate()

  return (
    <>
      <IconButton onClick={() => navigate(AppRoutes.home)}>
        <FacebookIcon fontSize="large" />
      </IconButton>
    </>
  )
}
