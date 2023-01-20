import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { LOGIN_ROUTE, } from "../../../constants/routes"
import MenuLinks, { ToggleThemeButton } from "../MenuLinks/AccountMenuLinks"
import { menu__container_paper__props } from "../../../styles/menu"

export default function AccountMenu() {
  const state = useSelector((state: RootState) => state.user)

  const navigate = useNavigate()

  const [userImage, setUserImage] = useState("")
  const [userFullName, setUserFullName] = useState("")

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (state.user) {
      setUserImage(state.user.avatarUrl)
      setUserFullName(`${state.user.firstName} ${state.user.lastName}`)
    } else {
      navigate(LOGIN_ROUTE)
    }
  }, [])

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar
              src={userImage}
              sx={{ width: 42, height: 42 }}
              alt={userFullName}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        PaperProps={menu__container_paper__props}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {
          MenuLinks.map((MenuLink, index) => (
            <MenuItem
              key={index}
              onClick={() => navigate(MenuLink.link)}
            >
              <ListItemIcon>{MenuLink.icon}</ListItemIcon>{MenuLink.label}
            </MenuItem>
          ))
        }

        <ToggleThemeButton />
      </Menu>
    </>
  )
}
