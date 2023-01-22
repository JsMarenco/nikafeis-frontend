import React, { useEffect, useState } from "react"
import { Grid, Typography } from "@mui/material"
import getUserFriendRequestsService from "../../../../services/api/getUserFriendRequestsService"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"
import { NO_CONNECTIONS_MESSAGE } from "../../../../constants/messages"
import { friendRequestsInterface } from "../../../../interface/user"
import { button_medium } from "../../../../styles/buttons"
import FriendRequestCard from "../../../Cards/FriendRequestCard"
import AcceptFriendRequestButton from "../../../FunctionsButtons/AcceptFriendRequestButton"
import RejectFriendRequestButton from "../../../FunctionsButtons/RejectFriendRequestButton"
import NoContent from "../../../NoContent"
import FriendRequestSkeleton from "../../../Skeletons/FriendRequestSkeleton"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const noConnections = require("../../../../assets/new_connections.png")

export default function FriendRequestReceiveLarge() {
  const state = useSelector((state: RootState) => state.user)
  const [friendsInfo, setFriendsInfo] = useState<friendRequestsInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const limit = 8

  useEffect(() => { fetchFriendsRequests() }, [state.friendRequests, state.friends, state.friendRequestsSent])

  const fetchFriendsRequests = async () => {
    const { data, success } = await getUserFriendRequestsService(offset, limit, state.user.id, state.token)

    if (success) {
      setFriendsInfo(data)

      if ([...friendsInfo, ...data].length === offset) {
        setOffset(offset + limit)
      }

      setLoading(false)
    }
  }

  return (
    <>
      {loading && <FriendRequestSkeleton variant="large"  />}

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
