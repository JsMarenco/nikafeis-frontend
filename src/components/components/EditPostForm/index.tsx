import React, { useContext, useEffect, useState } from "react"
import { Button, Dialog, DialogContent, DialogActions, Stack, InputBase, Avatar } from "@mui/material"
import { EditPostFormInterface } from "../../../interface/post"
import { messageContext } from "../../../context/MessageContext"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import updatePostService from "../../../services/api/updatePostService"
import { setMainUserPosts } from "../../../features/users/userSlice"
import { UpdatePostForm } from "../../../constants/enums/updatePost"
import { input } from "../../../styles/inputs"
import { user__avatar } from "../../../styles"
import getPostByIdService from "../../../services/api/getPostByIdService"

export default function EditPostForm(props: EditPostFormInterface) {
  const { open, handleCloseEditForm, postId } = props
  const { handleMessage } = useContext(messageContext)
  const state = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [postInfoUpdated, setPostInfoUpdated] = useState({
    [UpdatePostForm.title_updated_input_name]: "",
    [UpdatePostForm.content_updated_input_name]: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInfoUpdated({
      ...postInfoUpdated,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { success, message } = await updatePostService(state.user.id, postId, state.token)

    if (success) {
      dispatch(setMainUserPosts(state.posts))
    }

    handleMessage(message)
    setPostInfoUpdated({
      [UpdatePostForm.title_updated_input_name]: "",
      [UpdatePostForm.content_updated_input_name]: ""
    })

    handleCloseEditForm()
    setLoading(false)
  }

  const handleClose = () => {
    handleCloseEditForm()
    setPostInfoUpdated({
      [UpdatePostForm.title_updated_input_name]: "",
      [UpdatePostForm.content_updated_input_name]: ""
    })

    setLoading(false)
  }

  const getPostInfo = async () => {
    setLoading(true)
    const { data, success } = await getPostByIdService(props.postId)

    if (success) {
      setPostInfoUpdated({
        [UpdatePostForm.title_updated_input_name]: data.title,
        [UpdatePostForm.content_updated_input_name]: data.content
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    getPostInfo()
  }, [])

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ bgcolor: "background.paper", }}>
          <Stack spacing={2.5} id={UpdatePostForm.id} component="form">
            <InputBase
              id={UpdatePostForm.title_updated_input_id}
              role={UpdatePostForm.title_updated_input_role}
              name={UpdatePostForm.title_updated_input_name}
              type={UpdatePostForm.title_updated_input_type}
              value={postInfoUpdated[UpdatePostForm.title_updated_input_name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              autoComplete={UpdatePostForm.autocomplete}
              placeholder={UpdatePostForm.title_updated_input_placeholder}
              fullWidth
              sx={input}
              disabled={loading}
              startAdornment={
                <Avatar
                  src={state.user.avatarUrl}
                  alt={`${state.fullName}-avatar`}
                  sx={{ ...user__avatar, cursor: "initial" }}
                >
                  {state.user.firstName.charAt(0)}
                </Avatar>
              }
            />

            <InputBase
              id={UpdatePostForm.content_updated_input_id}
              role={UpdatePostForm.content_updated_input_role}
              name={UpdatePostForm.content_updated_input_name}
              type={UpdatePostForm.content_updated_input_type}
              value={postInfoUpdated[UpdatePostForm.content_updated_input_name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              autoComplete={UpdatePostForm.autocomplete}
              placeholder={UpdatePostForm.content_updated_input_placeholder.replace("%user_firsname", state.user.firstName)}
              fullWidth
              multiline
              rows={4}
              disabled={loading}
              sx={input}
            />
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{ bgcolor: "background.paper", }}>
          <Button variant="outlined" disabled={loading} onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="outlined" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
