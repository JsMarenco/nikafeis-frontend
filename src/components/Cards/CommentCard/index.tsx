import React from "react"

// Third-party dependencies
import { useNavigate } from "react-router-dom"
import { Avatar, Stack, Typography, Tooltip, Box, Divider } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
// import ReplyIcon from "@mui/icons-material/Reply"

// Current project dependencies
import { CommentInterface } from "../../../interface/commet"
import { convertDate } from "../../../utils/basic"
import DownloadImageButton from "../../components/DownloadImageButton"
import OptionButton from "../../components/OptionButton"
import CommentOptionsMenu from "../../Menus/CommentOptionsMenu"
import cardStyles from "../../../styles/components/cards"
import AppRoutes from "../../../constants/app/routes"
import globalsTexts from "../../../lang/en/globals"

export default function CommentCard(props: CommentInterface) {
  const navigate = useNavigate()

  const {
    commentId = "",

    content = "",
    commentImageUrl = "",

    likes = [],
    // replies = [],

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

  const [commentLikes] = React.useState(likes)

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

  // const handleReply = () => {
  //   console.log("reply")
  // }

  return (
    <Box sx={cardStyles.container} >
      <Stack spacing={1} direction="row">
        <Stack direction={"column"} spacing={.5}>
          <Avatar
            src={avatarUrl}
            sizes="small"
            alt={globalsTexts.viewProfile}
            sx={{ ...cardStyles.userAvatar, mx: "auto" }}
          >
            {firstName.charAt(0)}
          </Avatar>
        </Stack>

        <Stack spacing={1} flexGrow={1}>
          <Box>
            <Tooltip title="View profile" arrow>
              <Typography
                variant="subtitle1"
                color="text.primary"
                sx={cardStyles.profileLink}
                onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
              >
                {`${firstName} ${lastName}`}
              </Typography>
            </Tooltip>

            <Typography variant="caption" color="text.secondary">
              {
                updatedAt === createdAt ? (
                  convertDate(createdAt)
                ) : (
                  `${convertDate(createdAt)} edited`
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
                  alt={globalsTexts.altImage.replace("%username", username)}
                  style={{
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

        {/* <OptionButton
          toolTipLabel={`Reply to ${firstName} ${lastName}`}
          customFunction={handleReply}
          textContent={String(replies.length)}
          icon={<ReplyIcon />}
        /> */}

        <CommentOptionsMenu
          commentId={commentId}
          authorCommentId={id}
        />
      </Stack>
    </Box>
  )
}
