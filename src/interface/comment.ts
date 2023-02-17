import { BasicUserInterface } from "./user"

/**
 * Comment Interface
 */
export interface IC {
  commentId: string
  content: string
  createdAt: string
  updatedAt: string
  replies: IC[]
  author: BasicUserInterface
  commentImageUrl: string
  likes: string[],
  postId: string
}
