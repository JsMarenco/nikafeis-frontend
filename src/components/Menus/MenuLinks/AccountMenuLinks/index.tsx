import React, { useContext } from "react"

// Third-party dependencies
import { ListItemIcon, ListItem, ListItemButton, ListItemText } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import HomeIcon from "@mui/icons-material/Home"
import GroupIcon from "@mui/icons-material/Group"
// import OndemandVideoIcon from "@mui/icons-material/OndemandVideo"
// import MessageIcon from "@mui/icons-material/Message"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import StorefrontIcon from "@mui/icons-material/Storefront"

// Current project dependencies
import { appThemeContext, DARK } from "../../../../context/ThemeContext"
import { MenuLinkInterface } from "../../../../interface/menu"
import AppRoutes from "../../../../constants/app/routes"
import menuStyles from "../../../../styles/components/menu"

const MenuLinks: MenuLinkInterface[] = [
  {
    icon: <HomeIcon fontSize={menuStyles.iconSize} />,
    label: "Home",
    link: AppRoutes.home
  },
  {
    icon: <PersonIcon fontSize={menuStyles.iconSize} />,
    label: "Profile",
    link: AppRoutes.mainUserProfile
  },
  {
    icon: <StorefrontIcon fontSize={menuStyles.iconSize} />,
    label: "Marketplace",
    link: AppRoutes.marketplace
  },
  // {
  //   icon: <MessageIcon fontSize={menuStyles.iconSize} />,
  //   label: "Inbox",
  //   link: AppRoutes.inbox
  // },
  {
    icon: <GroupIcon fontSize={menuStyles.iconSize} />,
    label: "Friends",
    link: AppRoutes.friends
  },
  {
    icon: <GroupAddIcon fontSize={menuStyles.iconSize} />,
    label: "Connections",
    link: AppRoutes.newConnections
  },
  // {
  //   icon: <OndemandVideoIcon fontSize={menuStyles.iconSize} />,
  //   label: "Videos",
  //   link: AppRoutes.videos
  // },
  {
    icon: <SettingsIcon fontSize={menuStyles.iconSize} />,
    label: "Settings",
    link: AppRoutes.settings
  },
  {
    icon: <LogoutIcon fontSize={menuStyles.iconSize} />,
    label: "Logout",
    link: AppRoutes.logout
  },
]

export function ToggleThemeButton() {
  const { currentThemeName, handleChangeThemeApp } = useContext(appThemeContext)

  return (
    <>
      <ListItem onClick={handleChangeThemeApp} disablePadding>
        {
          currentThemeName == DARK ? (
            <ListItemButton sx={menuStyles.link}>
              <ListItemIcon>
                <LightModeIcon />
              </ListItemIcon>

              <ListItemText>
                Ligth mode
              </ListItemText>
            </ListItemButton>
          ) : (
            <ListItemButton sx={menuStyles.link}>
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>

              <ListItemText>

                Dark mode
              </ListItemText>
            </ListItemButton>
          )
        }
      </ListItem>
    </>
  )
}

export default MenuLinks

