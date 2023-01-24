import React, { ReactNode, useEffect, useState } from "react"
import { Typography, Box, Divider } from "@mui/material"
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
import FacebookIcon from "@mui/icons-material/Facebook"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import { facebook_url, github_url, instagram_url, linkedin_url, twitter_url } from "../../../constants"

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
  }, [the_username, state.user, state.friends, visitedUserState.user])

  return (
    <>
      <Box sx={main__container_grid}>
        <Box>
          <Typography sx={{ mb: 1 }} variant="h6" color="text.primary">About</Typography>

          <Typography variant="body1" sx={{ fontWeight: "300" }} color="text.primary">{userInfo.description}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <OptionView
          icon={<RoomOutlinedIcon fontSize={icon_size} />}
          text={"Earth"}
        />

        <OptionView
          icon={<GroupOutlinedIcon fontSize={icon_size} />}
          text={`Member from ${convertDate(userInfo.createdAt)}`}
        />

        <OptionView
          icon={<AlternateEmailOutlinedIcon fontSize={icon_size} />}
          text={userInfo.username}
        />

        <OptionView
          icon={<GroupsOutlinedIcon fontSize={icon_size} />}
          text={`${userFriends.length} friends`}
        />

        <OptionView
          icon={<DynamicFeedOutlinedIcon fontSize={icon_size} />}
          text={`${userPosts.length} posts`}
        />

        {userInfo.website && (
          <OptionView
            icon={<LanguageIcon fontSize={icon_size} />}
            text={userInfo.website}
          />
        )}

        {userInfo.facebook_link && (
          <SocialLink
            icon={<FacebookIcon fontSize={icon_size} />}
            text={userInfo.facebook_link}
            link={facebook_url.replace("%username", userInfo.facebook_link)}
          />
        )}

        {userInfo.github_link && (
          <SocialLink
            icon={<GitHubIcon fontSize={icon_size} />}
            text={userInfo.github_link}
            link={github_url.replace("%username", userInfo.github_link)}
          />
        )}

        {userInfo.linkedin_link && (
          <SocialLink
            icon={<LinkedInIcon fontSize={icon_size} />}
            text={userInfo.linkedin_link}
            link={linkedin_url.replace("%username", userInfo.linkedin_link)}
          />
        )}

        {userInfo.instagram_link && (
          <SocialLink
            icon={<InstagramIcon fontSize={icon_size} />}
            text={userInfo.instagram_link}
            link={instagram_url.replace("%username", userInfo.instagram_link)}
          />
        )}

        {userInfo.twitter_link && (
          <SocialLink
            icon={<TwitterIcon fontSize={icon_size} />}
            text={userInfo.twitter_link}
            link={twitter_url.replace("%username", userInfo.twitter_link)}
          />
        )}
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
      <Box sx={profile_about_icon}>
        {props.icon}
      </Box>

      <Typography variant="body1" color="text.primary">{props.text}</Typography>
    </Box>
  )
}

interface PropsV3 {
  icon: ReactNode,
  text: string,
  link: string
}

const SocialLink = (props: PropsV3) => {
  return (
    <Box sx={{ ...global_flex, justifyContent: "initial", color: "text.primary", py: 1 }}>
      <Box sx={profile_about_icon}>
        {props.icon}
      </Box>

      <Typography
        variant="body1"
        color="text.primary"
        onClick={() => window.open(props.link, "_blank")}
        sx={{
          "&:hover": {
            color: "text.secondary",
            textDecoration: "underline"
          }
        }}
      >
        {props.text}
      </Typography>
    </Box>
  )
}
