import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Container, Typography, Divider, Stack, } from "@mui/material"
import { RootState } from "../../app/store"
import { useDispatch, useSelector } from "react-redux"
import { changeTitle } from "../../utils/basic"
import { LOGIN_ROUTE, MAIN_USER_PROFILE_ROUTE, USER_NOT_FOUND_ROUTE, USER_USERNAME_APP_ROUTE } from "../../constants/routes"
import CustomLoader from "../../components/CustomLoader"
import getUserByUsernameService from "../../services/api/getUserByUsernameService"
import ProfileHeader from "../../components/components/ProfileHeader"
import PostsLst from "../../components/PostsLst"
import CreatePost from "../../components/CreatePost"
import { setVisitedUser } from "../../features/users/visitedUserSlice"
import AboutUser from "../../components/components/AboutUser"
import Grid from "@mui/material/Unstable_Grid2"

export default function Profile() {
  const state = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { the_username } = useParams()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInfoByUser = async () => {
      let usernameToFind = ""

      !state.user.username && navigate(LOGIN_ROUTE)
      the_username === state.user.username && navigate(MAIN_USER_PROFILE_ROUTE)

      if (the_username === USER_USERNAME_APP_ROUTE) {
        usernameToFind = state.user.username
      }

      if (the_username !== USER_USERNAME_APP_ROUTE) {
        usernameToFind = the_username as string
      }

      const { data, statusCode, success } = await getUserByUsernameService(usernameToFind || "")

      if (success) {
        the_username !== USER_USERNAME_APP_ROUTE && dispatch(setVisitedUser(data))
        changeTitle(`${data.firstName} ${data.lastName}`)

        setLoading(false)
      }

      if (statusCode === 404) {
        navigate(USER_NOT_FOUND_ROUTE)
      }
    }

    getInfoByUser()
  }, [location])

  return (
    <>
      {
        loading ? (
          <CustomLoader />
        ) : (
          <Grid container spacing={2} disableEqualOverflow>
            <Grid xs={12}>
              <ProfileHeader />
            </Grid>

            <Grid xs={12} md={4}>
              <AboutUser />
            </Grid>

            <Grid xs={12} md={8}>
              <Stack spacing={2}>
                <CreatePost />

                <PostsLst />
              </Stack>
            </Grid>
          </Grid>
        )
      }
    </>
  )
}
