import React from "react"
import { AppBar, Toolbar, Stack, Container, } from "@mui/material"
import Logo from "../Logo"
import SearchBar from "../SearchBar"

export default function Header() {
  return (
    <AppBar position="relative" sx={{ bgcolor: "background.default", boxShadow: 0 }}>
      <Toolbar sx={{ boxShadow: 0 }} >
        <Container maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1
          }}
        >
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
          >
            <Logo />

            <SearchBar />
          </Stack>

          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
          >
            {/* <AccountMenu /> */}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
