import { ReactNode } from "react"
import { BasicUserInterface } from "./user"

export interface CommentInterface {
  commentId: string
  content: string
  createdAt: string
  updatedAt: string
  replies: CommentInterface[]
  author: BasicUserInterface
  commentImageUrl: string
  likes: string[],
  postId: string
}

export interface CommentSectionInterface {
  postId: string,

  comments: CommentInterface[]

  showComments: boolean,
  handleShowComments: () => boolean,
  fetchCommentsUpdated: () => void
  limit: number
}

export interface CreateCommentInterface {
  postId: string
  fetchCommentsUpdated: () => void
}

export interface CommentOptionsInterface {
  toolTipLabel: string,
  icon: ReactNode,
  textContent: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFunction: (e?: any) => void
}

export interface CommentOptionMenuInterface {
  commentId: string,
  authorCommentId: string
}
