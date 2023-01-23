import { Box, Typography, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../../../app/store"
import { NO_CONNECTIONS_MESSAGE } from "../../../../constants/messages"
import { FRIEND_REQUEST_ROUTE } from "../../../../constants/routes"
import { friendRequestsInterface } from "../../../../interface/user"
import getUserFriendRequestsService from "../../../../services/api/getUserFriendRequestsService"
import { global_flex } from "../../../../styles"
import { button_small } from "../../../../styles/buttons"
import FriendRequestCard from "../../../Cards/FriendRequestCard"
import AcceptFriendRequestButton from "../../../FunctionsButtons/AcceptFriendRequestButton"
import RejectFriendRequestButton from "../../../FunctionsButtons/RejectFriendRequestButton"
import NoContent from "../../../NoContent"
import FriendRequestSkeleton from "../../../Skeletons/FriendRequestSkeleton"
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
        <Box sx={{ ...global_flex, justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="text.primary">Friend requests</Typography>

          <Typography
            variant="body1"
            color="text.primary"
            sx={{ cursor: "pointer", "&:hover": { color: "text.secondary" } }}
            onClick={() => navigate(FRIEND_REQUEST_ROUTE)}
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
                <AcceptFriendRequestButton customStyles={button_small} friendRequestId={req.id} v2 size="small" />
                <RejectFriendRequestButton customStyles={button_small} friendRequestId={req.id} v2 size="small" />
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
