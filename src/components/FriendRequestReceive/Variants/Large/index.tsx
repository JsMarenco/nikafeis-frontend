import React, { useEffect, useRef, useState } from "react"
import { Box, Grid, Typography } from "@mui/material"
import getUserFriendRequestsService from "../../../../services/api/getUserFriendRequestsService"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"
import { NO_CONNECTIONS_MESSAGE, NO_MORE_POSTS, NO_REQUESTS_MESSAGE } from "../../../../constants/messages"
import { friendRequestsInterface } from "../../../../interface/user"
import { button_medium } from "../../../../styles/buttons"
import FriendRequestCard from "../../../Cards/FriendRequestCard"
import AcceptFriendRequestButton from "../../../FunctionsButtons/AcceptFriendRequestButton"
import RejectFriendRequestButton from "../../../FunctionsButtons/RejectFriendRequestButton"
import NoContent from "../../../NoContent"
import FriendRequestSkeleton from "../../../Skeletons/FriendRequestSkeleton"
import { useLocation, useNavigate } from "react-router-dom"
import { global_flex } from "../../../../styles"
import { FRIEND_REQUEST_ROUTE } from "../../../../constants/routes"
import LoadMore from "../../../LoadMore"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const noConnections = require("../../../../assets/new_connections.png")

interface Props {
  loadData?: boolean
}

export default function FriendRequestReceiveLarge(props: Props) {
  const { loadData = true } = props
  const navigate = useNavigate()
  const location = useLocation()
  const state = useSelector((state: RootState) => state.user)
  const [friendsInfo, setFriendsInfo] = useState<friendRequestsInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const limit = 8
  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useRef(null)

  useEffect(() => { fetchFriendsRequests() }, [state.friendRequests, state.friends, state.friendRequestsSent])

  const fetchFriendsRequests = async () => {
    const { data, success } = await getUserFriendRequestsService(offset, limit, state.user.id, state.token)

    if (success) {
      setFriendsInfo([...friendsInfo, ...data])

      if (friendsInfo.length === offset) {
        setOffset(offset + limit)
      }

      setLoading(false)
    }
  }

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const lastItem = entries[0]
      if (lastItem.isIntersecting) {
        if (friendsInfo.length !== 0) {
          fetchFriendsRequests()
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
  }, [friendsInfo])

  return (
    <>
      {loading && <FriendRequestSkeleton variant="large" />}

      {
        !loading && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ ...global_flex, justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body1" color="text.primary">Friend requests</Typography>

                  {
                    location.pathname != FRIEND_REQUEST_ROUTE && (
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ cursor: "pointer", "&:hover": { color: "text.secondary" } }}
                        onClick={() => navigate(FRIEND_REQUEST_ROUTE)}
                      >
                        See all
                      </Typography>
                    )
                  }
                </Box>
              </Grid>

              {
                friendsInfo.map((req) => (
                  <Grid
                    key={req.id}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                  >
                    <FriendRequestCard
                      avatarUrl={req.from.avatarUrl}
                      username={req.from.username}
                      fullName={`${req.from.firstName} ${req.from.lastName}`}
                      variant="large"
                    >
                      <AcceptFriendRequestButton customStyles={button_medium} friendRequestId={req.id} v2 />
                      <RejectFriendRequestButton customStyles={button_medium} friendRequestId={req.id} v2 />
                    </FriendRequestCard>
                  </Grid>
                ))
              }
            </Grid>

            {
              loadData && (
                <>
                  {
                    !loading && friendsInfo.length !== 0 && friendsInfo.length === offset ? (
                      <div ref={lastItemRef}><LoadMore /></div>
                    ) : (
                      <NoContent text={NO_REQUESTS_MESSAGE} imgSrc={noConnections} />
                    )
                  }
                </>
              )
            }

            {
              !loading && friendsInfo.length === 0 && (
                <NoContent text={NO_CONNECTIONS_MESSAGE} imgSrc={noConnections} />
              )
            }
          </>
        )
      }
    </>
  )
}
