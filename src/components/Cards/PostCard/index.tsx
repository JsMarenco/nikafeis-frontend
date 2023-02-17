import React, { useContext, useState } from "react"

// Third-party dependencies
import { Card, Divider } from "@mui/material"
import { useSelector } from "react-redux"

// Current project dependencies
import { copyToClipboard, generateShareLink } from "../../../utils/basic"
import HeaderPost from "../../components/HeaderPost"
import ContentPost from "../../components/ContentPost"
import InteractPost from "../../components/InteractPost"
import { RootState } from "../../../app/store"
import likePostService from "../../../services/api/likePostService"
import { messageContext } from "../../../context/MessageContext"
import getCommentsByIdServices from "../../../services/api/getCommentsByIdServices"
import { CommentInterface } from "../../../interface/commet"
import AppMessages from "../../../constants/app/messages"
import cardStyles from "../../../styles/components/cards"
import { IP } from "interface/post"
import AppRoutes from "constants/app/routes"

export default function PostCard(props: IP) {
  const {
    id = "",
    title = "",
    content = "",
    postImages = [],
    likes = [],
    shares = [],
    updatedAt = "",
    createdAt = "",
    author
  } = props

  const { firstName = "", lastName = "", avatarUrl = "", username = "", } = props.author

  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const [postLikes, setPostLikes] = useState<string[]>(likes)
  const [commentsUpdated, setCommentsUpdated] = useState<CommentInterface[]>([])
  const [offset, setOffset] = useState(0)
  const limit = 5

  const handleShare = () => {
    const link = generateShareLink(AppRoutes.viewPost.replace("%id", id))

    copyToClipboard(link)

    handleMessage(AppMessages.CopyClipboard)
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

  const handleReport = () => {
    handleMessage("Post reported")
  }

  return (
    <Card sx={{ ...cardStyles.container, p: 2 }}>
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
        username={author.username}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <InteractPost
        comments={commentsUpdated}
        likes={postLikes.length}
        shares={shares.length}
        handleLike={handleLike}
        handleShare={handleShare}
        title={""}
        content={""}
        postImages={[]}
        username={""}
        postId={id}
        fetchCommentsUpdated={fetchCommentsUpdated}
        limit={limit}
      />
    </Card>
  )
}
