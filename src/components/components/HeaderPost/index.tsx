import React from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, Box, Tooltip, Typography, } from "@mui/material"
import { convertDate } from "../../../utils/basic"
import { global_flex, user__avatar, user__fullName_link } from "../../../styles"
import { HeaderPostInterface } from "../../../interface/post"
import { post__card_header } from "../../../styles/post"
import PostHeaderMenu from "../../Menus/PostHeaderMenu"

export default function HeaderPost(props: HeaderPostInterface) {
  const navigate = useNavigate()
  const {
    firstName = "", lastName = "", avatarUrl = "",
    username = "", createdAt = "", updatedAt = "",
    postId = "", authorPostId = ""
  } = props

  return (
    <Box sx={post__card_header}>
      <Box sx={global_flex}>
        <Tooltip title="View profile" arrow>
          <Avatar
            src={avatarUrl}
            alt={firstName}
            sx={user__avatar}
            onClick={() => navigate(`/profile/${username}`)}
          />
        </Tooltip>

        <Box>
          <Tooltip title="View profile" arrow>
            <Typography
              variant="subtitle1"
              color="text.primary"
              onClick={() => navigate(`/profile/${username}`)}
              sx={user__fullName_link}
            >
              {`${firstName} ${lastName}`}
            </Typography>
          </Tooltip>

          <Typography variant="subtitle2" color="text.primary">
            {
              updatedAt === createdAt ? (
                convertDate(createdAt)
              ) : (
                `${convertDate(createdAt)} - edited ${convertDate(updatedAt)}`
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
