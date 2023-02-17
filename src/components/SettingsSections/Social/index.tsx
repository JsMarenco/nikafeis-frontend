import React, { useContext, useState } from "react"

// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2"
import { Icon, InputBase, Stack, Typography, Button } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import LockIcon from "@mui/icons-material/Lock"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// Current project dependencies
import { SocialSettingsForm } from "../../../constants/enums/socialSettings"
import updateSocialInfoService from "../../../services/api/updateSocialInfoService"
import { RootState } from "../../../app/store"
import { PROFILE_UPDATE_MESSAGE } from "../../../constants/messages"
import { messageContext } from "../../../context/MessageContext"
import { setMainUser } from "../../../features/users/userSlice"
import settingsStyles from "styles/pages/settings"
import AppRoutes from "constants/app/routes"
import inputStyles from "styles/components/input"

export default function SocialSettings() {
  const state = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispath = useDispatch()
  const { handleMessage } = useContext(messageContext)
  const [socialInfo, setSocialInfo] = useState({
    [SocialSettingsForm.facebook_input_name]: "",
    [SocialSettingsForm.github_input_name]: "",
    [SocialSettingsForm.linkedin_input_name]: "",
    [SocialSettingsForm.instagram_input_name]: "",
    [SocialSettingsForm.twitter_input_name]: "",
    [SocialSettingsForm.password_input_name]: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSocialInfo({ ...socialInfo, [e.target.name]: e.target.value, })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { data, statusCode, message, success } = await updateSocialInfoService(state.user.id, state.token)

    if (success && statusCode !== 400) {
      dispath(setMainUser(data))
      handleMessage(PROFILE_UPDATE_MESSAGE)
      navigate(AppRoutes.mainUserProfile)
    }

    if (statusCode === 400) {
      handleMessage(message)
      setLoading(false)
    }
  }

  return (
    <Grid xs={12} component="form" id={SocialSettingsForm.id}>
      <Stack spacing={2}>
        <Stack sx={settingsStyles.socialInputContainer} spacing={2} direction={{ xs: "column", sm: "row" }}>
          <InputBase
            disabled={loading}
            id={SocialSettingsForm.facebook_input_id}
            role={SocialSettingsForm.facebook_input_role}
            name={SocialSettingsForm.facebook_input_name}
            type={SocialSettingsForm.facebook_input_type}
            value={socialInfo[SocialSettingsForm.facebook_input_name]}
            onChange={(e) => handleChange(e)}
            autoComplete={SocialSettingsForm.autocomplete_inputs}
            placeholder={SocialSettingsForm.facebook_input_placeholder}
            size={SocialSettingsForm.input_size}
            sx={inputStyles.input}
            startAdornment={
              <FacebookIcon
                sx={{ mr: 1.5, color: "text.primary" }}
                fontSize={SocialSettingsForm.icon_size}
              />
            }
          />

          <Typography variant="h6" color="text.primary" flexGrow={1}>
            {`${SocialSettingsForm.facebook_url}${socialInfo[SocialSettingsForm.facebook_input_name]}`}
          </Typography>
        </Stack>

        <Stack sx={settingsStyles.socialInputContainer} spacing={2} direction={{ xs: "column", sm: "row" }}>
          <InputBase
            disabled={loading}
            id={SocialSettingsForm.github_input_id}
            role={SocialSettingsForm.github_input_role}
            name={SocialSettingsForm.github_input_name}
            type={SocialSettingsForm.github_input_type}
            value={socialInfo[SocialSettingsForm.github_input_name]}
            onChange={(e) => handleChange(e)}
            autoComplete={SocialSettingsForm.autocomplete_inputs}
            placeholder={SocialSettingsForm.github_input_placeholder}
            size={SocialSettingsForm.input_size}
            sx={inputStyles.input}

            startAdornment={
              <GitHubIcon
                sx={{ mr: 1.5, color: "text.primary" }}
                fontSize={SocialSettingsForm.icon_size}
              />
            }
          />

          <Typography variant="h6" color="text.primary" flexGrow={1}>
            {`${SocialSettingsForm.github_url}${socialInfo[SocialSettingsForm.github_input_name]}`}
          </Typography>
        </Stack>

        <Stack sx={settingsStyles.socialInputContainer} spacing={2} direction={{ xs: "column", sm: "row" }}>
          <InputBase
            disabled={loading}
            id={SocialSettingsForm.linkedin_input_id}
            role={SocialSettingsForm.linkedin_input_role}
            name={SocialSettingsForm.linkedin_input_name}
            type={SocialSettingsForm.linkedin_input_type}
            value={socialInfo[SocialSettingsForm.linkedin_input_name]}
            onChange={(e) => handleChange(e)}
            autoComplete={SocialSettingsForm.autocomplete_inputs}
            placeholder={SocialSettingsForm.linkedin_input_placeholder}
            size={SocialSettingsForm.input_size}
            sx={inputStyles.input}

            startAdornment={
              <LinkedInIcon
                sx={{ mr: 1.5, color: "text.primary" }}
                fontSize={SocialSettingsForm.icon_size}
              />
            }
          />

          <Typography variant="h6" color="text.primary" flexGrow={1}>
            {`${SocialSettingsForm.linkedin_url}${socialInfo[SocialSettingsForm.linkedin_input_name]}`}
          </Typography>
        </Stack>

        <Stack sx={settingsStyles.socialInputContainer} spacing={2} direction={{ xs: "column", sm: "row" }}>
          <InputBase
            disabled={loading}
            id={SocialSettingsForm.instagram_input_id}
            role={SocialSettingsForm.instagram_input_role}
            name={SocialSettingsForm.instagram_input_name}
            type={SocialSettingsForm.instagram_input_type}
            value={socialInfo[SocialSettingsForm.instagram_input_name]}
            onChange={(e) => handleChange(e)}
            autoComplete={SocialSettingsForm.autocomplete_inputs}
            placeholder={SocialSettingsForm.instagram_input_placeholder}
            size={SocialSettingsForm.input_size}
            sx={inputStyles.input}

            startAdornment={
              <InstagramIcon
                sx={{ mr: 1.5, color: "text.primary" }}
                fontSize={SocialSettingsForm.icon_size}
              />
            }
          />

          <Typography variant="h6" color="text.primary" flexGrow={1}>
            {`${SocialSettingsForm.instagram_url}${socialInfo[SocialSettingsForm.instagram_input_name]}`}
          </Typography>
        </Stack>

        <Stack sx={settingsStyles.socialInputContainer} spacing={2} direction={{ xs: "column", sm: "row" }}>
          <InputBase
            disabled={loading}
            id={SocialSettingsForm.twitter_input_id}
            role={SocialSettingsForm.twitter_input_role}
            name={SocialSettingsForm.twitter_input_name}
            type={SocialSettingsForm.twitter_input_type}
            value={socialInfo[SocialSettingsForm.twitter_input_name]}
            onChange={(e) => handleChange(e)}
            autoComplete={SocialSettingsForm.autocomplete_inputs}
            placeholder={SocialSettingsForm.twitter_input_placeholder}
            size={SocialSettingsForm.input_size}
            sx={inputStyles.input}

            startAdornment={
              <TwitterIcon
                sx={{ mr: 1.5, color: "text.primary" }}
                fontSize={SocialSettingsForm.icon_size}
              />
            }
          />

          <Typography variant="h6" color="text.primary" flexGrow={1}>
            {`${SocialSettingsForm.twitter_url}${socialInfo[SocialSettingsForm.twitter_input_name]}`}
          </Typography>
        </Stack>

        <Stack sx={settingsStyles.socialInputContainer} spacing={2} direction={{ xs: "column", sm: "row" }}>
          <InputBase
            disabled={loading}
            id={SocialSettingsForm.password_input_id}
            role={SocialSettingsForm.password_input_role}
            name={SocialSettingsForm.password_input_name}
            type={showPassword ? SocialSettingsForm.password_input_type_show : SocialSettingsForm.password_input_type_hidden}
            value={socialInfo[SocialSettingsForm.password_input_name]}
            onChange={(e) => handleChange(e)}
            autoComplete={SocialSettingsForm.autocomplete_inputs}
            placeholder={SocialSettingsForm.password_input_placeholder}
            size={SocialSettingsForm.input_size}
            sx={inputStyles.input}

            startAdornment={
              <Icon
                sx={{ mr: 2, cursor: "pointer" }}
                fontSize={SocialSettingsForm.icon_size}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <LockIcon fontSize={SocialSettingsForm.icon_size} />
                ) : (
                  <LockOpenIcon fontSize={SocialSettingsForm.icon_size} />
                )}
              </Icon>
            }
          />

          <Button size="large" variant="contained" color="primary" sx={{ borderRadius: "15px" }} onClick={handleSubmit} >
            Save
          </Button>
        </Stack>
      </Stack>
    </Grid>
  )
}
