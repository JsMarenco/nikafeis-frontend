import React from "react"

// Third-party dependencies
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined"
import TwitterIcon from "@mui/icons-material/Twitter"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"

// Current project dependencies
import { MenuLinkInterface } from "../../../../interface/menu"
import AppRoutes from "constants/app/routes"

const icon_size = "large"

export const SettingsLinks: MenuLinkInterface[] = [
  {
    icon: <ManageAccountsOutlinedIcon fontSize={icon_size} />,
    label: "Profile settings",
    link: AppRoutes.profileSettings
  },
  {
    icon: <AdminPanelSettingsOutlinedIcon fontSize={icon_size} />,
    label: "Account settings",
    link: AppRoutes.accountSettings
  },
  {
    icon: <TwitterIcon fontSize={icon_size} />,
    label: "Social accounts",
    link: AppRoutes.socialAccountsSettings
  },
]
