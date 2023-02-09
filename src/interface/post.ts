import { BasicUserInterface } from "./user"

export default interface PostInterface {
  id: string
  title: string
  content: string
  views?: number
  shares: BasicUserInterface[]
  comments: string[]
  likes: string[]
  postImages: Array<string>,
  author: BasicUserInterface
  createdAt: string
  updatedAt: string
}

export interface ContentPostInterface {
  title: string,
  content: string,
  postImages: Array<string>,
  username: string
}

export interface HeaderPostInterface {
  postId: string,
  authorPostId: string
  firstName: string,
  lastName: string,
  avatarUrl: string,
  username: string,

  createdAt: string,
  updatedAt: string,
  handleReport: () => void,
}

export interface InteractPostInterface {
  handleLike: () => void,
  handleShare: () => void,
  handleShowComments: () => boolean,

  likes: number,
  comments: number,
  shares: number,
}

export interface PostHeaderMenuInterface {
  postId: string,
  authorPostId: string
}

export interface EditPostFormInterface {
  open: boolean,
  handleCloseEditForm: () => void,
  postId: string
}
