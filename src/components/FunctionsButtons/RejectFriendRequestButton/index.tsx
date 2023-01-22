import React, { useContext } from "react"
import { Button, IconButton, Tooltip } from "@mui/material"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import rejectFriendRequestService from "../../../services/api/rejectFriendRequestService"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriendRequests } from "../../../features/users/userSlice"
import { FunctionsButtonsBaseInterface } from "../../../interface/functionsButtons"
import { profile_button_size } from "../../../styles/profile"
import { REJECT_FRIEND_REQUEST } from "../../../constants/buttons"

export default function RejectFriendRequestButton(props: FunctionsButtonsBaseInterface) {
  const { friendRequestId, customStyles, v2 = false, size = "large" } = props
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
            sx={customStyles}
            size={size}
          >
            {REJECT_FRIEND_REQUEST}
          </Button>
        ) : (
          <Tooltip title={REJECT_FRIEND_REQUEST} arrow>
            <IconButton
              onClick={handleRejectFriendRequest}
              sx={customStyles}
              size={size}
            >
              <PersonRemoveIcon />
            </IconButton>
          </Tooltip>
        )
      }
    </>
  )
}
