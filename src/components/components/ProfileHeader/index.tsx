import React, { useEffect, useState } from "react"
import { Avatar, Box, Typography, Stack, Grid } from "@mui/material"
import UserInterface from "../../../interface/user"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../../../app/store"
import { USER_USERNAME_APP_ROUTE } from "../../../constants/routes"
import { profile_about, profile_about_container, profile_about_titles, profile_avatar, profile_avatar_container, profile_cover, profile_cover_container } from "../../../styles/profile"
import { default_cover } from "../../../constants"
import UserOptions from "../../UserOptions"
import VisitorOption from "../../VisitorOptions"

export default function ProfileHeader() {
  const state = useSelector((state: RootState) => state.user)
  const visitedUserState = useSelector((state: RootState) => state.visitedUser)
  const { the_username } = useParams()
  const [userInfo, setUserInfo] = useState<UserInterface>({} as UserInterface)

  useEffect(() => {
    if (the_username === USER_USERNAME_APP_ROUTE || the_username === state.user.username) {
      setUserInfo(state.user)
    } else {
      setUserInfo(visitedUserState.user as UserInterface)
    }
  }, [the_username, state.user, visitedUserState.user])

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ ...profile_cover_container, px: 0, }}>
          <img
            style={{
              position: "absolute",
              backgroundImage: `url(${userInfo.coverImageUrl ? userInfo.coverImageUrl : default_cover})`,
              ...profile_cover,
            }}
          />

          <Box sx={profile_about_container}>
            <Box sx={{ ...profile_avatar_container }}>
              <Avatar
                src={userInfo.avatarUrl}
                alt={`${userInfo.firstName} ${userInfo.lastName}`}
                variant="circular"
                sizes="large"
                sx={{ ...profile_avatar, }}
              />
            </Box>

            <Box flexGrow={1} sx={profile_about}>
              <Box>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={profile_about_titles}
                >
                  {`${userInfo.firstName} ${userInfo.lastName}`}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={profile_about_titles}
                >
                  {userInfo.email}
                </Typography>
              </Box>

              <Stack
                spacing={1}
                direction="row"
                justifyItems="center"
              >
                {
                  the_username === USER_USERNAME_APP_ROUTE || the_username === state.user.username ? (
                    <UserOptions />
                  ) : (
                    <VisitorOption />
                  )
                }
              </Stack>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  )
}
