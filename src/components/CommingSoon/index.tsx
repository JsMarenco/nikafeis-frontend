import { Stack, Box, Typography, Button } from "@mui/material"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HOME_ROUTE } from "../../constants/routes"
import { COMMIG_SOON } from "../../constants/titles"
import { global_flex } from "../../styles"
import { changeTitle } from "../../utils/basic"
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
        <Box sx={{ overflow: "hidden", width: { xs: "100%" }, ...global_flex }}>
          <img
            src={commingSoonPng}
            alt="Comming soon image"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "50%" }, ...global_flex, flexDirection: "column" }}>
          <Typography variant="h5" color="text.primary" align="center">
            We are under construction. Check back for an update soon.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(HOME_ROUTE)}
            sx={{ mx: "auto", mt: 2 }}
          >
            Home page
          </Button>
        </Box>
      </Stack>
    </>
  )
}
