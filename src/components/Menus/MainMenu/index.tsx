import React from "react"
import { ListItemIcon, Box, MenuItem, } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import MenuLinks, { ToggleThemeButton } from "../MenuLinks/AccountMenuLinks"
import { menu_link } from "../../../styles/menu"

export default function MainMenu() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      {
        MenuLinks.map((MenuLink, index) => (
          <MenuItem
            key={index}
            onClick={() => navigate(MenuLink.link)}
            sx={{
              ...menu_link,
              bgcolor: (location.pathname === MenuLink.link ? "background.default" : "")
            }}
          >
            <ListItemIcon>{MenuLink.icon}</ListItemIcon>{MenuLink.label}
          </MenuItem>
        ))
      }

      <Box sx={{ mb: 4 }}>
        <ToggleThemeButton />
      </Box>
    </>
  )
}
