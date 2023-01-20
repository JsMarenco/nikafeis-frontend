import React from "react"
import { useNavigate } from "react-router-dom"
import { HOME_ROUTE } from "../../constants/routes"
import FacebookIcon from "@mui/icons-material/Facebook"
import { IconButton } from "@mui/material"

export default function Logo() {
  const navigate = useNavigate()

  return (
    <>
      <IconButton
        onClick={() => navigate(HOME_ROUTE)}
      >
        <FacebookIcon fontSize="large" />
      </IconButton>
    </>
  )
}
