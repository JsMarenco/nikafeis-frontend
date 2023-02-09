import React, { useEffect, useState } from "react"

// Third-party dependencies
import { Box, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// Current project dependencies
import { RootState } from "../../../../app/store"
import { NO_FRIEND_REQUEST_MESSAGE } from "../../../../constants/messages"
import { BasicUserInterface } from "../../../../interface/user"
import getUerConnectionsService from "../../../../services/api/getUerConnectionsService"
import FriendRequestCard from "../../../Cards/FriendRequestCard"
import SendFriendRequestButton from "../../../FunctionsButtons/SendFriendRequestButton"
import NoContent from "../../../NoContent"
import FriendRequestSkeleton from "../../../Skeletons/FriendRequestSkeleton"
import stylesVars from "../../../../styles/globals/vars"
import AppRoutes from "../../../../constants/app/routes"
import cardStyles from "../../../../styles/components/cards"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const notFriends = require("../../../../assets/woman_using_phone.png")

export default function ConnectionsListSmall() {
  const navigate = useNavigate()
  const state = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true)
  const [friendConnections, setFriendConnections] = useState<BasicUserInterface[]>([])
  const [offset, setOffset] = useState(0)
  const limit = 3

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
      <Box sx={cardStyles.container}>
        <Box sx={{ ...stylesVars, justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="text.primary">People may you know</Typography>

          <Typography
            variant="body1"
            color="text.primary"
            sx={cardStyles.link}
            onClick={() => navigate(AppRoutes.newConnections)}
          >
            See all
          </Typography>
        </Box>

        {loading && (<FriendRequestSkeleton variant="small" />)}

        <Stack spacing={2} sx={{ width: "100%" }}>
          {
            friendConnections.map((req) => (
              <FriendRequestCard
                key={req.id}
                avatarUrl={req.avatarUrl}
                username={req.username}
                fullName={`${req.firstName} ${req.lastName}`}
                variant="small"
              >
                <SendFriendRequestButton username={req.username} v2 size="small" customStyles={{ borderRadius: "15px" }} />
              </FriendRequestCard>
            ))
          }
        </Stack>

        {
          friendConnections.length === 0 && (
            <NoContent text={NO_FRIEND_REQUEST_MESSAGE} imgSrc={notFriends} />
          )
        }
      </Box>
    </>
  )
}
