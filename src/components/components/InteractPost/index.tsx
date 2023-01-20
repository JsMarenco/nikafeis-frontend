import React from "react"
import { Box, Button, Tooltip } from "@mui/material"
import ShareIcon from "@mui/icons-material/Share"
import FavoriteIcon from "@mui/icons-material/Favorite"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import { InteractPostInterface } from "../../../interface/post"
import { post__card_interfact__section } from "../../../styles/post"

export default function InteractPost(props: InteractPostInterface) {
  const {
    handleLike = () => {
      console.log("liked")
    },
    handleShare = () => {
      console.log("shared")
    },
    handleShowComments = () => {
      console.log("show comments")
    },

    likes = 0,
    comments = 0,
    shares = 0
  } = props

  return (
    <Box sx={post__card_interfact__section}>
      <Tooltip title="Like" arrow>
        <Button
          variant="text"
          color="primary"
          endIcon={<FavoriteIcon />}
          onClick={handleLike}
        >
          {likes}
        </Button>
      </Tooltip>

      <Tooltip title="View comments" arrow>
        <Button
          variant="text"
          color="primary"
          endIcon={<QuestionAnswerIcon />}
          onClick={handleShowComments}
        >
          {comments}
        </Button>

      </Tooltip>

      <Tooltip title="Share this post" arrow>
        <Button
          variant="text"
          color="primary"
          startIcon={<ShareIcon />}
          onClick={handleShare}
        >
          {shares}
        </Button>
      </Tooltip>
    </Box>
  )
}
