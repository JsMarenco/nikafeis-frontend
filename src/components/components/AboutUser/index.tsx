import React, { useContext, useEffect, useState } from "react"
import { Typography, Tooltip, Button, ButtonGroup } from "@mui/material"
import UserInterface from "../../../interface/user"
import { copyToClipboard } from "../../../utils/basic"
import { messageContext } from "../../../context/MessageContext"
import { COPY_CLIPBOARD_MESSAGE } from "../../../constants/messages"
import PeopleIcon from "@mui/icons-material/People"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed"
import { useParams } from "react-router-dom"
import { USER_USERNAME_APP_ROUTE } from "../../../constants/routes"

interface UserInterfaceV2 extends UserInterface {
  posts: string[]
  friends: string[]
}

export default function AboutUser() {
  const { handleMessage } = useContext(messageContext)
  const state = useSelector((state: RootState) => state.user)
  const visitedUserState = useSelector((state: RootState) => state.visitedUser)
  const { the_username } = useParams()
  const [userInfo, setUserInfo] = useState<UserInterface>({} as UserInterface)
  const [userPosts, setUserPosts] = useState<string[]>([] as string[])
  const [userFriends, setUserFriends] = useState<string[]>([] as string[])

  useEffect(() => {
    if (the_username === USER_USERNAME_APP_ROUTE || the_username === state.user.username) {
      setUserInfo(state.user)
      setUserFriends(state.friends)
      setUserPosts(state.posts)
    } else {
      setUserInfo(visitedUserState.user as UserInterfaceV2)
      setUserFriends(visitedUserState.friends)
      setUserPosts(visitedUserState.posts)
    }
  }, [the_username, state.user])

  const handleCopy = () => {
    copyToClipboard(userInfo.username)
    handleMessage(COPY_CLIPBOARD_MESSAGE)
  }

  return (
    <>
      <Typography
        variant="h6"
        color="text.primary"
        align="center"
        sx={{ mt: 2 }}
      >
        {`${userInfo.firstName} ${userInfo.lastName}`}
      </Typography>

      <Tooltip title="Copy username" arrow>
        <Typography
          variant="body2"
          color="text.primary"
          align="center"
          sx={{ fontSize: "0.8em", cursor: "pointer" }}
          onClick={handleCopy}
        >
          {`@${userInfo.username}`}
        </Typography>
      </Tooltip>

      <Typography
        variant="subtitle1"
        color="text.primary"
        align="center"
        m={0.5}
      >
        {userInfo.description}
      </Typography>

      <ButtonGroup
        aria-label="text button group"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip title="View friends" arrow>
          <Button
            variant="text"
            startIcon={<PeopleIcon />}
            sx={{ color: "text.primary", }}
          >
            {`Friends ${userFriends.length}`}
          </Button>
        </Tooltip>

        <Tooltip title="View friends" arrow>
          <Button
            variant="text"
            startIcon={<DynamicFeedIcon />}
            sx={{ color: "text.primary", }}
          >
            {`Post ${userPosts.length}`}
          </Button>
        </Tooltip>
      </ButtonGroup>
    </>
  )
}
