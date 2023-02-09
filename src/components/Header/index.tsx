import React, { useState } from "react"

// Third-party dependencies
import { Stack, Box, IconButton, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Container, } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

// Current project dependencies
import Logo from "../Logo"
import SearchBar from "../SearchBar"
import headerStyles from "../../styles/layout/header"
import menuStyles from "styles/components/menu"
import MenuLinks, { ToggleThemeButton } from "components/Menus/MenuLinks/AccountMenuLinks"
import UserHomeCard from "components/Cards/UserHomeCard"
import { RootState } from "app/store"

export default function Header() {
  const state = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const location = useLocation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box component="header" sx={{ ...headerStyles.container, mb: 2 }}>
        <Container maxWidth="xl">
          <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
            <Stack spacing={1} direction="row" alignItems="center" justifyContent="initial">
              <Logo />

              {
                state.isLogin && (
                  <SearchBar />
                )
              }
            </Stack>

            <IconButton onClick={handleClick}>
              {!open ? (<MenuIcon />) : (<CloseIcon />)}
            </IconButton>
          </Stack>
        </Container>
      </Box>

      <Drawer
        open={open}
        anchor="right"
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: "background.default",
            backgroundImage: "none",
            p: 2,
          }
        }}
      >

        {
          state.isLogin && (
            <Box sx={{ mb: 2 }}>
              <UserHomeCard />
            </Box>

          )
        }

        {
          state.isLogin && MenuLinks.map((item, index) => (
            <ListItem
              key={`${item.link}_${index}`}
              disablePadding
              onClick={() => navigate(item.link)}
            >
              <ListItemButton
                sx={{
                  ...menuStyles.link,
                  bgcolor: (
                    location.pathname.startsWith(item.link) ?
                      "background.paper" : ""
                  ),
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>

                <ListItemText>
                  {item.label}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        }

        <ToggleThemeButton />
      </Drawer>
    </>
  )
}
