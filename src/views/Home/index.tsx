import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import { changeTitle } from "../../utils/basic"
import { Fab, Box, } from "@mui/material"
import { HOME_TITLE } from "../../constants/titles"
import UserHomeCard from "../../components/Cards/UserHomeCard"
import MainMenu from "../../components/Menus/MainMenu"
import MenuIcon from "@mui/icons-material/Menu"
import { floatButton, section_scroll } from "../../styles"
import { menu_container_desktop } from "../../styles/menu"
import { Outlet } from "react-router-dom"
import Grid from "@mui/material/Unstable_Grid2"
import { container_grid } from "../../styles/container"

export default function Home() {
  const [open, setOpen] = useState(false)

  const handleChange = () => {
    setOpen((open) => !open)
  }

  useEffect(() => { changeTitle(HOME_TITLE) }, [])

  return (
    <>
      <Grid container rowSpacing={2} disableEqualOverflow sx={{ ...container_grid, height: window.innerHeight }}>
        <Grid xs={12}>
          <Header />
        </Grid>

        <Grid xs={12} sm={4} md={2.5}>
          <Box sx={{ ...menu_container_desktop, left: { xs: (open ? 0 : -1000), sm: 0 }, }}>
            <UserHomeCard />

            <MainMenu />
          </Box>
        </Grid>

        <Grid xs={12} sm={8} md={9.5}>
          <Box sx={section_scroll}>
            <Outlet />
          </Box>
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
    </>
  )
}
