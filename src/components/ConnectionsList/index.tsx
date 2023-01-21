import React, { useEffect, useState } from "react"
import { Typography, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { BasicUserInterface } from "../../interface/user"
import getUerConnectionsService from "../../services/api/getUerConnectionsService"
import FriendRequestCard from "../Cards/FriendRequestCard"
import SendFriendRequestButton from "../FunctionsButtons/SendFriendRequestButton"
import { FriendRequestSkeletonList } from "../Skeletons/FriendRequestSkeleton"
import { NO_FRIEND_REQUEST_MESSAGE } from "../../constants/messages"
import NoContent from "../NoContent"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const notFriends = require("../../assets/woman_using_phone.png")

export default function ConnectionsList() {
  const state = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true)
  const [friendConnections, setFriendConnections] = useState<BasicUserInterface[]>([])
  const limit = 8
  const [offset, setOffset] = useState(0)

  useEffect(() => { fetchUserConnections() }, [state.friendRequestsSent])

  useEffect(() => {
    const options = { root: null, rootMargin: "0px", threshold: 1.0 }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchUserConnections()
        }
      })
    }, options)

    const lastProduct = document.querySelector(".last-product")

    if (lastProduct) observer.observe(lastProduct)
  }, [])

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
                friendConnections.map((friendConnection, index) => (
                  <Grid
                    key={`${friendConnection.id}_${index}`}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    className={index === friendConnections.length - 1 ? "last-product" : ""}
                  >
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

            {
              friendConnections.length === 0 && (
                <NoContent text={NO_FRIEND_REQUEST_MESSAGE} imgSrc={notFriends} />
              )
            }
          </>
        )
      }
    </>
  )
}
