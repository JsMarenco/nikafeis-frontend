import React from "react"
import FriendRequestReceiveLarge from "./Variants/Large"
import FriendRequestReceiveSmall from "./Variants/Small"

interface Props { variant: "small" | "large" }

export default function FriendRequestReceive(props: Props) {
  return (
    <>
      {props.variant === "large" && <FriendRequestReceiveLarge />}
      {props.variant === "small" && <FriendRequestReceiveSmall />}
    </>
  )
}
