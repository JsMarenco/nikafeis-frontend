import React, { ReactNode, useContext, useEffect, useState } from "react"
import { Typography, Tooltip, Button, ButtonGroup, Box, Divider } from "@mui/material"
import UserInterface from "../../../interface/user"
import { convertDate } from "../../../utils/basic"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { useParams } from "react-router-dom"
import { USER_USERNAME_APP_ROUTE } from "../../../constants/routes"
import { main__container_grid } from "../../../styles/container"
import { global_flex } from "../../../styles"
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined"
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined"
import { profile_about_icon } from "../../../styles/profile"
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined"
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined"
import LanguageIcon from "@mui/icons-material/Language"

interface UserInterfaceV2 extends UserInterface {
  posts: string[]
  friends: string[]
}

const icon_size = "large"

export default function AboutUser() {
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
  }, [the_username, state.user, state.friends])

  return (
    <>
      <Box sx={main__container_grid}>
        <Box>
          <Typography sx={{ mb: 1 }} variant="h6" color="text.primary">About</Typography>

          <Typography variant="body1" sx={{ fontWeight: "300" }} color="text.primary">{userInfo.description}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <OptionView
          icon={<RoomOutlinedIcon sx={profile_about_icon} fontSize={icon_size} />}
          text={"Unkwon"}
        />

        <OptionView
          icon={<GroupOutlinedIcon sx={profile_about_icon} fontSize={icon_size} />}
          text={`Member from ${convertDate(userInfo.createdAt)}`}
        />

        <OptionView
          icon={<AlternateEmailOutlinedIcon sx={profile_about_icon} fontSize={icon_size} />}
          text={userInfo.username}
        />

        <OptionView
          icon={<GroupsOutlinedIcon sx={profile_about_icon} fontSize={icon_size} />}
          text={`${userFriends.length} friends`}
        />

        <OptionView
          icon={<DynamicFeedOutlinedIcon sx={profile_about_icon} fontSize={icon_size} />}
          text={`${userPosts.length} posts`}
        />

        <OptionView
          icon={<LanguageIcon sx={profile_about_icon} fontSize={icon_size} />}
          text={userInfo.website ? userInfo.website : "Unkwon"}
        />
      </Box>
    </>
  )
}

interface PropsV2 {
  icon: ReactNode,
  text: string
}

const OptionView = (props: PropsV2) => {
  return (
    <Box sx={{ ...global_flex, justifyContent: "initial", color: "text.primary", py: 1 }}>
      {props.icon}

      <Typography variant="body1" color="text.primary">{props.text}</Typography>
    </Box>
  )
}
