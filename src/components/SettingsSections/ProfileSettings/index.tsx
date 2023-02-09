import React from "react"

// Third-party dependencies
import { Box } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Current project dependencies
import AvatarSettings from "../AvatarSettings"
import CoverSettings from "../CoverSettings"
import { settings_container } from "../../../styles/settings"

export default function ProfileSettings() {
  const icon_size = "large"

  return (
    <>
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
    </>
  )
}
