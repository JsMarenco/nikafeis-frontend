import React, { useEffect, useState } from "react"
import { Typography, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { BasicUserInterface } from "../../interface/user"
import getUerConnectionsService from "../../services/api/getUerConnectionsService"
import FriendRequestCard from "../Cards/FriendRequestCard"
import SendFriendRequestButton from "../FunctionsButtons/SendFriendRequestButton"
import { FriendRequestSkeletonList } from "../Skeletons/FriendRequestSkeleton"

export default function ConnectionsList() {
  const state = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true)
  const [friendConnections, setFriendConnections] = useState<BasicUserInterface[]>([])
  const limit = 10
  const [offset, setOffset] = useState(0)

  useEffect(() => { fetchUserConnections() }, [state.friendRequestsSent])

  const fetchUserConnections = async () => {
    setLoading(true)
    const { data, statusCode, success } = await getUerConnectionsService(state.user.id, offset, limit)

    if (success && statusCode === 200) {
      setFriendConnections((prev) => [...prev, ...data])
    }

    setOffset(offset + limit)

    setLoading(false)
  }

  return (
    <>
      {loading && <FriendRequestSkeletonList />}

      {
        !loading && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="text.primary">People may you know</Typography>
              </Grid>

              {
                friendConnections.map((friendConnection) => (
                  <Grid item xs={12} sm={6} md={3} key={friendConnection.id}>
                    <FriendRequestCard
                      key={friendConnection.id}
                      avatarUrl={friendConnection.avatarUrl}
                      username={friendConnection.username}
                      fullName={`${friendConnection.firstName} ${friendConnection.lastName}`}
                    >
                      <SendFriendRequestButton username={friendConnection.username} v2 />
                    </FriendRequestCard>
                  </Grid>
                ))
              }
            </Grid>

            {/* <LoadMore /> */}
          </>
        )
      }
    </>
  )
}
