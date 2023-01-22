import React, { useEffect, useState } from "react"
import { Typography, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { BasicUserInterface } from "../../../../interface/user"
import { RootState } from "../../../../app/store"
import { NO_FRIEND_REQUEST_MESSAGE } from "../../../../constants/messages"
import getUerConnectionsService from "../../../../services/api/getUerConnectionsService"
import { button_medium } from "../../../../styles/buttons"
import FriendRequestCard from "../../../Cards/FriendRequestCard"
import SendFriendRequestButton from "../../../FunctionsButtons/SendFriendRequestButton"
import NoContent from "../../../NoContent"
import FriendRequestSkeleton from "../../../Skeletons/FriendRequestSkeleton"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const notFriends = require("../../../../assets/woman_using_phone.png")

export default function ConnectionsListLarge() {
  const state = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true)
  const [friendConnections, setFriendConnections] = useState<BasicUserInterface[]>([])
  const [offset, setOffset] = useState(0)
  const limit = 8

  useEffect(() => { fetchUserConnections() }, [state.friendRequestsSent])

  const fetchUserConnections = async () => {
    setLoading(true)
    const { data, statusCode, success } = await getUerConnectionsService(state.user.id, offset, limit)

    if (success && statusCode === 200) {
      setFriendConnections(data)

      if (friendConnections.length === offset) {
        setOffset(offset + limit)
      }
    }

    setLoading(false)
  }

  return (
    <>
      {loading && <FriendRequestSkeleton variant="large" />}

      {
        !loading && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="text.primary">People may you know</Typography>
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
                      <SendFriendRequestButton customStyles={button_medium} username={friendConnection.username} v2 />
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
