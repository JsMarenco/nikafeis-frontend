import React, { ReactNode, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { RootState } from "../app/store"
import CustomLoader from "../components/CustomLoader"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, RESET_PASSWORD } from "../constants/routes"
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

      currentPath === LOGIN_ROUTE && navigate(HOME_ROUTE)
      currentPath === REGISTER_ROUTE && navigate(HOME_ROUTE)
    }

    if (!existUser && !state.isLogin) {
      // only this routes the user can be visit
      const isInLoginForm = currentPath !== LOGIN_ROUTE
      const isInRegisterForm = currentPath !== REGISTER_ROUTE
      const isInResetPasswordForm = currentPath !== RESET_PASSWORD

      if (isInLoginForm && isInRegisterForm && isInResetPasswordForm) {
        navigate(LOGIN_ROUTE)
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



