import React, { useContext } from "react"

// Third-party dependencies
import { useDispatch, useSelector } from "react-redux"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"

// Current project dependencies
import { RootState } from "app/store"
import { messageContext } from "context/MessageContext"
import { setMainUserFriends } from "features/users/userSlice"
import acceptFriendRequestService from "services/api/acceptFriendRequestService"
import buttonTexts from "lang/en/components/buttons"
import { IFRB } from "interface/friendRequest"
import BaseFriendRequestButton from "../BaseFriendRequestButton"

export default function AcceptFriendRequestButton(props: IFRB) {
  const { friendRequestId, version = "large" } = props
  const state = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const { handleMessage } = useContext(messageContext)

  const handleAcceptFriendRequest = async () => {
    const { message, success, data } = await acceptFriendRequestService(friendRequestId, state.user.id, state.token)

    success && dispatch(setMainUserFriends(data.friends))

    handleMessage(message)
  }

  return (
    <BaseFriendRequestButton
      tooltipText={buttonTexts.acceptFriendRequest}
      buttonText={buttonTexts.acceptFriendRequest}
      onClick={handleAcceptFriendRequest}
      icon={<PersonAddAlt1Icon />}
      version={version}
    />
  )
}
