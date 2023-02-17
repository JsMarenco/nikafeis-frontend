import React, { useContext } from "react"

// Third-party dependencies
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import { useSelector, useDispatch } from "react-redux"

// Current project dependencies
import rejectFriendRequestService from "../../../services/api/rejectFriendRequestService"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriendRequests } from "../../../features/users/userSlice"
import BaseFriendRequestButton from "../BaseFriendRequestButton"
import { IFRB } from "interface/friendRequest"
import buttonTexts from "lang/en/components/buttons"

export default function RejectFriendRequestButton(props: IFRB) {
  const { friendRequestId, version = "large" } = props
  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const dispatch = useDispatch()

  const handleRejectFriendRequest = async () => {
    const { data, message, success } = await rejectFriendRequestService(state.user.id, friendRequestId, state.token)

    success && dispatch(setMainUserFriendRequests(data.friendRequests))

    handleMessage(message)
  }

  return (
    <BaseFriendRequestButton
      tooltipText={buttonTexts.rejectFriendRequest}
      buttonText={buttonTexts.rejectFriendRequest}
      onClick={handleRejectFriendRequest}
      icon={<PersonRemoveIcon />}
      version={version}
    />
  )
}
