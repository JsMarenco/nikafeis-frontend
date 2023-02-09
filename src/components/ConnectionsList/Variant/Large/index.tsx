import React, { useEffect, useRef, useState } from "react"

// Third-party dependencies
import { Typography, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"

// Current project dependencies
import { BasicUserInterface } from "../../../../interface/user"
import { NO_PEOPLE_HERE } from "../../../../constants/messages"
import getUerConnectionsService from "../../../../services/api/getUerConnectionsService"
import FriendRequestCard from "../../../Cards/FriendRequestCard"
import SendFriendRequestButton from "../../../FunctionsButtons/SendFriendRequestButton"
import NoContent from "../../../NoContent"
import FriendRequestSkeleton from "../../../Skeletons/FriendRequestSkeleton"
import LoadMore from "../../../LoadMore"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const notFriends = require("../../../../assets/woman_using_phone.png")

export default function ConnectionsListLarge() {
  const state = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true)
  const [friendConnections, setFriendConnections] = useState<BasicUserInterface[]>([])
  const [offset, setOffset] = useState(0)
  const limit = 8
  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useRef(null)

  useEffect(() => { fetchUserConnections() }, [state.friendRequestsSent])

  const fetchUserConnections = async () => {
    setLoading(true)
    const { data, statusCode, success } = await getUerConnectionsService(state.user.id, offset, limit)
    console.log("🚀 ~ file: index.tsx:34 ~ fetchUserConnections ~ data", data)

    if (success && statusCode === 200) {
      setFriendConnections([...friendConnections, ...data])

      if (friendConnections.length === offset) {
        setOffset(offset + limit)
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const lastItem = entries[0]
      if (lastItem.isIntersecting) {
        if (friendConnections.length !== 0) {
          fetchUserConnections()
        }
      }
    })

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current)
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [friendConnections])

  return (
    <>
      {loading && <FriendRequestSkeleton variant="large" />}

      {
        !loading && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="text.primary">People may you know</Typography>
              </Grid>

              {
                friendConnections.map((friendConnection, index) => (
                  <Grid key={`${friendConnection.id}_${index}`} item xs={12} sm={6} md={3}>
                    <FriendRequestCard
                      key={friendConnection.id}
                      avatarUrl={friendConnection.avatarUrl}
                      username={friendConnection.username}
                      fullName={`${friendConnection.firstName} ${friendConnection.lastName}`}
                      variant="large"
                    >
                      <SendFriendRequestButton customStyles={{ borderRadius: "15px" }} username={friendConnection.username} v2 />
                    </FriendRequestCard>
                  </Grid>
                ))
              }
            </Grid>

            {
              !loading && (friendConnections.length !== 0 && friendConnections.length === offset) && (
                <div ref={lastItemRef}><LoadMore /></div>
              )
            }

            {
              friendConnections.length === 0 && (
                <NoContent text={NO_PEOPLE_HERE} imgSrc={notFriends} />
              )
            }
          </>
        )
      }
    </>
  )
}
