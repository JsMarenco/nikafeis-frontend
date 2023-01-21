import React from "react"
import { Box, Grid } from "@mui/material"
import AvatarSettings from "../AvatarSettings"
import CoverSettings from "../CoverSettings"
import { settings_container } from "../../../styles/settings"

export default function ProfileSettings() {
  const icon_size = "large"

  return (
    <>
      <Grid item xs={12} md={6}>
        <Box sx={settings_container}>
          <AvatarSettings icon_size={icon_size} />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={settings_container}>
          <CoverSettings icon_size={icon_size} />
        </Box>
      </Grid>
    </>
  )
}
