import React, { useContext } from "react"
import { IconButton, Tooltip, Button } from "@mui/material"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import sendFriendRequestService from "../../../services/api/sendFriendRequestService"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriendRequestsSent } from "../../../features/users/userSlice"
import { SendFriendRequestInterface } from "../../../interface/functionsButtons"
import { SEND_FRIEND_REQUEST } from "../../../constants/buttons"

export default function SendFriendRequestButton(props: SendFriendRequestInterface) {
  const { username, customStyles, v2 = false, size = "large" } = props
  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const dispatch = useDispatch()

  const handleSendFriendRequest = async () => {
    const { data, message, success, statusCode } = await sendFriendRequestService(username, state.user.id, state.token)
    console.log("🚀 ~ file: index.tsx:21 ~ handleSendFriendRequest ~ message", message)

    if (statusCode === 201 && success) {
      success && dispatch(setMainUserFriendRequestsSent(data.friendRequestsSent))
    }

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
            sx={customStyles}
            size={size}
          >
            {SEND_FRIEND_REQUEST}
          </Button>
        ) : (
          <Tooltip title={SEND_FRIEND_REQUEST} arrow>
            <IconButton
              onClick={handleSendFriendRequest}
              sx={customStyles}
              size={size}
            >
              <PersonAddAlt1Icon />
            </IconButton>
          </Tooltip>
        )
      }
    </>
  )
}
