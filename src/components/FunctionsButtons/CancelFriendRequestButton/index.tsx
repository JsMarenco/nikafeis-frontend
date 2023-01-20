import React, { useContext } from "react"
import { IconButton, Tooltip } from "@mui/material"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriendRequestsSent } from "../../../features/users/userSlice"
import sendFriendRequestService from "../../../services/api/sendFriendRequestService"
import { CancelFriendRequestInterface } from "../../../interface/functionsButtons"
import { profile_button_size } from "../../../styles/profile"

export default function CancelFriendRequestButton(props: CancelFriendRequestInterface) {
  const { username, customStyles, } = props
  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const dispatch = useDispatch()

  // this function is when the user sent the request
  const handleCancelFriendRequest = async () => {
    const { data, message, success } = await sendFriendRequestService(username, state.user.id, state.token)

    success && dispatch(setMainUserFriendRequestsSent(data.friendRequestsSent))

    handleMessage(message)
  }

  return (
    <Tooltip title="Cancel friend request" arrow>
      <IconButton
        onClick={handleCancelFriendRequest}
        sx={customStyles}
        size={profile_button_size}
      >
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  )
}
