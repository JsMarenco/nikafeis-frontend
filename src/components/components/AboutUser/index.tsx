import React, { ReactNode, useEffect, useState } from "react"

// Third-party dependencies
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Typography, Box, Divider } from "@mui/material"
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined"
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined"
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined"
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined"
import LanguageIcon from "@mui/icons-material/Language"
import FacebookIcon from "@mui/icons-material/Facebook"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"

// Current project dependencies
import { convertDate } from "../../../utils/basic"
import { RootState } from "../../../app/store"
import { USER_USERNAME_APP_ROUTE } from "../../../constants/routes"
import { main__container_grid } from "../../../styles/container"
import { facebook_url, github_url, instagram_url, linkedin_url, twitter_url } from "../../../constants"
import IUser from "../../../interface/users"
import stylesVars from "../../../styles/globals/vars"
import cardStyles from "../../../styles/components/cards"
import profileStyles from "styles/pages/profile"

const icon_size = "large"

type user = Omit<IUser, "token">
interface IUserData {
  user: user,
  posts: string[]
  friends: string[]
}

export default function AboutUser() {
  const state = useSelector((state: RootState) => state.user)
  const visitedUserState = useSelector((state: RootState) => state.visitedUser)
  const { the_username } = useParams()
  const [data, setData] = useState<IUserData>({} as IUserData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (the_username === USER_USERNAME_APP_ROUTE || the_username === state.user.username) {
      const info = {
        user: state.user,
        friends: state.friends,
        posts: state.posts
      }

      setData(info)

      setLoading(false)
    } else {
      const info = {
        user: visitedUserState.user,
        friends: visitedUserState.friends,
        posts: visitedUserState.posts
      }

      setData(info)
      setLoading(false)
    }
  }, [the_username, state.user, state.friends, visitedUserState.user])

  return (
    <>
      {
        // TODO: add about section skeleton
        loading ? (
          <>
            xd
          </>
        ) : (
          <Box sx={main__container_grid}>
            <Box>
              <Typography
                sx={{ mb: 1 }}
                variant="h6"
                color="text.primary"
              >
                About
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontWeight: "300" }}
                color="text.primary"
              >
                {data.user.description}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <OptionView
              icon={<RoomOutlinedIcon fontSize={icon_size} />}
              text={"Earth"}
            />

            <OptionView
              icon={<GroupOutlinedIcon fontSize={icon_size} />}
              text={`Member from ${convertDate(data.user.createdAt)}`}
            />

            <OptionView
              icon={<AlternateEmailOutlinedIcon fontSize={icon_size} />}
              text={data.user.username}
            />

            <OptionView
              icon={<GroupsOutlinedIcon fontSize={icon_size} />}
              text={`${data.friends.length} friends`}
            />

            <OptionView
              icon={<DynamicFeedOutlinedIcon fontSize={icon_size} />}
              text={`${data.posts.length} posts`}
            />

            {data.user.website && (
              <OptionView
                icon={<LanguageIcon fontSize={icon_size} />}
                text={data.user.website}
              />
            )}

            {data.user.facebookLink && (
              <SocialLink
                icon={<FacebookIcon fontSize={icon_size} />}
                text={data.user.facebookLink}
                link={facebook_url.replace("%username", data.user.facebookLink)}
              />
            )}

            {data.user.githubLink && (
              <SocialLink
                icon={<GitHubIcon fontSize={icon_size} />}
                text={data.user.githubLink}
                link={github_url.replace("%username", data.user.githubLink)}
              />
            )}

            {data.user.linkedinLink && (
              <SocialLink
                icon={<LinkedInIcon fontSize={icon_size} />}
                text={data.user.linkedinLink}
                link={linkedin_url.replace("%username", data.user.linkedinLink)}
              />
            )}

            {data.user.instagramLink && (
              <SocialLink
                icon={<InstagramIcon fontSize={icon_size} />}
                text={data.user.instagramLink}
                link={instagram_url.replace("%username", data.user.instagramLink)}
              />
            )}

            {data.user.twitterLink && (
              <SocialLink
                icon={<TwitterIcon fontSize={icon_size} />}
                text={data.user.twitterLink}
                link={twitter_url.replace("%username", data.user.twitterLink)}
              />
            )}
          </Box>
        )
      }
    </>
  )
}

interface PropsV2 {
  icon: ReactNode,
  text: string
}

const OptionView = (props: PropsV2) => {
  return (
    <Box sx={{ ...stylesVars.centeredElements, justifyContent: "initial", color: "text.primary", py: 1 }}>
      <Box sx={profileStyles.aboutIcon}>
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
    <Box sx={{ ...stylesVars.centeredElements, justifyContent: "initial", color: "text.primary", py: 1 }}>
      <Box sx={profileStyles.aboutIcon}>
        {props.icon}
      </Box>

      <Typography
        variant="body1"
        color="text.primary"
        onClick={() => window.open(props.link, "_blank")}
        sx={cardStyles.link}
      >
        {props.text}
      </Typography>
    </Box>
  )
}
