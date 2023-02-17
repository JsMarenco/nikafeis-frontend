import React from "react"

// Third-party dependencies
import { useNavigate } from "react-router-dom"
import { Avatar, Typography, CardHeader, Card, CardContent, CardMedia, CardActions } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
// import ReplyIcon from "@mui/icons-material/Reply"

// Current project dependencies
import { CommentInterface } from "../../../interface/commet"
import { convertDate } from "../../../utils/basic"
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
    <Card sx={{ ...cardStyles.container, backgroundImage: "none", boxShadow: 0 }}>
      <CardHeader
        sx={{ p: 0 }}
        avatar={
          <Avatar
            src={avatarUrl}
            sizes="small"
            alt={globalsTexts.viewProfile}
            sx={{ ...cardStyles.userAvatar, mx: "auto" }}
          >
            {firstName.charAt(0)}
          </Avatar>
        }
        action={
          <CommentOptionsMenu
            commentId={commentId}
            authorCommentId={id}
          />
        }
        title={
          <Typography
            variant="subtitle1"
            color="text.primary"
            sx={cardStyles.profileLink}
            onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
            fontWeight={400}
          >
            {`${firstName} ${lastName}`}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" color="text.secondary" fontWeight={300}>
            {`${convertDate(createdAt)}${updatedAt !== createdAt ? " - edited" : ""}`}
          </Typography>
        }
      />

      <CardContent sx={{ px: 0 }}>
        <Typography variant="body1" color="text.primary">{content}</Typography>
      </CardContent>

      {
        commentImageUrl && (
          <CardMedia
            component="img"
            image={commentImageUrl}
            alt={globalsTexts.altImage.replace("%username", username)}
            sx={{
              borderRadius: "15px"
            }}
          />
        )
      }

      {/* <CardActions>
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
      </CardActions> */}
    </Card>
  )
}
