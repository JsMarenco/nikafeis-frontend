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
import NoContent from "../NoContent"
import { NO_CONNECTIONS_MESSAGE } from "../../constants/messages"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const noConnections = require("../../assets/new_connections.png")

export default function FriendRequestSection() {
  const state = useSelector((state: RootState) => state.user)
  const [friendsInfo, setFriendsInfo] = useState<friendRequestsInterface[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchFriendsRequests() }, [state.friendRequests, state.friends, state.friendRequestsSent])
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchFriendsRequests()
        }
      })
    }, options)

    const lastProduct = document.querySelector(".last-product")

    if (lastProduct) observer.observe(lastProduct)
  }, [])

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
                friendsInfo.map((req, index) => (
                  <Grid
                    key={req.id}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    className={index === friendsInfo.length - 1 ? "last-product" : ""}
                  >
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

            {
              friendsInfo.length === 0 && (
                <NoContent text={NO_CONNECTIONS_MESSAGE} imgSrc={noConnections} />
              )
            }
          </>
        )
      }
    </>
  )
}
