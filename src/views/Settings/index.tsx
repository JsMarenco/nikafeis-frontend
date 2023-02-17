import React, { useEffect, useState, } from "react"

// Third-party dependencies
import { Box, IconButton, Stack, Typography, } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Grid from "@mui/material/Unstable_Grid2"

// Current project dependencies
import { changeTitle } from "../../utils/basic"
import { ACCOUNT_SETTINGS } from "../../constants/titles"
import SettingsMenu from "../../components/Menus/SettingsMenu"
import stylesVars from "../../styles/globals/vars"
import settingsStyles from "styles/pages/settings"
import AppRoutes from "constants/app/routes"
import cardStyles from "styles/components/cards"

export default function Settings() {
  const navigate = useNavigate()
  const location = useLocation()
  const [hideMenu, setHideMenu] = useState(false)

  useEffect(() => { changeTitle(ACCOUNT_SETTINGS) }, [])

  useEffect(() => {
    const currentPath = location.pathname

    currentPath !== AppRoutes.settings && setHideMenu(true)
    currentPath === AppRoutes.settings && setHideMenu(false)
  }, [location])

  return (
    <Grid container spacing={2} disableEqualOverflow>
      <Grid xs={12}>
        <Box sx={{ ...stylesVars.centeredElements, justifyContent: "initial", ...cardStyles.container }}>
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
        <Stack spacing={1} sx={settingsStyles.container}>
          {!hideMenu && (<SettingsMenu />)}
        </Stack>
      </Grid>

      <Outlet />
    </Grid>
  )
}
