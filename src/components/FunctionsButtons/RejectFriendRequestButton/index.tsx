import React, { useContext } from "react"
import { Button, IconButton, Tooltip } from "@mui/material"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import rejectFriendRequestService from "../../../services/api/rejectFriendRequestService"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriendRequests } from "../../../features/users/userSlice"
import { FunctionsButtonsBaseInterface } from "../../../interface/functionsButtons"
import { profile_button_size, profile_option__button_v2 } from "../../../styles/profile"

export default function RejectFriendRequestButton(props: FunctionsButtonsBaseInterface) {
  const { friendRequestId, customStyles, v2 = false } = props
  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const dispatch = useDispatch()

  const handleRejectFriendRequest = async () => {
    const { data, message, success } = await rejectFriendRequestService(state.user.id, friendRequestId, state.token)

    success && dispatch(setMainUserFriendRequests(data.friendRequests))

    handleMessage(message)
  }

  return (
    <>
      {
        v2 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleRejectFriendRequest}
            sx={profile_option__button_v2}
            size={profile_button_size}
          >
            Delete request
          </Button>
        ) : (
          <Tooltip title="Reject friend request" arrow>
            <IconButton
              onClick={handleRejectFriendRequest}
              sx={customStyles}
              size={profile_button_size}
            >
              <PersonRemoveIcon />
            </IconButton>
          </Tooltip>
        )
      }
    </>
  )
}
