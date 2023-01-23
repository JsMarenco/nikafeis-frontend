import React, { useContext, useState } from "react"
import { Box, Divider, } from "@mui/material"
import { copyToClipboard, generateShareLink } from "../../../utils/basic"
import HeaderPost from "../../components/HeaderPost"
import ContentPost from "../../components/ContentPost"
import InteractPost from "../../components/InteractPost"
import PostInterface from "../../../interface/post"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import likePostService from "../../../services/api/likePostService"
import { messageContext } from "../../../context/MessageContext"
import CommentSection from "../../CommentSection"
import { post__card_container } from "../../../styles/post"
import getCommentsByIdServices from "../../../services/api/getCommentsByIdServices"
import { CommentInterface } from "../../../interface/commet"
import { COPY_CLIPBOARD_MESSAGE } from "../../../constants/messages"

export default function PostCard(props: PostInterface) {
  const {
    id = "", title = "", content = "", postImages = [],
    likes = [], shares = [], updatedAt = "", createdAt = "",
    author
  } = props

  const { firstName = "", lastName = "", avatarUrl = "", username = "", } = props.author

  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const [postLikes, setPostLikes] = useState<string[]>(likes)
  const [commentsUpdated, setCommentsUpdated] = useState<CommentInterface[]>([])
  const [showComments, setShowComments] = useState(false)
  const [offset, setOffset] = useState(0)
  const limit = 5

  const handleShare = () => {
    const link = generateShareLink(`/posts/${id}`)

    copyToClipboard(link)

    handleMessage(COPY_CLIPBOARD_MESSAGE)
  }

  const handleLike = async () => {
    const { message, statusCode, success, data } = await likePostService(state.user.id, state.token, id)

    if (statusCode === 200 && success) {
      handleMessage(message)

      setPostLikes(data.likes)
    }
  }

  const fetchCommentsUpdated = async () => {
    const { data, success } = await getCommentsByIdServices(state.user.id, state.token, id, offset, limit)

    if (success) {
      setCommentsUpdated([...commentsUpdated, ...data])

      setOffset(offset + limit)
    }
  }

  const handleShowComments = () => {
    setShowComments(!showComments)

    return showComments
  }

  const handleReport = () => {
    console.log("report")
  }

  return (
    <Box sx={post__card_container}>
      <HeaderPost
        postId={id}
        authorPostId={author.id}
        firstName={firstName}
        lastName={lastName}
        avatarUrl={avatarUrl}
        username={username}

        createdAt={createdAt}
        updatedAt={updatedAt}
        handleReport={handleReport}
      />

      <ContentPost
        title={title}
        content={content}
        postImages={postImages}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <InteractPost
        comments={commentsUpdated.length}
        likes={postLikes.length}
        shares={shares.length}

        handleLike={handleLike}
        handleShare={handleShare}
        handleShowComments={handleShowComments}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <CommentSection
        comments={commentsUpdated}
        handleShowComments={handleShowComments}
        showComments={showComments}
        postId={id}
        fetchCommentsUpdated={fetchCommentsUpdated}
        limit={limit}
      />
    </Box>
  )
}
