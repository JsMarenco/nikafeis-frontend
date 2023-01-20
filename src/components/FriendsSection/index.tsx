import React, { useEffect, useState } from "react"
// import LoadMore from "../LoadMore"
import { Grid } from "@mui/material"
import FriendRequestCard from "../Cards/FriendRequestCard"
import CustomLoader from "../CustomLoader"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import getUserFriendRequestsService from "../../services/api/getUserFriendRequestsService"
import { friendRequestsInterface } from "../../interface/user"
import SendFriendRequestButton from "../FunctionsButtons/SendFriendRequestButton"

export default function FriendsSection() {
  const state = useSelector((state: RootState) => state.user)
  const [friendsInfo, setFriendsInfo] = useState<friendRequestsInterface[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFriends()
    setLoading(false)
  }, [])

  const fetchFriends = async () => {
    const { data } = await getUserFriendRequestsService(state.user.id, state.token)

    setFriendsInfo(data)
  }

  return (
    <>
      {loading && <CustomLoader />}

      {
        !loading && (
          <>
            <Grid container spacing={2}>

              {
                friendsInfo.map((req) => (
                  <Grid item xs={12} sm={6} md={3} key={req.id}>
                    <FriendRequestCard
                      avatarUrl={req.from.avatarUrl}
                      username={req.from.username}
                      fullName={`${req.from.firstName} ${req.from.lastName}`}
                    >

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
