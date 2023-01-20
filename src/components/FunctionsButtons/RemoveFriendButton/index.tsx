import React, { useContext } from "react"
import { IconButton, Tooltip } from "@mui/material"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import removeFriendService from "../../../services/api/removeFriendService"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriends } from "../../../features/users/userSlice"
import { RemoveFriendInterface } from "../../../interface/functionsButtons"
import { profile_button_size } from "../../../styles/profile"

export default function RemoveFriendButton(props: RemoveFriendInterface) {
  const { friendId, customStyles, } = props
  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const dispatch = useDispatch()

  const handleRemoveFriend = async () => {
    const { data, message, success } = await removeFriendService(state.user.id, friendId, state.token)

    if (success) {
      dispatch(setMainUserFriends(data.friends))
    }

    handleMessage(message)
  }

  return (
    <Tooltip title="Remove friend" arrow>
      <IconButton
        onClick={handleRemoveFriend}
        sx={customStyles}
        size={profile_button_size}
      >
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  )
}
