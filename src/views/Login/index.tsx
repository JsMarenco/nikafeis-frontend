import React, { useContext, useEffect, useState } from "react"
import { Box, Button, Divider, Stack, Typography, Grid, TextField, Icon } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { changeTitle } from "../../utils/basic"
import { messageContext } from "../../context/MessageContext"
import loginUserService from "../../services/api/loginUserService"
import { useDispatch } from "react-redux"
import { setMainUser } from "../../features/users/userSlice"
import { HOME_ROUTE, REGISTER_ROUTE, RESET_PASSWORD } from "../../constants/routes"
import { LOGIN } from "../../constants/titles"
import { login_form, Login_form_title, login_image_container } from "../../styles/login-register"
import { LoginForm, LoginFormTexts } from "../../constants/enums/login"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loginImage = require("../../assets/login-bg.jpg")

export default function Login() {
  const navigate = useNavigate()
  const [imageContainerHeight, setImageContainerHeight] = useState(window.innerHeight)

  useEffect(() => { changeTitle(LOGIN) }, [])
  useEffect(() => { setImageContainerHeight(window.innerHeight) }, [window.innerHeight])

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item display={{ xs: "none", sm: "flex" }} sm={6}>
        <Box sx={{ ...login_image_container, height: imageContainerHeight }}>,
          <img src={loginImage} alt="Login image" style={{ width: "100%" }} />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box sx={login_form}>
          <Typography
            variant="h2"
            color="text.primary"
            align="center"
            sx={Login_form_title}
          >
            {LoginFormTexts.form_title}
          </Typography>

          <Stack spacing={2} sx={{ my: 2 }} component={"form"} id={LoginForm.id}>
            <Form />
          </Stack>

          <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
            <Typography variant="body2" color="text.primary">{LoginFormTexts.unregistered_user}</Typography>

            <Button
              variant="text"
              color="primary"
              onClick={() => navigate(REGISTER_ROUTE)}
              size={LoginForm.button_size}
            >
              {LoginFormTexts.register_button}
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  )
}

const Form = () => {
  const dispatch = useDispatch()
  const { handleMessage } = useContext(messageContext)
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState({ [LoginForm.email_input_name]: "", [LoginForm.password_input_name]: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value, })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { statusCode, message, success, data } = await loginUserService()

    if (statusCode !== 200 && !success) {
      handleMessage(message)
      setLoading(false)
      setLoginInfo({ [LoginForm.email_input_name]: "", [LoginForm.password_input_name]: "" })
    }

    if (statusCode === 200 && success) {
      handleMessage(message)
      dispatch(setMainUser(data))

      setTimeout(() => { navigate(HOME_ROUTE) }, 1000)
    }
  }

  return (
    <>
      <TextField
        disabled={loading}
        id={LoginForm.email_input_id}
        role={LoginForm.email_input_role}
        name={LoginForm.email_input_name}
        type={LoginForm.email_input_type}
        value={loginInfo[LoginForm.email_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={LoginForm.autocomplete_inputs}
        placeholder={LoginForm.email_input_placeholder}
        size={LoginForm.input_size}
        InputProps={{ startAdornment: (<Icon sx={{ mr: 2 }}><EmailOutlinedIcon /></Icon>) }}
      />

      <TextField
        disabled={loading}
        id={LoginForm.password_input_id}
        role={LoginForm.password_input_role}
        name={LoginForm.password_input_name}
        type={showPassword ? LoginForm.password_input_type_show : LoginForm.password_input_type_hidden}
        value={loginInfo[LoginForm.password_input_name]}
        onChange={(e) => handleChange(e)}
        autoComplete={LoginForm.autocomplete_inputs}
        placeholder={LoginForm.password_input_placeholder}
        size={LoginForm.input_size}
        InputProps={{
          startAdornment: (
            <Icon sx={{ mr: 2, cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
            </Icon>
          )
        }}
      />

      <Divider flexItem />

      <Stack  spacing={2} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" color="text.primary">{LoginFormTexts.forgot_password}</Typography>

        <Button
          variant="text"
          color="primary"
          onClick={() => navigate(RESET_PASSWORD)}
          size={LoginForm.button_size}
        >
          {LoginFormTexts.forgot_password_button}
        </Button>
      </Stack>


      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        size={LoginForm.button_size}
      >
        {LoginFormTexts.login_button}
      </Button>
    </>
  )
}
