import React, { useEffect, useState } from "react"
// import LoadMore from "../LoadMore"
import { Grid, Typography } from "@mui/material"
import FriendRequestCard from "../Cards/FriendRequestCard"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import getUserFriendRequestsService from "../../services/api/getUserFriendRequestsService"
import { friendRequestsInterface } from "../../interface/user"
import SendFriendRequestButton from "../FunctionsButtons/SendFriendRequestButton"
import RejectFriendRequestButton from "../FunctionsButtons/RejectFriendRequestButton"
import { FriendRequestSkeletonList } from "../Skeletons/FriendRequestSkeleton"

export default function FriendRequestSection() {
  const state = useSelector((state: RootState) => state.user)
  const [friendsInfo, setFriendsInfo] = useState<friendRequestsInterface[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchFriendsRequests() }, [state.friendRequests, state.friends, state.friendRequestsSent])

  const fetchFriendsRequests = async () => {
    const { data, success } = await getUserFriendRequestsService(state.user.id, state.token)

    if (success) {
      setFriendsInfo(data)
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <FriendRequestSkeletonList />}

      {
        !loading && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="text.primary">Friend requests</Typography>
              </Grid>

              {
                friendsInfo.map((req) => (
                  <Grid item xs={12} sm={6} md={3} key={req.id}>
                    <FriendRequestCard
                      avatarUrl={req.from.avatarUrl}
                      username={req.from.username}
                      fullName={`${req.from.firstName} ${req.from.lastName}`}
                    >
                      <SendFriendRequestButton username={req.from.username} v2 />
                      <RejectFriendRequestButton friendRequestId={req.id} v2 />
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
