import React from "react"
import { Box } from "@mui/material"
import AvatarSettings from "../AvatarSettings"
import CoverSettings from "../CoverSettings"
import { settings_container } from "../../../styles/settings"
import Grid from "@mui/material/Unstable_Grid2"

export default function ProfileSettings() {
  const icon_size = "large"

  return (
    <Grid container columnSpacing={2} disableEqualOverflow flexGrow={1} >
      <Grid xs={12} md={6}>
        <Box sx={settings_container}>
          <AvatarSettings icon_size={icon_size} />
        </Box>
      </Grid>

      <Grid xs={12} md={6}>
        <Box sx={settings_container}>
          <CoverSettings icon_size={icon_size} />
        </Box>
      </Grid>
    </Grid>
  )
}
