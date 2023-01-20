import React, { useContext, useEffect, useState, } from "react"
import { Box, Divider, Stack, Button, IconButton, Avatar, Tooltip, Paper, InputBase } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import PriviewImage from "../components/PriviewImage"
import { messageContext } from "../../context/MessageContext"
import createNewPostService from "../../services/api/createNewPostService"
import { setMainUser } from "../../features/users/userSlice"
import getUserByUsernameService from "../../services/api/getUserByUsernameService"
import { post__card_create__form, post__card_create__form_container } from "../../styles/post"
import { global_flex, user__avatar } from "../../styles"
import { input } from "../../styles/inputs"

export default function CreatePost() {
  const state = useSelector((state: RootState) => { return state.user })
  const dispatch = useDispatch()
  const { handleMessage } = useContext(messageContext)
  const [name, setName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File[]>([])
  const [preview, setPreview] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [postInfo, setPostInfo] = useState({ titleInput: "", contentInput: "" })
  const [showContentInput, setShowContentInput] = useState(false)

  const clearImage = (index: number) => {
    setSelectedFile(prevState => {
      const newSelectedFile = [...prevState]
      newSelectedFile.splice(index, 1)
      return newSelectedFile
    })
    setPreview(prevState => {
      const newPreview = [...prevState]
      newPreview.splice(index, 1)
      return newPreview
    })
  }

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview([])
      return
    }

  }, [selectedFile])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()

      reader.onloadend = () => {
        setPreview(prevState => [...prevState, reader.result as string])
      }

      reader.readAsDataURL(file)
      setSelectedFile(prevState => [...prevState, file])
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    const { statusCode, success, message } = await createNewPostService(state.user.id, state.token)

    // check if the something went wrong in the request
    if (statusCode !== 201 && !success) {
      handleMessage(message)
    }

    if (success) {
      const { statusCode, success, message, data } = await getUserByUsernameService(state.user.username)

      // getting info from main user to updates the posts array
      if (!success && statusCode !== 200) {
        handleMessage(message)
      }

      if (success) {
        success && dispatch(setMainUser(data))
      }
    }
    handleMessage(message)

    setPostInfo({ titleInput: "", contentInput: "" })
    onPostCreate()
    setLoading(false)
  }

  const onPostCreate = () => {
    // Clear the preview and selected file arrays
    setPreview([])
    setSelectedFile([])

  }

  useEffect(() => {
    if (state) {
      setName(state.user.firstName)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInfo({
      ...postInfo,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Paper sx={post__card_create__form_container} component={"form"} id="create-post-form">
      <Box sx={post__card_create__form}>

        <Stack spacing={2} sx={{ width: "100%", }}>
          <Box sx={{ ...global_flex, justifyContent: "left" }}>
            <Avatar
              src={state.user.avatarUrl}
              alt={`${state.user.firstName}-${state.user.lastName}-avatar`}
              sx={{ ...user__avatar, cursor: "initial" }}
            >
              {state.user.firstName.charAt(0)}
            </Avatar>

            <InputBase
              name="titleInput"
              placeholder="Today is happy day"
              disabled={loading}
              value={postInfo.titleInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              fullWidth
              autoComplete="off"
              onClick={() => setShowContentInput(true)}
              sx={input}
            />
          </Box>

          <InputBase
            name="contentInput"
            placeholder={`What's on your mind, ${name}?`}
            fullWidth
            autoComplete="off"
            multiline
            rows={4}
            disabled={loading}
            value={postInfo.contentInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            sx={{ display: showContentInput ? "block" : "none", ...input, }}
          />

          <PriviewImage imagesUrls={preview || []} clearImage={clearImage} />
        </Stack>
      </Box>

      {
        showContentInput && (
          <>
            <Divider sx={{ mt: 2, mb: 2 }} />

            <Stack spacing={2} direction="row" justifyContent={"space-between"} alignItems="center">
              <label htmlFor="contained-button-file">
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={onSelectFile}
                  name="post_images"
                  disabled={loading}
                  multiple
                />

                <Tooltip title="Upload an image" arrow>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    disabled={loading}
                  >
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
              </label>

              <Button
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: "50px", }}
                onClick={handleSubmit}
                disabled={loading}
              >
                Post
              </Button>
            </Stack>
          </>
        )
      }
    </Paper>
  )
}
