import React, { ChangeEvent, FormEvent, useContext, useEffect, useState, } from "react"

// Third-party dependencies
import { Stack, Button, IconButton, Avatar, Tooltip, InputBase } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"

// Current project dependencies
import { RootState } from "../../app/store"
import inputStyles from "../../styles/components/input"
import cardStyles from "../../styles/components/cards"
import createNewPostService from "../../services/api/createNewPostService"
import getUserByUsernameService from "../../services/api/getUserByUsernameService"
import PriviewImage from "../components/PriviewImage"
import { messageContext } from "../../context/MessageContext"
import { setMainUser } from "../../features/users/userSlice"
import { CreatePostForm } from "../../constants/enums/createPost"

export default function CreatePost() {
  const state = useSelector((state: RootState) => { return state.user })
  const { handleMessage } = useContext(messageContext)
  const [loading, setLoading] = useState(false)
  const [showContentInput, setShowContentInput] = useState(false)
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState<File[]>([])
  const [preview, setPreview] = useState<string[]>([])
  const [postInfo, setPostInfo] = useState({
    [CreatePostForm.title_input_name]: "",
    [CreatePostForm.content_input_name]: ""
  })

  const onPostCreate = () => { setPreview([]), setSelectedFile([]) }

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostInfo({
      ...postInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()

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

    setPostInfo({
      [CreatePostForm.title_input_name]: "",
      [CreatePostForm.content_input_name]: ""
    })

    onPostCreate()
    setLoading(false)
  }

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview([])
      return
    }

  }, [selectedFile])

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

  return (
    <Stack
      spacing={2}
      sx={cardStyles.container}
      component={"form"}
      id={CreatePostForm.id}
      onSubmit={handleSubmit}
    >
      <InputBase
        id={CreatePostForm.title_input_id}
        role={CreatePostForm.title_input_role}
        name={CreatePostForm.title_input_name}
        type={CreatePostForm.title_input_type}
        value={postInfo[CreatePostForm.title_input_name]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        autoComplete={CreatePostForm.autocomplete}
        placeholder={CreatePostForm.title_input_placeholder}
        fullWidth
        disabled={loading}
        sx={inputStyles.input}
        onClick={() => setShowContentInput(true)}
        startAdornment={
          <Avatar
            src={state.user.avatarUrl}
            alt={`${state.fullName}-avatar`}
            sx={{ ...cardStyles.userAvatar, cursor: "initial" }}
          >
            {state.user.firstName.charAt(0)}
          </Avatar>
        }
      />

      {
        showContentInput && (
          <>
            <InputBase
              id={CreatePostForm.content_input_id}
              role={CreatePostForm.content_input_role}
              name={CreatePostForm.content_input_name}
              type={CreatePostForm.content_input_type}
              value={postInfo[CreatePostForm.content_input_name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              autoComplete={CreatePostForm.autocomplete}
              placeholder={CreatePostForm.content_input_placeholder.replace("%user_firsname", state.user.firstName)}
              fullWidth
              multiline
              rows={4}
              disabled={loading}
              sx={inputStyles.input}
            />

            {
              preview && (
                <PriviewImage imagesUrls={preview || []} clearImage={clearImage} />
              )
            }

            <Stack spacing={2} direction="row" justifyContent={"space-between"} alignItems="center">
              <label htmlFor={CreatePostForm.post_images_input_file_id}>
                <input
                  accept="image/*"
                  id={CreatePostForm.post_images_input_file_id}
                  type={CreatePostForm.post_images_input_file_type}
                  style={{ display: "none" }}
                  onChange={onSelectFile}
                  name={CreatePostForm.post_images_input_file_name}
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
                type="submit"
                disabled={loading}
              >
                Post now
              </Button>
            </Stack>
          </>
        )
      }
    </Stack>
  )
}
