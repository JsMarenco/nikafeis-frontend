import React, { useEffect, useState, useContext } from "react"
// import { getCommentData } from "../../../services/comments"
import { Avatar, Stack, IconButton, Box, Button, InputBase, } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import { CreateCommentInterface } from "../../interface/commet"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import createNewCommentService from "../../services/api/createNewCommentService"
import { messageContext } from "../../context/MessageContext"
import { global_flex, user__avatar } from "../../styles"
import { input } from "../../styles/inputs"

export default function CreateComment(props: CreateCommentInterface) {
  const { postId = "", fetchCommentsUpdated } = props

  const { handleMessage } = useContext(messageContext)
  const state = useSelector((state: RootState) => state.user)

  const [loading, setLoading] = useState(false)

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState("")

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

  const onSubmit = async () => {
    setLoading(true)

    const { statusCode, message, success } = await createNewCommentService(state.user.id, state.token, postId)

    if (statusCode === 201 && success) {
      handleMessage(message)
      fetchCommentsUpdated()
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        ...global_flex,
        width: "100%",
        flexDirection: "column",
        margin: "0 auto",
      }}
      component="form"
      id="create-comment-form"
    >
      {
        preview && (
          <>
            <img src={preview} alt="preview" style={{ height: "auto", maxWidth: "250px", margin: "0 auto", }} />

            <Button
              variant="text"
              color="primary"
              sx={{ display: "block", margin: "0 auto", width: "150px", height: "auto", mt: 2, }}
              onClick={() => setSelectedFile(undefined)}
              disabled={loading}
            >
              Delete
            </Button>
          </>
        )
      }

      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        sx={{
          width: "100%",
          mt: 2,
        }}
      >
        <Avatar
          sizes="small"
          src={state.user.avatarUrl}
          alt={`${state.user.firstName}-${state.user.lastName}`}
          sx={user__avatar}
        >
          {state.user.firstName.charAt(0)}
        </Avatar>

        <InputBase
          name="contentInput"
          disabled={loading}
          placeholder="Add a comment"
          fullWidth
          autoComplete="off"
          sx={input}
        />

        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={onSelectFile}
            name="comment_image_url"
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

        <IconButton
          aria-label="Comment"
          disabled={loading}
          sx={{ ml: 2 }}
          onClick={onSubmit}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}
