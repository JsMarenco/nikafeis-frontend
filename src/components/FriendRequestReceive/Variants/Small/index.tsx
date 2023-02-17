import React, { useEffect, useState } from "react"

// Third-party dependencies
import { Box, Typography, Stack } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// Current project dependencies
import { RootState } from "../../../../app/store"
import { NO_CONNECTIONS_MESSAGE } from "../../../../constants/messages"
import { friendRequestsInterface } from "../../../../interface/user"
import getUserFriendRequestsService from "../../../../services/api/getUserFriendRequestsService"
import FriendRequestCard from "../../../Cards/FriendRequestCard"
import NoContent from "../../../NoContent"
import FriendRequestSkeleton from "../../../Skeletons/FriendRequestSkeleton"
import stylesVars from "../../../../styles/globals/vars"
import AppRoutes from "../../../../constants/app/routes"
import cardStyles from "../../../../styles/components/cards"
import AcceptFriendRequestButton from "components/Buttons/AcceptFriendRequestButton"
import RejectFriendRequestButton from "components/Buttons/RejectFriendRequestButton"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const noConnections = require("../../../../assets/new_connections.png")

export default function FriendRequestReceiveSmall() {
  const navigate = useNavigate()
  const state = useSelector((state: RootState) => state.user)
  const [friendsInfo, setFriendsInfo] = useState<friendRequestsInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const limit = 3

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
      <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: "15px" }}>
        <Box sx={{ ...stylesVars.centeredElements, justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="text.primary">Friend requests</Typography>

          <Typography
            variant="body1"
            color="text.primary"
            sx={cardStyles.link}
            onClick={() => navigate(AppRoutes.friendsRequests)}
          >
            See all
          </Typography>
        </Box>

        {loading && (<FriendRequestSkeleton variant="small" />)}

        <Stack spacing={2} sx={{ width: "100%" }}>
          {
            friendsInfo.map((req) => (
              <FriendRequestCard
                key={req.id}
                avatarUrl={req.from.avatarUrl}
                username={req.from.username}
                fullName={`${req.from.firstName} ${req.from.lastName}`}
                timeAgo={req.date}
                friendRequestId={req.id}
                variant="small"
              >
                <AcceptFriendRequestButton friendRequestId={req.id} version={"large"} />
                <RejectFriendRequestButton friendRequestId={req.id} version={"large"} />
              </FriendRequestCard>
            ))
          }
        </Stack>

        {
          friendsInfo.length === 0 && !loading && (
            <NoContent text={NO_CONNECTIONS_MESSAGE} imgSrc={noConnections} />
          )
        }
      </Box>
    </>
  )

}
