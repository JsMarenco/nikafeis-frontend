import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
// import ForgotPasswordButton from "../ForgotPassworButton"
import { Typography, Stack, Button, Paper } from "@mui/material"
import { RootState } from "../../app/store"
import { messageContext } from "../../context/MessageContext"
import { useDispatch, useSelector } from "react-redux"
import CustomTextfield from "../CustomTextfield"
import updateAccountInfoService from "../../services/api/updateAccountInfoService"
import { setMainUser } from "../../features/users/userSlice"
import { PROFILE_UPDATE_MESSAGE } from "../../constants/messages"
import { MAIN_USER_PROFILE_ROUTE } from "../../constants/routes"
import { account__settings_container, account__settings_form__container, account__settings_password__button } from "../../styles/accountSetting"

export default function EditAccountInfo() {
  const { handleMessage } = useContext(messageContext)
  const state = useSelector((state: RootState) => state.user)
  const dispath = useDispatch()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    const { data, success, statusCode, message } = await updateAccountInfoService(state.user.id, state.token)

    if (success && statusCode !== 400) {
      dispath(setMainUser(data))
      handleMessage(PROFILE_UPDATE_MESSAGE)
      navigate(MAIN_USER_PROFILE_ROUTE)
    }

    if (statusCode === 400) {
      handleMessage(message)
    }
  }

  return (
    <Stack spacing={2} sx={account__settings_container}>
      <Typography variant="h5" color="text.primary" align="center">
        Edit account information
      </Typography>

      <Paper component="form" id="edit-account-form" sx={{ ...account__settings_form__container, }}>
        <Stack direction={{ sm: "row", xs: "column" }} spacing={2} sx={{ mb: 2 }}>
          <CustomTextfield name="firstName" label="First name" placeholder={state.user.firstName} />

          <CustomTextfield name="lastName" label="Last name" placeholder={state.user.lastName} />
        </Stack>

        <Stack spacing={2}>
          <CustomTextfield
            name="username"
            label="Username"
            placeholder={state.user.username}
          />

          <CustomTextfield
            name="email"
            label="Email"
            placeholder={state.user.email}
            type="email"
          />

          <CustomTextfield
            name="description"
            label="Description"
            placeholder={state.user.description ? state.user.description : "I am a new user"}
          />

          <CustomTextfield
            name="website"
            label="Website"
            placeholder={state.user.website ? state.user.website : "https://www.example.com"}
          />

          <CustomTextfield
            name="password"
            label="Password"
            variant="outlined"
            type={"password"}
            placeholder="Password"
            onFieldChange={e => setPassword(e.target.value)}
          />
        </Stack>

        {/* <ForgotPasswordButton /> */}

        <Button
          variant="contained"
          color="primary"
          sx={account__settings_password__button}
          onClick={handleSubmit}
          disabled={!password}
        >
          Save changes
        </Button>
      </Paper>
    </Stack>
  )
}
