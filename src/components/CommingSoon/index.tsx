import React, { useEffect } from "react"

// Third-party dependencies
import { Stack, Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

// Current project dependencies
import { COMMIG_SOON } from "../../constants/titles"
import { changeTitle } from "../../utils/basic"
import stylesVars from "../../styles/globals/vars"
import AppRoutes from "../../constants/app/routes"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const commingSoonPng = require("../../assets/coming-soon.png")

export default function CommingSoon() {
  const navigate = useNavigate()

  useEffect(() => { changeTitle(COMMIG_SOON) }, [])

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        sx={{ height: window.innerHeight, width: "90%", mx: "auto" }}
      >
        <Box sx={{ overflow: "hidden", width: { xs: "100%" }, ...stylesVars.centeredElements }}>
          <img
            src={commingSoonPng}
            alt="Comming soon image"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "50%" }, ...stylesVars.centeredElements, flexDirection: "column" }}>
          <Typography variant="h5" color="text.primary" align="center">
            We are under construction. Check back for an update soon.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(AppRoutes.home)}
            sx={{ mx: "auto", mt: 2 }}
          >
            Home page
          </Button>
        </Box>
      </Stack>
    </>
  )
}
