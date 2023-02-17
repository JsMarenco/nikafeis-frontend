import React, { useEffect } from "react"

// Third-party dependencies
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

// Current project dependencies
import AppRoutes from "constants/app/routes"
import CustomLoader from "../../components/CustomLoader"
import { logout } from "../../features/users/userSlice"

export default function Logout() {
  const navigate = useNavigate()
  const dispath = useDispatch()

  useEffect(() => {
    dispath(logout())

    navigate(AppRoutes.logout)
  }, [])

  return (
    <CustomLoader />
  )
}
