import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import { changeTitle } from "../../utils/basic"
import { Grid, Fab, Box, } from "@mui/material"
import { HOME_TITLE } from "../../constants/titles"
import UserHomeCard from "../../components/Cards/UserHomeCard"
import MainMenu from "../../components/Menus/MainMenu"
import MenuIcon from "@mui/icons-material/Menu"
import { floatButton, section_scroll } from "../../styles"
import { menu_container_desktop } from "../../styles/menu"
import { Outlet } from "react-router-dom"

export default function Home() {
  const [open, setOpen] = useState(false)

  const handleChange = () => {
    setOpen((open) => !open)
  }

  useEffect(() => { changeTitle(HOME_TITLE) }, [])

  return (
    <Box sx={{ position: "fixed", height: "100vh", width: "100vw" }}>
      <Header />

      <Grid
        container
        direction="row"
        justifyContent={{ sm: "center", md: "initial" }}
        sx={{ pt: 2, bgcolor: "background.paper", }}
      >
        <Grid item xs={12} sm={3} md={2} sx={{
          ...menu_container_desktop,
          left: {
            xs: (open ? 0 : -1000),
            sm: 0
          },
        }}>
          <UserHomeCard />

          <MainMenu />
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={10}
          sx={section_scroll}
        >
          <Outlet />
        </Grid>
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        sx={floatButton}
        onClick={handleChange}
      >
        <MenuIcon />
      </Fab>
    </Box>
  )
}
