import React from "react"

// Third-party dependencies

// Current project dependencies
import FriendsSection from "components/FriendsSection"
import FriendRequestReceive from "components/FriendRequestReceive"

export default function Friends() {
  return (
    <>
      <FriendRequestReceive variant="large" loadData={false} />]

      <FriendsSection />
    </>
  )
}
