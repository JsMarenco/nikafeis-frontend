import React from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, Stack, Typography, Tooltip, Box, Divider } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ReplyIcon from "@mui/icons-material/Reply"
import { CommentInterface } from "../../../interface/commet"
import { convertDate } from "../../../utils/basic"
import { PROFILE_ROUTE } from "../../../constants/routes"
import { comment__card_container } from "../../../styles/comment"
import { user__avatar, user__fullName_link } from "../../../styles"
import DownloadImageButton from "../../components/DownloadImageButton"
import OptionButton from "../../components/OptionButton"
import CommentOptionsMenu from "../../Menus/CommentOptionsMenu"

export default function CommentCard(props: CommentInterface) {
  const navigate = useNavigate()

  const {
    commentId = "",

    content = "",
    commentImageUrl = "",

    likes = [],
    replies = [],

    updatedAt = "",
    createdAt = "",
  } = props

  const {
    firstName = "",
    lastName = "",
    avatarUrl = "",
    username = "",
    id = ""
  } = props.author


  const [commentLikes, setCommentLikes] = React.useState(likes)

  const handleLike = async () => {
    // likeComment(user, id)
    //   .then((res) => {

    //     setCommentLikes(res.data.likes)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    console.log("like commet")
  }

  const handleReply = () => {
    console.log("reply")
  }

  return (
    <Box sx={comment__card_container} >
      <Stack spacing={1} direction="row">
        <Stack direction={"column"} spacing={.5}>
          <Avatar src={avatarUrl} sizes="small" alt={`${firstName}-${lastName}`} sx={{ ...user__avatar, mx: "auto" }}>
            {firstName.charAt(0)}
          </Avatar>
        </Stack>

        <Stack spacing={1} flexGrow={1}>
          <Box>
            <Tooltip title="View profile" arrow>
              <Typography
                variant="subtitle1"
                color="text.primary"
                sx={user__fullName_link}
                onClick={() => navigate(`${PROFILE_ROUTE}/${username}`)}
              >
                {`${firstName} ${lastName}`}
              </Typography>
            </Tooltip>

            <Typography variant="caption" color="text.secondary">
              {
                updatedAt === createdAt ? (
                  convertDate(createdAt)
                ) : (
                  `${convertDate(createdAt)} update at ${convertDate(updatedAt)}`
                )
              }
            </Typography>
          </Box>

          <Typography variant="body1" color="text.primary">{content}</Typography>

          {
            commentImageUrl && (
              <Box sx={{ width: "100%", position: "relative" }}>
                <img
                  src={commentImageUrl}
                  alt={`comment of ${firstName} ${lastName}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "100%",
                    borderRadius: "15px"
                  }}
                />

                <DownloadImageButton url={commentImageUrl} />
              </Box>
            )
          }
        </Stack>
      </Stack>

      <Divider sx={{ my: 1.5 }} orientation="horizontal" />

      <Stack direction="row" spacing={1} justifyContent="center">
        <OptionButton
          toolTipLabel="Like"
          customFunction={handleLike}
          textContent={String(commentLikes.length)}
          icon={<FavoriteIcon />}
        />

        <OptionButton
          toolTipLabel={`Reply to ${firstName} ${lastName}`}
          customFunction={handleReply}
          textContent={String(replies.length)}
          icon={<ReplyIcon />}
        />

        <CommentOptionsMenu
          commentId={commentId}
          authorCommentId={id}
        />
      </Stack>
    </Box>
  )
}
