import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, ListItemIcon, MenuItem } from "@mui/material"
import { SettingsLinks } from "../MenuLinks/SettingsLinks"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { global_flex } from "../../../styles"

export default function SettingsMenu() {
  const navigate = useNavigate()

  return (
    <>
      {
        SettingsLinks.map((MenuLink, index) => (
          <MenuItem
            key={index}
            onClick={() => navigate(MenuLink.link)}
            sx={{ color: "text.primary", borderRadius: "30px", ...global_flex, justifyContent: "space-between" }}
          >
            <Box sx={global_flex}>
              <ListItemIcon sx={{ mr: 1.5 }}>{MenuLink.icon}</ListItemIcon>{MenuLink.label}
            </Box>

            <ArrowForwardIosIcon />
          </MenuItem>
        ))
      }
    </>
  )
}
