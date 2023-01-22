import React, { useEffect, useState } from "react"
// import LoadMore from "../LoadMore"
import { Typography } from "@mui/material"
import FriendRequestCard from "../Cards/FriendRequestCard"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { BasicUserInterface } from "../../interface/user"
import RemoveFriendButton from "../FunctionsButtons/RemoveFriendButton"
import getUserFriendsService from "../../services/api/getUserFriends"
import FriendRequestSkeleton from "../Skeletons/FriendRequestSkeleton"
import { button_medium } from "../../styles/buttons"
import Grid from "@mui/material/Unstable_Grid2"
import NoContent from "../NoContent"
import { NO_FRIENDS_MESSAGE } from "../../constants/messages"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BgImage = require("../../assets/bg-5.png")

export default function FriendsSection() {
  const state = useSelector((state: RootState) => state.user)
  const [friendsInfo, setFriendsInfo] = useState<BasicUserInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const limit = 8

  useEffect(() => { fetchFriends() }, [state.friends])

  const fetchFriends = async () => {
    setLoading(true)

    const { data, statusCode, success } = await getUserFriendsService(state.user.id, state.token, offset, limit)

    if (statusCode === 200 && success) {
      setFriendsInfo(data.friends)
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
              <Grid xs={12}>
                <Typography variant="h6" color="text.primary">My friends</Typography>
              </Grid>

              {
                friendsInfo.map((friend) => (
                  <Grid xs={12} sm={6} md={3} key={friend.id}>
                    <FriendRequestCard
                      avatarUrl={friend.avatarUrl}
                      username={friend.username}
                      fullName={`${friend.firstName} ${friend.lastName}`}
                      variant="large"
                    >
                      <RemoveFriendButton friendId={friend.id} v2 customStyles={button_medium} />
                    </FriendRequestCard>
                  </Grid>
                ))
              }
            </Grid>

            {
              !loading && friendsInfo.length === 0 && (
                <NoContent imgSrc={BgImage} text={NO_FRIENDS_MESSAGE} />
              )
            }
          </>
        )
      }
    </>
  )
}
