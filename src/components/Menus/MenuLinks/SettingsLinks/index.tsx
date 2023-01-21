import React from "react"
import { MenuLinkInterface } from "../../../../interface/menu"
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined"
import { ACCOUNT_SETTINGS_ROUTE, PROFILE_SETTINGS_ROUTE, SOCIAL_ACCOUNTS_SETTINGS_ROUTE } from "../../../../constants/routes"
import TwitterIcon from "@mui/icons-material/Twitter"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"

const icon_size = "large"

export const SettingsLinks: MenuLinkInterface[] = [
  {
    icon: <ManageAccountsOutlinedIcon fontSize={icon_size} />,
    label: "Profile settings",
    link: PROFILE_SETTINGS_ROUTE
  },
  {
    icon: <AdminPanelSettingsOutlinedIcon fontSize={icon_size} />,
    label: "Account settings",
    link: ACCOUNT_SETTINGS_ROUTE
  },
  {
    icon: <TwitterIcon fontSize={icon_size} />,
    label: "Social accounts",
    link: SOCIAL_ACCOUNTS_SETTINGS_ROUTE
  },
]
