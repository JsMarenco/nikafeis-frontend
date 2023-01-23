import React from "react"
import FriendRequestReceiveLarge from "./Variants/Large"
import FriendRequestReceiveSmall from "./Variants/Small"

interface Props { variant: "small" | "large", loadData?: boolean }

export default function FriendRequestReceive(props: Props) {
  return (
    <>
      {props.variant === "large" && <FriendRequestReceiveLarge loadData={props.loadData} />}
      {props.variant === "small" && <FriendRequestReceiveSmall />}
    </>
  )
}
