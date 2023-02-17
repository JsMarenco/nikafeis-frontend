import React from "react"

// Third-party dependencies
import { useNavigate } from "react-router-dom"
import { Avatar, CardHeader, Typography, } from "@mui/material"

// Current project dependencies
import { convertDate } from "../../../utils/basic"
import PostHeaderMenu from "../../Menus/PostHeaderMenu"
import cardStyles from "../../../styles/components/cards"
import postCardText from "../../../lang/en/components/postCard"
import AppRoutes from "../../../constants/app/routes"
import { IHP } from "interface/post"

export default function HeaderPost(props: IHP) {
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
    <>
      <CardHeader
        sx={{ p: 0 }}
        avatar={
          <Avatar
            src={avatarUrl}
            alt={postCardText.altImage.replace("%fullname", `${firstName} ${lastName}`)}
            sx={{ ...cardStyles.userAvatar, mr: 0 }}
            onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
          />
        }
        action={
          <PostHeaderMenu
            postId={postId}
            authorPostId={authorPostId}
          />
        }
        title={
          <Typography
            variant="subtitle1"
            onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
            sx={cardStyles.profileLink}
          >
            {`${firstName} ${lastName}`}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" color="text.primary" fontWeight={300}>
            {`${convertDate(createdAt)}${updatedAt !== createdAt ? " - edited" : ""}`}
          </Typography>
        }
      />
    </>
  )
}
