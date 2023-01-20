import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import ForgotPasswordButton from "../ForgotPassworButton"
import { Button, IconButton, Box, Stack, Typography, TextField, } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import ClearIcon from "@mui/icons-material/Clear"
import { useDispatch, useSelector } from "react-redux"
import { MAIN_USER_PROFILE_ROUTE } from "../../constants/routes"
import { RootState } from "../../app/store"
import { setMainUser } from "../../features/users/userSlice"
import { messageContext } from "../../context/MessageContext"
import PreviewAvatar from "../components/PreviewAvatar"
import updateUserAvatarService from "../../services/api/updateUserAvatarService"
import { AVATAR_UPDATED_MESSAGE, COVER_UPDATED_MESSAGE } from "../../constants/messages"
import updateUserCoverService from "../../services/api/updateUserCoverService"
import { UserPayloadInterface } from "../../interface/user"
import PreviewCover from "../components/PreviewCover"
import { account__settings_container, account__settings_form__container } from "../../styles/accountSetting"

interface Props {
  title: "avatar" | "cover",
}

export default function EditAvatarOrCover(props: Props) {
  const { title } = props

  const { handleMessage } = useContext(messageContext)
  const state = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)

  const clearImage = () => {
    setSelectedFile(undefined)
    setPreview("")
  }

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview("")
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    setLoading(true)
    let _data = {}
    let _success = false
    let _message = ""
    let _statusCode = 0

    if (title === "avatar") {
      const { data, success, message, statusCode } = await updateUserAvatarService(state.user.id, state.token)
      _data = data
      _success = success
      _message = message
      _statusCode = statusCode
    }

    if (title === "cover") {
      const { data, success, message, statusCode } = await updateUserCoverService(state.user.id, state.token)
      _data = data
      _success = success
      _message = message
      _statusCode = statusCode
    }


    if (_statusCode !== 200) {
      handleMessage(_message)
      setLoading(false)
    }

    if (_success) {
      dispatch(setMainUser(_data as UserPayloadInterface))
      handleMessage(title === "avatar" ? AVATAR_UPDATED_MESSAGE : COVER_UPDATED_MESSAGE)
      navigate(MAIN_USER_PROFILE_ROUTE)
    }
  }

  return (
    <Stack spacing={1} sx={account__settings_container}>
      <Typography variant="h5" color="text.primary" align="center">Edit {title}</Typography>

      <Box
        sx={account__settings_form__container}
        component="form"
        id={`edit-${title === "avatar" ? "avatar" : "cover"}-form`}
      >
        {title === "avatar" ? (<PreviewAvatar src={preview} />) : (<PreviewCover src={preview} />)}

        <Typography variant="subtitle1" color="text.primary" align="center" mb={2}>
          Select an image
        </Typography>

        <Stack spacing={2} direction="row" justifyContent={"center"}>

          <label htmlFor={`contained-button-file-${title === "avatar" ? "avatar" : "cover"}`}>
            <input
              accept="image/*"
              id={`contained-button-file-${title === "avatar" ? "avatar" : "cover"}`}
              type="file"
              style={{ display: "none" }}
              onChange={onSelectFile}
              name={title === "avatar" ? "user_avatar" : "user_cover"}
              disabled={loading}
            />

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              disabled={loading}
            >
              <PhotoCamera />
            </IconButton>
          </label>

          {
            preview && (
              <>
                <Button
                  variant="text"
                  color="primary"
                  onClick={clearImage}
                  sx={{
                    height: "40px",
                    borderRadius: "10px",
                  }}
                  startIcon={<ClearIcon />}
                  disabled={loading}
                >
                  Delete
                </Button>

                <Button
                  variant="text"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Update
                </Button>
              </>
            )
          }
        </Stack>

        <TextField
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          autoComplete="off"
          type={"password"}
          sx={{ mt: 2, mb: 2 }}
          placeholder="Password"
          required
        />

        {/* <ForgotPasswordButton /> */}
      </Box>
    </Stack>
  )
}
