import React from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { Outlet, useLocation } from "react-router-dom"
import FriendRequestReceive from "../FriendRequestReceive"
import Friends from "../Friends"
import { FRIENDS_SECTION_ROUTE } from "../../constants/routes"

export default function FriendsSection() {
  const location = useLocation()

  return (
    <>
      <Grid container spacing={2}>
        {
          location.pathname === FRIENDS_SECTION_ROUTE && (
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
