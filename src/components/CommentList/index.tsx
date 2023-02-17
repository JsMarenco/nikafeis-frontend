import { Button, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { CommentInterface } from "../../interface/commet"
import getCommentsByIdServices from "../../services/api/getCommentsByIdServices"
import CommentCard from "../Cards/CommentCard"
import CreateComment from "../CreateComment"
import CommenSkeleton from "../Skeletons/CommenSkeleton"

interface CommentListInterface {
  postId: string
}

export default function CommentList(props: CommentListInterface) {
  const state = useSelector((state: RootState) => state.user)
  const { postId } = props
  const [loading, setLoading] = useState(true)
  const [commentsUpdated, setCommentsUpdated] = useState<CommentInterface[]>([])
  const [offset, setOffset] = useState(0)
  const limit = 10

  const fetchCommentsUpdated = async () => {
    const { data, success } = await getCommentsByIdServices(state.user.id, state.token, postId, offset, limit)

    if (success) {
      setCommentsUpdated(data)

      if (data.length > offset) {
        setOffset(offset + limit)
      }

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommentsUpdated()
  }, [])

  return (
    <Stack spacing={2}>
      {
        loading ? (
          <>
            <CommenSkeleton />
            <CommenSkeleton />
            <CommenSkeleton />
            <CommenSkeleton />
            <CommenSkeleton />
            <CommenSkeleton />
          </>
        ) : (
          <>
            {
              commentsUpdated.map((comment, index) => (
                <CommentCard
                  key={`${comment.commentId}-${index}`}
                  commentId={comment.commentId}
                  postId={postId}

                  content={comment.content}
                  commentImageUrl={comment.commentImageUrl}

                  likes={comment.likes}
                  replies={comment.replies}

                  author={comment.author}

                  updatedAt={comment.updatedAt}
                  createdAt={comment.createdAt}
                />
              ))
            }

            <Button
              variant="text"
              color="primary"
              onClick={() => fetchCommentsUpdated()}
              disabled={commentsUpdated.length < limit}
            >
              Show more comments
            </Button>
          </>
        )
      }

      {
        commentsUpdated.length === 0 && (
          <Typography variant="body1" color="text.primary" align="center">
            Be the first to comment!
          </Typography>
        )
      }

      <CreateComment
        postId={postId}
        fetchCommentsUpdated={fetchCommentsUpdated}
      />
    </Stack>
  )
}
