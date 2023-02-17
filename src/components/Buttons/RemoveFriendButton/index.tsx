import React, { useContext } from "react"

// Third-party dependencies
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"

// Current project dependencies
import removeFriendService from "../../../services/api/removeFriendService"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriends } from "../../../features/users/userSlice"
import { IRF } from "interface/friendRequest"
import BaseFriendRequestButton from "../BaseFriendRequestButton"
import buttonTexts from "lang/en/components/buttons"

export default function RemoveFriendButton(props: IRF) {
  const { friendId, version = "large" } = props
  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const dispatch = useDispatch()

  const handleRemoveFriend = async () => {
    const { data, message, success } = await removeFriendService(state.user.id, friendId, state.token)

    if (success) {
      dispatch(setMainUserFriends(data.friends))
    }

    handleMessage(message)
  }

  return (
    <BaseFriendRequestButton
      tooltipText={buttonTexts.removeFriend}
      buttonText={buttonTexts.removeFriend}
      onClick={handleRemoveFriend}
      icon={<PersonRemoveIcon />}
      version={version}
    />
  )
}
