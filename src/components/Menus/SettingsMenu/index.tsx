import React from "react"

// Third-party dependencies
import { useNavigate } from "react-router-dom"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { Box, ListItemIcon, MenuItem } from "@mui/material"

// Current project dependencies
import { SettingsLinks } from "../MenuLinks/SettingsLinks"
import stylesVars from "../../../styles/globals/vars"
import settingsStyles from "styles/pages/settings"

export default function SettingsMenu() {
  const navigate = useNavigate()

  return (
    <>
      {
        SettingsLinks.map((MenuLink, index) => (
          <MenuItem
            key={index}
            onClick={() => navigate(MenuLink.link)}
            sx={settingsStyles.link}
          >
            <Box sx={stylesVars.centeredElements}>
              <ListItemIcon sx={{ mr: 1.5 }}>{MenuLink.icon}</ListItemIcon>{MenuLink.label}
            </Box>

            <ArrowForwardIosIcon />
          </MenuItem>
        ))
      }
    </>
  )
}
