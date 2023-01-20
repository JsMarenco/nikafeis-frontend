import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomLoader from "../../components/CustomLoader"
import { LOGOUT_ROUTE } from "../../constants/routes"
import { logout } from "../../features/users/userSlice"

export default function Logout() {
  const navigate = useNavigate()
  const dispath = useDispatch()

  useEffect(() => {
    dispath(logout())

    navigate(LOGOUT_ROUTE)
  }, [])

  return (
    <CustomLoader />
  )
}
