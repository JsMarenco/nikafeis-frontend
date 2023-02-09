import React, { useContext } from "react"

// Third-party dependencies
import { useDispatch, useSelector } from "react-redux"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import { Button, IconButton, Tooltip } from "@mui/material"

// Current project dependencies
import { RootState } from "app/store"
import { messageContext } from "context/MessageContext"
import { setMainUserFriends } from "features/users/userSlice"
import acceptFriendRequestService from "services/api/acceptFriendRequestService"
import { FunctionsButtonsBaseInterface } from "interface/functionsButtons"
import { ACCEPT_FRIEND_REQUEST } from "constants/buttons"

export default function AcceptFriendRequestButton(props: FunctionsButtonsBaseInterface) {
  const { friendRequestId, customStyles, v2 = false, size = "large" } = props
  const state = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const { handleMessage } = useContext(messageContext)

  const handleAcceptFriendRequest = async () => {
    const { message, success, data } = await acceptFriendRequestService(friendRequestId, state.user.id, state.token)

    success && dispatch(setMainUserFriends(data.friends))

    handleMessage(message)
  }

  return (
    <>
      {
        v2 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAcceptFriendRequest}
            sx={customStyles}
            size={size}
          >
            {ACCEPT_FRIEND_REQUEST}
          </Button>
        ) : (
          <Tooltip title={ACCEPT_FRIEND_REQUEST} arrow>
            <IconButton
              onClick={handleAcceptFriendRequest}
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
