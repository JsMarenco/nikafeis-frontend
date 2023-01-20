import React, { ReactNode, useEffect, useState } from "react"
import { IconButton, Tooltip } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useNavigate, useParams } from "react-router-dom"
import { profile_button_size, profile_option__button } from "../../styles/profile"
import ButtonProfileSkeleton from "../Skeletons/ButtonProfileSkeleton"
import { NEW_CHAT_ROUTE } from "../../constants/routes"
import getFriendRequestInfoService from "../../services/api/getFriendRequestInfoService"
import AcceptFriendRequestButton from "../FunctionsButtons/AcceptFriendRequestButton"
import RejectFriendRequestButton from "../FunctionsButtons/RejectFriendRequestButton"
import CancelFriendRequestButton from "../FunctionsButtons/CancelFriendRequestButton"
import RemoveFriendButton from "../FunctionsButtons/RemoveFriendButton"
import SendFriendRequestButton from "../FunctionsButtons/SendFriendRequestButton"

export default function VisitorOption() {
  const state = useSelector((state: RootState) => state.user)
  const { the_username } = useParams()
  const visitedUserState = useSelector((state: RootState) => state.visitedUser)
  const [loading, setLoading] = useState(true)
  const [dynamicButton, setDynamicButton] = useState<ReactNode>()
  const navigate = useNavigate()

  const handleNewChat = async () => {
    const url = NEW_CHAT_ROUTE.replace("%chatId", "chat-id")
    navigate(url)
  }

  useEffect(() => { handleCheck() }, [state.friends, state.friendRequestsSent, state.friendRequests])

  const handleCheck = async () => {
    setLoading(true)

    // checking if him is stranger
    const isFriend = state.friends.includes(visitedUserState.user.id)

    if (isFriend) {
      setDynamicButton(
        <RemoveFriendButton friendId={visitedUserState.user.id} customStyles={profile_option__button} />
      )
    }

    if (!isFriend) {
      const { data } = await getFriendRequestInfoService(state.user.id, visitedUserState.user.id, state.token)

      const to = data?.to || ""
      const from = data?.from || ""

      // checking if the user sender
      const isSender = from === state.user.id && to === visitedUserState.user.id

      if (isSender) {
        setDynamicButton(
          <CancelFriendRequestButton username={the_username || ""} customStyles={profile_option__button} />
        )
      }

      // checking if the user receiver
      const isReceiver = from === visitedUserState.user.id && to === state.user.id

      if (isReceiver) {
        setDynamicButton(
          <>
            <AcceptFriendRequestButton friendRequestId={data.id} customStyles={profile_option__button} />

            <RejectFriendRequestButton friendRequestId={data.id} customStyles={profile_option__button} />
          </>
        )
      }

      if (!isSender && !isReceiver) {
        setDynamicButton(
          <SendFriendRequestButton
            username={the_username || ""}
            customStyles={profile_option__button}
          />
        )
      }
    }

    setTimeout(() => { setLoading(false) }, 500)
  }

  return (
    <>
      {
        loading && (
          <>
            <ButtonProfileSkeleton />
            <ButtonProfileSkeleton />
            <ButtonProfileSkeleton />
          </>
        )
      }

      {
        !loading && (
          <>
            {dynamicButton}

            <Tooltip title="Send message" arrow>
              <IconButton
                sx={profile_option__button}
                onClick={handleNewChat}
                size={profile_button_size}
              >
                <ChatIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    </>
  )
}
