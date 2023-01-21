import React, { useContext, useEffect, useState } from "react"
import { PhotoCamera } from "@mui/icons-material"
import { IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../../app/store"
import { COVER_UPDATED_MESSAGE } from "../../../constants/messages"
import { MAIN_USER_PROFILE_ROUTE } from "../../../constants/routes"
import { messageContext } from "../../../context/MessageContext"
import { setMainUser } from "../../../features/users/userSlice"
import { UserPayloadInterface } from "../../../interface/user"
import { account__settings_form__container } from "../../../styles/accountSetting"
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"
import ClearIcon from "@mui/icons-material/Clear"
import updateUserCoverService from "../../../services/api/updateUserCoverService"
import { CoverForm } from "../../../constants/enums/cover"
import PreviewCover from "../../components/PreviewCover"

interface Props { icon_size: "small" | "large" | "medium" }

export default function CoverSettings(props: Props) {
  const { icon_size } = props

  const { handleMessage } = useContext(messageContext)
  const state = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File>()

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) { return }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const clearImage = () => { setSelectedFile(undefined), setPreview("") }

  const handleSubmit = async () => {
    const { data, success, message } = await updateUserCoverService(state.user.id, state.token)
    console.log("🚀 ~ file: index.tsx:43 ~ handleSubmit ~ data", data)

    if (success) {
      dispatch(setMainUser(data as UserPayloadInterface))
      handleMessage(COVER_UPDATED_MESSAGE)
      navigate(MAIN_USER_PROFILE_ROUTE)
    }

    handleMessage(message)
    setLoading(false)
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

  return (
    <>
      <Stack
        sx={account__settings_form__container}
        component="form"
        id={CoverForm.id}
        spacing={1.5}
      >
        <Typography variant="h6" color="text.primary" align="center">
          Update cover
        </Typography>

        <PreviewCover src={preview} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <label htmlFor={CoverForm.cover_input_file_id}>
            <input
              accept="image/*"
              id={CoverForm.cover_input_file_id}
              type="file"
              style={{ display: "none" }}
              onChange={onSelectFile}
              name={CoverForm.cover_input_file_name}
              disabled={loading}
            />

            <Tooltip title="Choose file" arrow>
              <IconButton
                color="primary"
                aria-label={CoverForm.cover_input_file_arial_label}
                component="span"
                disabled={loading}
                size={icon_size}
              >
                <PhotoCamera />
              </IconButton>
            </Tooltip>
          </label>

          {
            preview && (
              <>
                <Tooltip title="Delete image" arrow>
                  <IconButton
                    onClick={clearImage}
                    disabled={loading}
                    color="primary"
                    size={icon_size}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Save" arrow>
                  <IconButton
                    onClick={handleSubmit}
                    disabled={loading}
                    color="primary"
                    size={icon_size}
                  >
                    <CheckOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </>
            )
          }
        </Stack>
      </Stack>
    </>
  )
}
