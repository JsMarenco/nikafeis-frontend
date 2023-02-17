import React, { useContext } from "react"

// Third-party dependencies
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import { useDispatch, useSelector } from "react-redux"

// Current project dependencies

import sendFriendRequestService from "services/api/sendFriendRequestService"
import { RootState } from "app/store"
import { messageContext } from "context/MessageContext"
import { setMainUserFriendRequestsSent } from "features/users/userSlice"
import { ISFR } from "interface/friendRequest"
import BaseFriendRequestButton from "../BaseFriendRequestButton"
import buttonTexts from "lang/en/components/buttons"

export default function SendFriendRequestButton(props: ISFR) {
  const { username, version = "large"  } = props
  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const dispatch = useDispatch()

  const handleSendFriendRequest = async () => {
    const { data, message, success, statusCode } = await sendFriendRequestService(username, state.user.id, state.token)

    if (statusCode === 201 && success) {
      success && dispatch(setMainUserFriendRequestsSent(data.friendRequestsSent))
    }

    handleMessage(message)
  }

  return (
    <BaseFriendRequestButton
      tooltipText={buttonTexts.sendFriendRequest}
      buttonText={buttonTexts.sendFriendRequest}
      onClick={handleSendFriendRequest}
      icon={<PersonAddAlt1Icon />}
      version={version}
    />
  )
}
