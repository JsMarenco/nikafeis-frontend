import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Stack, Typography } from "@mui/material"
import { changeTitle } from "../../utils/basic"
import { HOME_ROUTE, } from "../../constants/routes"
import { PAGE_NOT_FOUND } from "../../constants/titles"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const image_404 = require("../../assets/404.png")

export default function ErrorPage() {
  const navigate = useNavigate()

  useEffect(() => { changeTitle(PAGE_NOT_FOUND) }, [])

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", maxWidth: "800px", width: "90%", height: window.innerHeight }}
      >
        <Box sx={{ height: "350px", overflow: "hidden" }}>
          <img
            src={image_404}
            alt="Man thinking"
            style={{ height: "100%" }}
          />
        </Box>

        <Typography variant="h3" color="text.primary">
          Oops! It looks like you are lost.
        </Typography>

        <Typography variant="h6" color="text.primary">
          The page you are looking for is not available. Try to search again or use the go to.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(HOME_ROUTE)}
        >
          Home page
        </Button>
      </Stack>
    </>
  )
}
