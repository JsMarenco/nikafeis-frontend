import React, { ReactNode, useEffect, useState } from "react"

// Third-party dependencies
import { IconButton, Tooltip } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

// Current project dependencies
import { RootState } from "app/store"
import ButtonProfileSkeleton from "components/Skeletons/ButtonProfileSkeleton"
import getFriendRequestInfoService from "services/api/getFriendRequestInfoService"
import AcceptFriendRequestButton from "components/FunctionsButtons/AcceptFriendRequestButton"
import RejectFriendRequestButton from "components/FunctionsButtons/RejectFriendRequestButton"
import CancelFriendRequestButton from "components/FunctionsButtons/CancelFriendRequestButton"
import RemoveFriendButton from "components/FunctionsButtons/RemoveFriendButton"
import SendFriendRequestButton from "components/FunctionsButtons/SendFriendRequestButton"
import AppRoutes from "constants/app/routes"
import profileStyles from "styles/pages/profile"

export default function VisitorOption() {
  const state = useSelector((state: RootState) => state.user)
  const { the_username } = useParams()
  const visitedUserState = useSelector((state: RootState) => state.visitedUser)
  const [loading, setLoading] = useState(true)
  const [dynamicButton, setDynamicButton] = useState<ReactNode>()
  const navigate = useNavigate()

  const handleNewChat = async () => {
    const url = AppRoutes.newChat.replace("%chatId", "chat-id")
    navigate(url)
  }

  useEffect(() => { handleCheck() }, [state.friends, state.friendRequestsSent, state.friendRequests])

  const handleCheck = async () => {
    setLoading(true)

    // checking if him is stranger
    const isFriend = state.friends.includes(visitedUserState.user.id)

    if (isFriend) {
      setDynamicButton(
        <RemoveFriendButton friendId={visitedUserState.user.id} customStyles={profileStyles.optionButton} />
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
          <CancelFriendRequestButton username={the_username || ""} customStyles={profileStyles.optionButton} />
        )
      }

      // checking if the user receiver
      const isReceiver = from === visitedUserState.user.id && to === state.user.id

      if (isReceiver) {
        setDynamicButton(
          <>
            <AcceptFriendRequestButton friendRequestId={data.id} customStyles={profileStyles.optionButton} />

            <RejectFriendRequestButton friendRequestId={data.id} customStyles={profileStyles.optionButton} />
          </>
        )
      }

      if (!isSender && !isReceiver) {
        setDynamicButton(
          <SendFriendRequestButton
            username={the_username || ""}
            customStyles={profileStyles.optionButton}
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
                sx={profileStyles.optionButton}
                onClick={handleNewChat}
                size={profileStyles.buttonSize}
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
