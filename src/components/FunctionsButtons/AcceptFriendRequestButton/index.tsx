import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriends } from "../../../features/users/userSlice"
import acceptFriendRequestService from "../../../services/api/acceptFriendRequestService"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import { Button, IconButton, Tooltip } from "@mui/material"
import { FunctionsButtonsBaseInterface } from "../../../interface/functionsButtons"
import { profile_button_size, profile_option__button_v2 } from "../../../styles/profile"

export default function AcceptFriendRequestButton(props: FunctionsButtonsBaseInterface) {
  const { friendRequestId, customStyles, v2 = false } = props
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
            sx={profile_option__button_v2}
          >
            Sent reqeust
          </Button>
        ) : (
          <Tooltip title="Accept friend request" arrow>
            <IconButton
              onClick={handleAcceptFriendRequest}
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
