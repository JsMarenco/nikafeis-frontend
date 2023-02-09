import React, { useEffect, useState } from "react"

// Third-party dependencies
import { useLocation, useNavigate } from "react-router-dom"
import { ListItemIcon, Box, MenuItem, } from "@mui/material"

// Current project dependencies
import MenuLinks, { ToggleThemeButton } from "../MenuLinks/AccountMenuLinks"
import menuStyles from "../../../styles/components/menu"
import AppRoutes from "constants/app/routes"

export default function MainMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isActiveRoute, setIsActiveRoute] = useState(false)

  useEffect(() => {
    setIsActiveRoute(
      Object.entries(AppRoutes)
        .some(([, value]) => (
          value === location.pathname ||
          location.pathname.startsWith(value)
        ))
    )
  }, [location.pathname])

  return (
    <>
      {
        MenuLinks.map((MenuLink, index) => (
          <MenuItem
            key={index}
            onClick={() => navigate(MenuLink.link)}
            sx={{
              ...menuStyles.link,
              bgcolor: (isActiveRoute ? "background.paper" : ""),
            }}
          >
            <ListItemIcon>{MenuLink.icon}</ListItemIcon>{MenuLink.label}
          </MenuItem>
        ))
      }

      <Box>
        <ToggleThemeButton />
      </Box>
    </>
  )
}
