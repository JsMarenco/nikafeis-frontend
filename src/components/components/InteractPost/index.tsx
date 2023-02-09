import React from "react"

// Third-party dependencies
import { Box, Button, Tooltip } from "@mui/material"
import ShareIcon from "@mui/icons-material/Share"
import FavoriteIcon from "@mui/icons-material/Favorite"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"

// Current project dependencies
import { InteractPostInterface } from "../../../interface/post"
import cardStyles from "../../../styles/components/cards"
import postCardText from "../../../lang/en/components/postCard"

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
    <Box sx={cardStyles.interactContainer}>
      <Tooltip
        title={postCardText.likeButtonTooltip}
        arrow
        placement={"top"}
        componentsProps={cardStyles.tooltip}
      >
        <Button
          variant="text"
          color="primary"
          endIcon={<FavoriteIcon />}
          onClick={handleLike}
          sx={cardStyles.interactButton}
        >
          {likes}
        </Button>
      </Tooltip>

      <Tooltip
        title={postCardText.commentsButtonTooltip}
        arrow
        placement={"top"}
        componentsProps={cardStyles.tooltip}
      >
        <Button
          variant="text"
          color="primary"
          endIcon={<QuestionAnswerIcon />}
          onClick={handleShowComments}
          sx={cardStyles.interactButton}
        >
          {comments}
        </Button>

      </Tooltip>

      <Tooltip
        title={postCardText.sharePostButtonTooltip}
        arrow
        placement={"top"}
        componentsProps={cardStyles.tooltip}
      >
        <Button
          variant="text"
          color="primary"
          startIcon={<ShareIcon />}
          onClick={handleShare}
          sx={cardStyles.interactButton}
        >
          {shares}
        </Button>
      </Tooltip>
    </Box>
  )
}
