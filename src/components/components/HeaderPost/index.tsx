import React from "react"

// Third-party dependencies
import { useNavigate } from "react-router-dom"
import { Avatar, Box, Tooltip, Typography, } from "@mui/material"

// Current project dependencies
import { convertDate } from "../../../utils/basic"
import { HeaderPostInterface } from "../../../interface/post"
import PostHeaderMenu from "../../Menus/PostHeaderMenu"
import cardStyles from "../../../styles/components/cards"
import stylesVars from "../../../styles/globals/vars"
import postCardText from "../../../lang/en/components/postCard"
import AppRoutes from "../../../constants/app/routes"

export default function HeaderPost(props: HeaderPostInterface) {
  const navigate = useNavigate()
  const {
    firstName = "",
    lastName = "",
    avatarUrl = "",
    username = "",
    createdAt = "",
    updatedAt = "",
    postId = "",
    authorPostId = "",
  } = props

  return (
    <Box sx={cardStyles.headerContainer}>
      <Box sx={stylesVars.centeredElements}>
        <Tooltip title={postCardText.profileTooltip} arrow>
          <Avatar
            src={avatarUrl}
            alt={postCardText.altImage.replace("%fullname", `${firstName} ${lastName}`)}
            sx={cardStyles.userAvatar}
            onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
          />
        </Tooltip>

        <Box>
          <Tooltip title={postCardText.profileTooltip} arrow>
            <Typography
              variant="subtitle1"
              onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
              sx={cardStyles.profileLink}
            >
              {`${firstName} ${lastName}`}
            </Typography>
          </Tooltip>

          <Typography variant="subtitle2" color="text.primary" fontWeight={300}>
            {
              updatedAt === createdAt ? (
                convertDate(createdAt)
              ) : (
                `${convertDate(createdAt)} - edited`
              )
            }
          </Typography>
        </Box>
      </Box>

      <PostHeaderMenu
        postId={postId}
        authorPostId={authorPostId}
      />
    </Box>
  )
}
