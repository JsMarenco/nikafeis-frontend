import React, { useContext } from "react"
import { SETTINGS_ROUTE, FRIENDS_SECTION_ROUTE, HOME_ROUTE, INBOX_ROUTE, LOGOUT_ROUTE, MAIN_USER_PROFILE_ROUTE, NEW_CONNECTIONS_ROUTE, VIDEOS_SECTION_ROUTE } from "../../../../constants/routes"
import SettingsIcon from "@mui/icons-material/Settings"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import { ListItemIcon, MenuItem } from "@mui/material"
import { appThemeContext, DARK } from "../../../../context/ThemeContext"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { menu_link } from "../../../../styles/menu"
import HomeIcon from "@mui/icons-material/Home"
import GroupIcon from "@mui/icons-material/Group"
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo"
import MessageIcon from "@mui/icons-material/Message"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import { MenuLinkInterface } from "../../../../interface/menu"

const icon_size = "medium"

const MenuLinks: MenuLinkInterface[] = [
  {
    icon: <HomeIcon fontSize={icon_size} />,
    label: "Home",
    link: HOME_ROUTE
  },
  {
    icon: <PersonIcon fontSize={icon_size} />,
    label: "Profile",
    link: MAIN_USER_PROFILE_ROUTE
  },
  // {
  //   icon: <MessageIcon fontSize={icon_size} />,
  //   label: "Inbox",
  //   link: INBOX_ROUTE
  // },
  {
    icon: <GroupIcon fontSize={icon_size} />,
    label: "Friends",
    link: FRIENDS_SECTION_ROUTE
  },
  {
    icon: <GroupAddIcon fontSize={icon_size} />,
    label: "Connections",
    link: NEW_CONNECTIONS_ROUTE
  },
  // {
  //   icon: <OndemandVideoIcon  fontSize={icon_size} />,
  //   label: "Videos",
  //   link: VIDEOS_SECTION_ROUTE
  // },
  {
    icon: <SettingsIcon fontSize={icon_size} />,
    label: "Settings",
    link: SETTINGS_ROUTE
  },
  {
    icon: <LogoutIcon fontSize={icon_size} />,
    label: "Logout",
    link: LOGOUT_ROUTE
  },
]

export function ToggleThemeButton() {
  const { currentThemeName, handleChangeThemeApp } = useContext(appThemeContext)

  return (
    <>
      <MenuItem
        onClick={handleChangeThemeApp}
        sx={menu_link}
      >
        {
          currentThemeName == DARK ? (
            <>
              <ListItemIcon>
                <LightModeIcon />
              </ListItemIcon>

              Ligth mode
            </>
          ) : (
            <>
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>

              Dark mode
            </>
          )
        }
      </MenuItem>
    </>
  )
}

export default MenuLinks

