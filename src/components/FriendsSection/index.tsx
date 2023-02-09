import React from "react"

// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2"
import { Outlet, useLocation } from "react-router-dom"

// Current project dependencies
import FriendRequestReceive from "../FriendRequestReceive"
import Friends from "../Friends"
import AppRoutes from "constants/app/routes"

export default function FriendsSection() {
  const location = useLocation()

  return (
    <>
      <Grid container spacing={2}>
        {
          location.pathname === AppRoutes.friends && (
            <>
              <Grid xs={12}>
                <FriendRequestReceive variant="large" loadData={false} />
              </Grid>

              <Grid xs={12}>
                <Friends />
              </Grid>
            </>
          )
        }

        <Grid xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  )
}
