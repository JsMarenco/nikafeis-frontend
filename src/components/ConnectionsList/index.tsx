import React from "react"
import ConnectionsListLarge from "./Variant/Large"
import ConnectionsListSmall from "./Variant/Small"
interface Props {
  variant: "small" | "large"
}

export default function ConnectionsList(props: Props) {
  return (
    <>
      {props.variant === "large" && <ConnectionsListLarge />}
      {props.variant === "small" && <ConnectionsListSmall />}
    </>
  )
}
