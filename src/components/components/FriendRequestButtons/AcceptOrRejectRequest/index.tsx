import React from "react"
import AcceptFriendRequestButton from "../../../FunctionsButtons/AcceptFriendRequestButton"
import RejectFriendRequestButton from "../../../FunctionsButtons/RejectFriendRequestButton"

interface Props { friendRequestId: string }

export default function AcceptOrRejectRequest(props: Props) {
  const { friendRequestId } = props

  return (
    <>
      <AcceptFriendRequestButton friendRequestId={friendRequestId} />

      <RejectFriendRequestButton friendRequestId={friendRequestId} />
    </>
  )
}

