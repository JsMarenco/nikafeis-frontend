import React, { ReactNode, useEffect, useState } from "react"

// Third-party dependencies
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

// Current project dependencies
import AppRoutes from "constants/app/routes"
import { RootState } from "../app/store"
import CustomLoader from "../components/CustomLoader"
import { setMainUser } from "../features/users/userSlice"
import { getFromLocalStorage } from "../utils/basic"

interface AuthInterface {
  children: ReactNode
}

export default function IsAuthenticated(props: AuthInterface) {
  const state = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const currentPath = location.pathname

    const existUser = getFromLocalStorage("MAIN_USER")

    // if the user is saved in localstorage but is not logged
    // the app will saved tha's info in the store
    // if for any reason the user saved in the localstorage is removed
    // will not be a problem cause the user still logged in the app
    // if the user reload the page they should have to log in
    if (existUser && !state.isLogin) {
      dispatch(setMainUser(existUser))

      currentPath === AppRoutes.login && navigate(AppRoutes.home)
      currentPath === AppRoutes.register && navigate(AppRoutes.home)
    }

    if (!existUser && !state.isLogin) {
      // only those routes the user can be visit
      const isInLoginForm = currentPath !== AppRoutes.login
      const isInRegisterForm = currentPath !== AppRoutes.register
      const isInResetPasswordForm = currentPath !== AppRoutes.resetPassword

      if (isInLoginForm && isInRegisterForm && isInResetPasswordForm) {
        navigate(AppRoutes.login)
      }
    }

    setLoading(false)
  }, [location])

  return (
    <>
      {
        loading ? (
          <CustomLoader />
        ) : (
          <>
            {props.children}
          </>
        )
      }
    </>
  )
}
