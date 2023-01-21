import React, { useEffect, useState, } from "react"
import { Box, IconButton, Typography, } from "@mui/material"
import { changeTitle } from "../../utils/basic"
import { ACCOUNT_SETTINGS } from "../../constants/titles"
import SettingsMenu from "../../components/Menus/SettingsMenu"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { SETTINGS_ROUTE } from "../../constants/routes"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { global_flex } from "../../styles"
import { settings_container } from "../../styles/settings"
import Grid from "@mui/material/Unstable_Grid2"

export default function Settings() {
  const navigate = useNavigate()
  const location = useLocation()
  const [hideMenu, setHideMenu] = useState(false)

  useEffect(() => { changeTitle(ACCOUNT_SETTINGS) }, [])

  useEffect(() => {
    const currentPath = location.pathname

    currentPath !== SETTINGS_ROUTE && setHideMenu(true)
    currentPath === SETTINGS_ROUTE && setHideMenu(false)
  }, [location])

  return (
    <Grid container rowSpacing={2} disableEqualOverflow>
      <Grid xs={12}>
        <Box sx={{ ...global_flex, justifyContent: "initial", ...settings_container }}>
          <IconButton
            size="large"
            sx={{ mr: 1.5 }}
            onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h4" color="text.primary">{hideMenu ? "Back" : "Settings"}</Typography>
        </Box>
      </Grid>

      <Grid xs={12} sx={{ display: (!hideMenu ? "block" : "none") }}>
        <Box sx={settings_container}>
          {!hideMenu && (<SettingsMenu />)}
        </Box>
      </Grid>

      <Outlet />
    </Grid>
  )
}
