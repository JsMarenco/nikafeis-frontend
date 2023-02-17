import React, { useEffect, useState } from "react"

// Third-party dependencies
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Stack } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Current project dependencies
import { RootState } from "../../app/store"
import { changeTitle } from "../../utils/basic"
import CustomLoader from "../../components/CustomLoader"
import getUserByUsernameService from "../../services/api/getUserByUsernameService"
import ProfileHeader from "../../components/components/ProfileHeader"
import CreatePost from "../../components/CreatePost"
import { setVisitedUser } from "../../features/users/visitedUserSlice"
import AboutUser from "../../components/components/AboutUser"
import ConnectionsList from "../../components/ConnectionsList"
import AppRoutes from "../../constants/app/routes"
import { setMainUser } from "features/users/userSlice"
import UserPosts from "components/UserPost"

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

      !state.user.username && navigate(AppRoutes.login)
      the_username === state.user.username && navigate(AppRoutes.mainUserProfile)

      usernameToFind = the_username === AppRoutes.userUsernameApp ? state.user.username : the_username as string

      const { data, statusCode, success } = await getUserByUsernameService(usernameToFind || "")

      if (success) {
        the_username !== AppRoutes.userUsernameApp ? dispatch(setVisitedUser(data)) : dispatch(setMainUser(data))

        changeTitle(`${data.firstName} ${data.lastName}`)

        setLoading(false)
      }

      if (statusCode === 404) {
        navigate(AppRoutes.userNotFound)
      }
    }

    getInfoByUser()
  }, [location, the_username])

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
              <Stack spacing={2}>
                <AboutUser />

                {
                  the_username === AppRoutes.userUsernameApp && (
                    <ConnectionsList variant="small" />
                  )
                }
              </Stack>
            </Grid>

            <Grid xs={12} md={8}>
              <Stack spacing={2}>
                {
                  the_username === AppRoutes.userUsernameApp && (
                    <CreatePost />
                  )
                }

                <UserPosts />
              </Stack>
            </Grid>
          </Grid>
        )
      }
    </>
  )
}
