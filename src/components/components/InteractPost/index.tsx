import React, { useState } from "react"

// Third-party dependencies
import { Button, CardActions, Dialog, DialogContent, Tooltip } from "@mui/material"
import ShareIcon from "@mui/icons-material/Share"
import FavoriteIcon from "@mui/icons-material/Favorite"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"

// Current project dependencies
import cardStyles from "../../../styles/components/cards"
import postCardText from "../../../lang/en/components/postCard"
import CommentList from "components/CommentList"
import { IIP } from "interface/post"

export default function InteractPost(props: IIP) {
  const {
    handleLike = () => {
      console.log("liked")
    },
    handleShare = () => {
      console.log("shared")
    },

    likes = 0,
    comments = [],
    shares = 0,
    postId
  } = props

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <CardActions sx={cardStyles.interactContainer}>
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
            onClick={handleClickOpen}
            sx={cardStyles.interactButton}
          >
            {comments.length}
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
      </CardActions>

      <Dialog
        fullWidth
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "15px"
          }
        }}
      >
        <DialogContent>
          <CommentList postId={postId} />
        </DialogContent>
      </Dialog>
    </>
  )
}
