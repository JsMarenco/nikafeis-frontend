import React from "react"
import { FriedRequestCardInterface } from "../../../interface/friends"
import FriendRequestCardLarge from "./Variants/Large"
import FriendRequestCardSmall from "./Variants/Small"

export default function FriendRequestCard(props: FriedRequestCardInterface) {
  const {
    avatarUrl,
    username,
    fullName,
    children,
    friendRequestId,
    timeAgo,
    variant = "large",
  } = props

  return (
    <>
      {
        variant === "large" && (
          <FriendRequestCardLarge
            avatarUrl={avatarUrl}
            username={username}
            fullName={fullName}
            timeAgo={timeAgo}
            friendRequestId={friendRequestId}
          >
            {children}
          </FriendRequestCardLarge>
        )
      }

      {
        variant === "small" && (
          <FriendRequestCardSmall
            avatarUrl={avatarUrl}
            username={username}
            fullName={fullName}
            timeAgo={timeAgo}
            friendRequestId={friendRequestId}
          >
            {children}
          </FriendRequestCardSmall>
        )
      }
    </>
  )
}
