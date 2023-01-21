import { Box, Typography, Button, Divider, Stack, TextField, Icon, Grid } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LOGIN_ROUTE } from "../../constants/routes"
import { changeTitle } from "../../utils/basic"
import { messageContext } from "../../context/MessageContext"
import registerNewUserService from "../../services/api/registerNewUserService"
import { REGISTER } from "../../constants/titles"
import { RegisterForm, RegisterFormTexts } from "../../constants/enums/register"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import { register_form, register_form_title, register_image_container } from "../../styles/login-register"
import { LoginFormTexts } from "../../constants/enums/login"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const registerImage = require("../../assets/login-bg-2.jpg")

export default function Register() {
  const [imageContainerHeight, setImageContainerHeight] = useState(window.innerHeight)
  const navigate = useNavigate()

  useEffect(() => { changeTitle(REGISTER) }, [])
  useEffect(() => { setImageContainerHeight(window.innerHeight) }, [window.innerHeight])

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item display={{ xs: "none", sm: "flex" }} sm={6}>
        <Box sx={{ ...register_image_container, height: imageContainerHeight }}>,
          <img src={registerImage} alt="Register image" style={{ width: "100%" }} />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box sx={register_form}>
          <Typography
            variant="h3"
            color="text.primary"
            align="center"
            sx={register_form_title}
          >
            {RegisterFormTexts.form_title}
          </Typography>

          <Stack spacing={2} sx={{ width: "100%", my: 2 }} component={"form"} id={RegisterForm.id}>
            <Form />
          </Stack>

          <Stack>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
              <Typography variant="body2" color="text.primary">{RegisterFormTexts.registered_user}</Typography>

              <Button
                variant="text"
                color="primary"
                onClick={() => navigate(LOGIN_ROUTE)}
                size={RegisterForm.button_size}
              >
                {RegisterFormTexts.login_button}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  )
}

const Form = () => {
  const navigate = useNavigate()
  const { handleMessage } = useContext(messageContext)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newUserInfo, setNewUserInfo] = useState({
    [RegisterForm.firstName_input_name]: "",
    [RegisterForm.lastName_input_name]: "",
    [RegisterForm.email_input_name]: "",
    [RegisterForm.password_input_name]: "",
    [RegisterForm.confirmPassword_input_name]: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value, })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { statusCode, message, success } = await registerNewUserService()

    if (statusCode !== 201 && !success) {
      handleMessage(message)
    }

    if (statusCode === 201 && success) {
      handleMessage(message)

      setNewUserInfo({
        [RegisterForm.firstName_input_name]: "",
        [RegisterForm.lastName_input_name]: "",
        [RegisterForm.email_input_name]: "",
        [RegisterForm.password_input_name]: "",
        [RegisterForm.confirmPassword_input_name]: ""
      })

      setTimeout(() => { navigate(LOGIN_ROUTE) }, 1000)
    }

    setLoading(false)
  }

  return (
    <>
      <Stack spacing={2} direction={{ sm: "row", xs: "column" }}>
        <TextField
          disabled={loading}
          id={RegisterForm.firstName_input_id}
          role={RegisterForm.firstName_input_role}
          name={RegisterForm.firstName_input_name}
          type={RegisterForm.firstName_input_type}
          value={newUserInfo[RegisterForm.firstName_input_name]}
          onChange={(e) => handleChange(e)}
          autoComplete={RegisterForm.autocomplete_inputs}
          placeholder={RegisterForm.firstName_input_placeholder}
          size={RegisterForm.input_size}
          InputProps={{ startAdornment: (<Icon sx={{ mr: 2 }}><PersonOutlinedIcon /></Icon>) }}
        />

        <TextField
          disabled={loading}
          id={RegisterForm.lastName_input_id}
          role={RegisterForm.lastName_input_role}
          name={RegisterForm.lastName_input_name}
          type={RegisterForm.lastName_input_type}
          value={newUserInfo[RegisterForm.lastName_input_name]}
          onChange={(e) => handleChange(e)}
          autoComplete={RegisterForm.autocomplete_inputs}
          placeholder={RegisterForm.lastName_input_placeholder}
          size={RegisterForm.input_size}
          InputProps={{ startAdornment: (<Icon sx={{ mr: 2 }}><PersonOutlinedIcon /></Icon>) }}
        />
      </Stack>

      <TextField
        disabled={loading}
        id={RegisterForm.email_input_id}
        role={RegisterForm.email_input_role}
        name={RegisterForm.email_input_name}
        type={RegisterForm.email_input_type}
        value={newUserInfo[RegisterForm.email_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={RegisterForm.autocomplete_inputs}
        placeholder={RegisterForm.email_input_placeholder}
        size={RegisterForm.input_size}
        InputProps={{ startAdornment: (<Icon sx={{ mr: 2 }}><EmailOutlinedIcon /></Icon>) }}
      />

      <TextField
        disabled={loading}
        id={RegisterForm.password_input_id}
        role={RegisterForm.password_input_role}
        name={RegisterForm.password_input_name}
        type={showPassword ? RegisterForm.password_input_type_show : RegisterForm.password_input_type_hidden}
        value={newUserInfo[RegisterForm.password_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={RegisterForm.autocomplete_inputs}
        placeholder={RegisterForm.password_input_placeholder}
        size={RegisterForm.input_size}
        InputProps={{
          startAdornment: (
            <Icon sx={{ mr: 2, cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
            </Icon>
          )
        }}
      />

      <TextField
        disabled={loading}
        id={RegisterForm.confirmPassword_input_id}
        role={RegisterForm.confirmPassword_input_role}
        name={RegisterForm.confirmPassword_input_name}
        type={showPassword ? RegisterForm.confirmPassword_input_type_show : RegisterForm.confirmPassword_input_type_hidden}
        value={newUserInfo[RegisterForm.confirmPassword_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={RegisterForm.autocomplete_inputs}
        placeholder={RegisterForm.confirmPassword_input_placeholder}
        size={RegisterForm.input_size}
        InputProps={{
          startAdornment: (
            <Icon sx={{ mr: 2, cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
            </Icon>
          )
        }}
      />

      <Divider flexItem />

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {LoginFormTexts.register_button}
      </Button>
    </>
  )
}
