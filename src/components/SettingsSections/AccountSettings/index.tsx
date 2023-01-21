import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Stack, Button, TextField, Divider } from "@mui/material"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { useDispatch, useSelector } from "react-redux"
import updateAccountInfoService from "../../../services/api/updateAccountInfoService"
import { setMainUser } from "../../../features/users/userSlice"
import { PROFILE_UPDATE_MESSAGE } from "../../../constants/messages"
import { MAIN_USER_PROFILE_ROUTE } from "../../../constants/routes"
import { account__settings_container, account__settings_form__container, account__settings_password__button } from "../../../styles/accountSetting"
import { AccountSettingForm } from "../../../constants/enums/accountSettings"
import Grid from "@mui/material/Unstable_Grid2"

export default function AccountSettings() {
  return (
    <Grid xs={12}>
      <Stack spacing={2} sx={account__settings_container}>
        <Stack spacing={2} component={"form"} sx={{ ...account__settings_form__container, }} id={AccountSettingForm.id}>
          <Form />
        </Stack>
      </Stack>
    </Grid>
  )
}

const Form = () => {
  const state = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(false)
  const { handleMessage } = useContext(messageContext)
  const dispath = useDispatch()
  const navigate = useNavigate()
  const [AccountSettingInfo, setAccountSettingInfo] = useState({
    [AccountSettingForm.firstName_input_name]: state.user.firstName,
    [AccountSettingForm.lastName_input_name]: state.user.lastName,
    [AccountSettingForm.email_input_name]: state.user.email,
    [AccountSettingForm.username_input_name]: state.user.username,
    [AccountSettingForm.description_input_name]: state.user.description,
    [AccountSettingForm.website_input_name]: state.user.website,

    [AccountSettingForm.password_input_name]: "",
  })

  const handleSubmit = async () => {
    const { data, success, statusCode, message } = await updateAccountInfoService(state.user.id, state.token)

    if (success && statusCode !== 400) {
      dispath(setMainUser(data))
      handleMessage(PROFILE_UPDATE_MESSAGE)
      navigate(MAIN_USER_PROFILE_ROUTE)
    }

    if (statusCode === 400) {
      handleMessage(message)
      setLoading(false)
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAccountSettingInfo({ ...AccountSettingInfo, [e.target.name]: e.target.value, })
  }

  return (
    <>
      <Stack direction={{ sm: "row", xs: "column" }} spacing={2}>
        <TextField
          disabled={loading}
          id={AccountSettingForm.firstName_input_id}
          role={AccountSettingForm.firstName_input_role}
          name={AccountSettingForm.firstName_input_name}
          type={AccountSettingForm.firstName_input_type}
          value={AccountSettingInfo[AccountSettingForm.firstName_input_name]}
          onChange={(e) => handleChange(e)}
          autoComplete={AccountSettingForm.autocomplete_inputs}
          placeholder={AccountSettingForm.firstName_input_placeholder}
          size={AccountSettingForm.input_size}
          fullWidth
        />

        <TextField
          disabled={loading}
          id={AccountSettingForm.lastName_input_id}
          role={AccountSettingForm.lastName_input_role}
          name={AccountSettingForm.lastName_input_name}
          type={AccountSettingForm.lastName_input_type}
          value={AccountSettingInfo[AccountSettingForm.lastName_input_name]}
          onChange={(e) => handleChange(e)}
          autoComplete={AccountSettingForm.autocomplete_inputs}
          placeholder={AccountSettingForm.lastName_input_placeholder}
          size={AccountSettingForm.input_size}
          fullWidth
        />
      </Stack>

      <TextField
        disabled={loading}
        id={AccountSettingForm.email_input_id}
        role={AccountSettingForm.email_input_role}
        name={AccountSettingForm.email_input_name}
        type={AccountSettingForm.email_input_type}
        value={AccountSettingInfo[AccountSettingForm.email_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={AccountSettingForm.autocomplete_inputs}
        placeholder={AccountSettingForm.email_input_placeholder}
        size={AccountSettingForm.input_size}
        fullWidth
      />

      <TextField
        disabled={loading}
        id={AccountSettingForm.username_input_id}
        role={AccountSettingForm.username_input_role}
        name={AccountSettingForm.username_input_name}
        type={AccountSettingForm.username_input_type}
        value={AccountSettingInfo[AccountSettingForm.username_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={AccountSettingForm.autocomplete_inputs}
        placeholder={AccountSettingForm.username_input_placeholder}
        size={AccountSettingForm.input_size}
        fullWidth
      />

      <TextField
        disabled={loading}
        id={AccountSettingForm.description_input_id}
        role={AccountSettingForm.description_input_role}
        name={AccountSettingForm.description_input_name}
        type={AccountSettingForm.description_input_type}
        value={AccountSettingInfo[AccountSettingForm.description_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={AccountSettingForm.autocomplete_inputs}
        placeholder={AccountSettingForm.description_input_placeholder}
        size={AccountSettingForm.input_size}
        fullWidth
      />

      <TextField
        disabled={loading}
        id={AccountSettingForm.website_input_id}
        role={AccountSettingForm.website_input_role}
        name={AccountSettingForm.website_input_name}
        type={AccountSettingForm.website_input_type}
        value={AccountSettingInfo[AccountSettingForm.website_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={AccountSettingForm.autocomplete_inputs}
        placeholder={AccountSettingForm.website_input_placeholder}
        size={AccountSettingForm.input_size}
        fullWidth
      />

      <TextField
        disabled={loading}
        id={AccountSettingForm.password_input_id}
        role={AccountSettingForm.password_input_role}
        name={AccountSettingForm.password_input_name}
        type={AccountSettingForm.password_input_type_hidden}
        value={AccountSettingInfo[AccountSettingForm.password_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={AccountSettingForm.autocomplete_inputs}
        placeholder={AccountSettingForm.password_input_placeholder}
        size={AccountSettingForm.input_size}
      />

      <Divider flexItem />

      <Button
        variant="contained"
        color="primary"
        sx={account__settings_password__button}
        onClick={handleSubmit}
        disabled={!AccountSettingInfo[AccountSettingForm.password_input_name] || loading}
      >
        Save changes
      </Button>
    </>
  )
}
