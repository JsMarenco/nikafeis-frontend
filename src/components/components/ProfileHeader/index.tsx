import React, { useEffect, useState } from "react"

// Third-party dependencies
import { Avatar, Box, Typography, Stack, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// Current project dependencies
import { RootState } from "../../../app/store"
import { USER_USERNAME_APP_ROUTE } from "../../../constants/routes"
import { default_cover } from "../../../constants"
import UserOptions from "../../UserOptions"
import VisitorOption from "../../VisitorOptions"
import IUser from "../../../interface/users"
import profileStyles from "../../../styles/pages/profile"

export default function ProfileHeader() {
  const state = useSelector((state: RootState) => state.user)
  const visitedUserState = useSelector((state: RootState) => state.visitedUser)
  const { the_username } = useParams()
  const [userInfo, setUserInfo] = useState<IUser>({} as IUser)

  useEffect(() => {
    if (the_username === USER_USERNAME_APP_ROUTE || the_username === state.user.username) {
      setUserInfo(state.user)
    } else {
      setUserInfo(visitedUserState.user as IUser)
    }
  }, [the_username, state.user, visitedUserState.user])

  return (
    <>
      <Grid item xs={12}>
        <Box sx={profileStyles.coverContainer}>
          <img
            style={{
              backgroundImage: `url(${userInfo.coverImageUrl ? userInfo.coverImageUrl : default_cover})`,
              ...profileStyles.cover,
              border: "0px"
            }}
          />

          <Box sx={profileStyles.aboutContainer}>
            <Box sx={profileStyles.avatarContainer}>
              <Avatar
                src={userInfo.avatarUrl}
                alt={`${userInfo.firstName} ${userInfo.lastName}`}
                variant="circular"
                sizes="large"
                sx={profileStyles.avatar}
              />
            </Box>

            <Box flexGrow={1} sx={profileStyles.about}>
              <Box>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={profileStyles.aboutTitles}
                >
                  {`${userInfo.firstName} ${userInfo.lastName}`}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={profileStyles.aboutTitles}
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
