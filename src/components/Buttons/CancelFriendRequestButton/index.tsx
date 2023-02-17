import React, { useContext } from "react"

// Third-party dependencies
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import { useSelector, useDispatch } from "react-redux"

// Current project dependencies
import { RootState } from "app/store"
import { messageContext } from "context/MessageContext"
import { setMainUserFriendRequestsSent } from "features/users/userSlice"
import sendFriendRequestService from "services/api/sendFriendRequestService"
import { ICFR } from "interface/friendRequest"
import BaseFriendRequestButton from "../BaseFriendRequestButton"
import buttonTexts from "lang/en/components/buttons"

export default function CancelFriendRequestButton(props: ICFR) {
  const { username, version = "large"  } = props
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
    <BaseFriendRequestButton
      tooltipText={buttonTexts.cancelFriendRequest}
      buttonText={buttonTexts.cancelFriendRequest}
      onClick={handleCancelFriendRequest}
      icon={<PersonRemoveIcon />}
      version={version}
    />
  )
}
