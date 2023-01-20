import React, { useContext } from "react"
import { IconButton, Tooltip, Button } from "@mui/material"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import sendFriendRequestService from "../../../services/api/sendFriendRequestService"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriendRequestsSent } from "../../../features/users/userSlice"
import { SendFriendRequestInterface } from "../../../interface/functionsButtons"
import { profile_button_size, profile_option__button_v2 } from "../../../styles/profile"

export default function SendFriendRequestButton(props: SendFriendRequestInterface) {
  const { username, customStyles, v2 = false } = props
  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const dispatch = useDispatch()

  const handleSendFriendRequest = async () => {
    const { data, message, success } = await sendFriendRequestService(username, state.user.id, state.token)

    success && dispatch(setMainUserFriendRequestsSent(data.friendRequestsSent))

    handleMessage(message)
  }

  return (
    <>
      {
        v2 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendFriendRequest}
            sx={profile_option__button_v2}
          >
            Add friend
          </Button>
        ) : (
          <Tooltip title="Add friend" arrow>
            <IconButton
              onClick={handleSendFriendRequest}
              sx={customStyles}
              size={profile_button_size}
            >
              <PersonAddAlt1Icon />
            </IconButton>
          </Tooltip>
        )
      }
    </>
  )
}
