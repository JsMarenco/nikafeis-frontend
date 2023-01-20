import React, { useContext, useState } from "react"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from "@mui/material"
import CustomTextfield from "../../CustomTextfield"
import { EditPostFormInterface } from "../../../interface/post"
import { messageContext } from "../../../context/MessageContext"
import { POST_EDIT_CANCELLED_MESSAGE } from "../../../constants/messages"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import updatePostService from "../../../services/api/updatePostService"
import { setMainUserPosts } from "../../../features/users/userSlice"

export default function EditPostForm(props: EditPostFormInterface) {
  const { open, handleCloseEditForm, postId } = props
  const { handleMessage } = useContext(messageContext)
  const state = useSelector((state: RootState) => state.user)
  const [newPostInfo, setNewPostInfo] = useState({ titleInput: "", contentInput: "" })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPostInfo({
      ...newPostInfo,
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
    setNewPostInfo({ titleInput: "", contentInput: "" })
    handleCloseEditForm()
    setLoading(false)
  }

  const handleClose = () => {
    handleCloseEditForm()
    setNewPostInfo({ titleInput: "", contentInput: "" })
    setLoading(false)
    handleMessage(POST_EDIT_CANCELLED_MESSAGE)
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit post</DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} id="post-updated-form" component="form">
            <CustomTextfield
              name="titleInput"
              placeholder="Your title updated"
              value={newPostInfo.titleInput}
              onFieldChange={(e) => handleChange(e)}
              disabled={loading}
            />

            <CustomTextfield
              name="contentInput"
              placeholder="Your content updated"
              value={newPostInfo.contentInput}
              onFieldChange={(e) => handleChange(e)}
              disabled={loading}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
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
